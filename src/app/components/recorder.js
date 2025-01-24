"use client"

import { useState, useRef, useEffect } from "react"
import { X, RotateCcw, Check, Music2, Instagram, Youtube } from "lucide-react"
import { useRouter } from "next/navigation"
import styles from "../videoRec/styles.vid.module.css"

function VideoRecorder() {
  const router = useRouter()
  const [selectedMode, setSelectedMode] = useState("Short")
  const [isRecording, setIsRecording] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const [error, setError] = useState(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [recordedVideo, setRecordedVideo] = useState(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const videoRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const progressIntervalRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
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

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
      }
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
      setRecordedVideo(url)
      setIsPreviewMode(true)
      if (videoRef.current) {
        videoRef.current.src = url
        videoRef.current.play()
      }
    }

    mediaRecorder.start()
    mediaRecorderRef.current = mediaRecorder
    setIsRecording(true)
    setRecordingTime(0)

    progressIntervalRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= 30) {
          stopRecording()
          return 30
        }
        return prev + 1
      })
    }, 1000)

    // Auto stop after 30 seconds
    setTimeout(() => {
      if (mediaRecorderRef.current && isRecording) {
        stopRecording()
      }
    }, 30000)
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      setIsPreviewMode(true)
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setRecordedVideo(url)
      setIsPreviewMode(true)
      if (videoRef.current) {
        videoRef.current.src = url
        videoRef.current.play()
      }
    }
  }

  const handleUndo = () => {
    if (recordedVideo) {
      URL.revokeObjectURL(recordedVideo)
    }
    setRecordedVideo(null)
    setIsPreviewMode(false)
    setSelectedFile(null)
    if (videoRef.current) {
      videoRef.current.srcObject = null
      setupCamera()
    }
  }

  const handleConfirm = () => {
    if (recordedVideo) {
      const videoDetails = {
        videoSrc: recordedVideo,
        duration: recordingTime,
        mode: selectedMode,
      }
      router.push(`/video-details?${new URLSearchParams(videoDetails).toString()}`)
    }
  }

  const handleDiscard = () => {
    handleUndo()
  }

  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  return (
    <div className={styles.container}>
      <video ref={videoRef} autoPlay playsInline muted={!isPreviewMode} className={styles.video} loop={isPreviewMode} />

      {error && <div className={styles.error}>{error}</div>}

      {isRecording && (
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={{ width: `${(recordingTime / 30) * 100}%` }} />
        </div>
      )}

      <div className={styles.topBar}>
        <button className={styles.sideButton} onClick={handleUndo}>
          <X className="h-6 w-6" />
        </button>
        <button className={styles.sideButton}>
          <Music2 className="h-6 w-6" />
          <span className="ml-2">Add sound</span>
        </button>
        <div className="text-white">{recordingTime}s</div>
      </div>

      <div className={styles.bottomControls}>
        {isPreviewMode ? (
          <>
            <div className={styles.previewContainer}>
              <video ref={videoRef} className={styles.previewVideo} controls loop src={recordedVideo} />
            </div>
            <div className={styles.previewControls}>
              
              <button className={styles.previewButton} onClick={handleDiscard}>
                <RotateCcw className="h-6 w-6" />
              </button>
              <button className={`${styles.previewButton} ${styles.confirmButton}`} onClick={handleConfirm}>
                <Check className="h-6 w-6" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.controlsRow}>
              <input
                type="file"
                accept="video/*"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              <button className={styles.addButton} onClick={() => fileInputRef.current?.click()}>
                <div className={styles.addButtonPreview}>
                  {selectedFile && (
                    <video src={URL.createObjectURL(selectedFile)} className={styles.previewThumbnail} />
                  )}
                </div>
                ADD
              </button>
              <button
                className={`${styles.recordButton} ${isRecording ? styles.recording : ""}`}
                onClick={() => (isRecording ? stopRecording() : startRecording())}
                disabled={!hasPermission}
              >
                <div className={styles.recordingInner} />
              </button>
            </div>
            <div className={styles.syncButtons}>
              <button className={styles.syncButton}>
                <Instagram className="h-6 w-6" />
                Sync to Instagram
              </button>
              <button className={styles.syncButton}>
                <Youtube className="h-6 w-6" />
                Sync to Youtube
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default VideoRecorder

