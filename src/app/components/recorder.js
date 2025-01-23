"use client"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "../components/Cards/Button"
import styles from '../videoRec/styles.vid.module.css'  // Import the CSS module

function VideoRecorder() {
  const [selectedMode, setSelectedMode] = useState("Short")
  const [isRecording, setIsRecording] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const [error, setError] = useState(null)
  const [recordingTime, setRecordingTime] = useState(0) // Track elapsed time for the progress bar

  const videoRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const progressIntervalRef = useRef(null)  // To store the interval reference for clearing

  const modes = ["Reels"]

  useEffect(() => {
    // Request camera permission and setup stream
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setHasPermission(true)
          setError(null)
        }
      } catch (err) {
        setError("Camera permission denied or not available")
        setHasPermission(false)
      }
    }

    setupCamera()

    // Cleanup function
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
      }

      // Clear interval when the component unmounts
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  const startRecording = () => {
    if (!videoRef.current?.srcObject) return

    chunksRef.current = []
    const mediaRecorder = new MediaRecorder(videoRef.current.srcObject)

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data)
      }
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" })
      const url = URL.createObjectURL(blob)

      // Create download link
      const a = document.createElement("a")
      a.href = url
      a.download = "recorded-video.webm"
      a.click()

      URL.revokeObjectURL(url)
    }

    mediaRecorder.start()
    mediaRecorderRef.current = mediaRecorder
    setIsRecording(true)
    setRecordingTime(0)  // Reset the time when recording starts

    // Start the progress bar update
    progressIntervalRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= 15) {
          clearInterval(progressIntervalRef.current)
          stopRecording()
          return 15
        }
        return prev + 1
      })
    }, 1000)  // Update every second

    // Stop recording automatically after 15 seconds
    setTimeout(() => {
      if (mediaRecorderRef.current && isRecording) {
        stopRecording()
      }
    }, 15000)  // 15000 ms = 15 seconds
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Clear interval after stopping the recording
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <div className={styles.container}>
      {/* Camera Preview */}
      <video ref={videoRef} autoPlay playsInline muted className={styles.video} />

      {/* Error Message */}
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {/* Top Bar */}
      <div className={styles.topBar}>
        <Button variant="ghost" size="icon" className={styles.button}>
          <X className="h-6 w-6" />
        </Button>
        <Button variant="secondary" className={styles.buttonSecondary}>
          Done
        </Button>
      </div>

      {/* Bottom Controls */}
      <div className={styles.bottomControls}>
        {/* Record Button */}
        <div className="flex justify-center mb-8">
          <button
            className={`${styles.recordButton} ${isRecording ? styles.recording : ""}`}
            onClick={toggleRecording}
            disabled={!hasPermission}
          >
            <div
              className={`${styles.recordingInner} ${isRecording ? styles.recording : ""}`}
            ></div>
          </button>
        </div>

        {/* Progress Bar */}
        {isRecording && (
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${(recordingTime / 15) * 100}% `}}
            />
          </div>
        )}

        {/* Mode Selector */}
        <div className={styles.modeSelector}>
          {modes.map((mode) => (
            <button
              key={mode}
              className={`${styles.modeButton} ${selectedMode === mode ? styles.modeSelected : styles.modeUnselected}`}
              onClick={() => setSelectedMode(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VideoRecorder