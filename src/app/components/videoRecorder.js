"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { X, Video, Instagram, Youtube } from "lucide-react"
import { useRouter } from "next/navigation"
import styles from "../videoRec/styles.vid.module.css"
import Link from "next/link"

function VideoRecorder() {
  const router = useRouter()
  const [isRecording, setIsRecording] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const [error, setError] = useState(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [recordedVideo, setRecordedVideo] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const videoRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const progressIntervalRef = useRef(null)
  const fileInputRef = useRef(null)

  const setupCamera = useCallback(async () => {
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
  }, [])

  useEffect(() => {
    setupCamera()

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [setupCamera])

  const handleMediaCapture = useCallback(
    (mediaSrc) => {
      const mediaId = Date.now().toString()
      sessionStorage.setItem(`media_${mediaId}`, mediaSrc);
      const mediaDetails = {
        mediaId,
        mediaType: "video",
        duration: recordingTime,
        mode: "video",
      }
      router.push(`/preview?${new URLSearchParams(mediaDetails).toString()}`)
    },
    [recordingTime, router],
  )

  const startRecording = useCallback(() => {
    if (!videoRef.current?.srcObject) return

    chunksRef.current = []
    const recorder = new window.MediaRecorder(videoRef.current.srcObject)

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data)
      }
    }

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" })
      const url = URL.createObjectURL(blob)
      setRecordedVideo(url)
      handleMediaCapture(url)
    }

    recorder.start()
    mediaRecorderRef.current = recorder
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

    setTimeout(() => {
      if (mediaRecorderRef.current && isRecording) {
        stopRecording()
      }
    }, 30000)
  }, [isRecording, handleMediaCapture])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isRecording])

  const handleFileUpload = useCallback(
    (event) => {
      const file = event.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const fileDataUrl = e.target.result
          setSelectedFile(file)
          handleMediaCapture(fileDataUrl)
        }
        reader.readAsDataURL(file)
      }
    },
    [handleMediaCapture],
  )

  const handleUndo = useCallback(() => {
    if (recordedVideo) {
      URL.revokeObjectURL(recordedVideo)
    }
    setRecordedVideo(null)
    setSelectedFile(null)
    if (videoRef.current) {
      videoRef.current.srcObject = null
      setupCamera()
    }
  }, [recordedVideo, setupCamera])

  const handleVideoCapture = useCallback(() => {
    isRecording ? stopRecording() : startRecording()
  }, [isRecording, stopRecording, startRecording])

  return (
    <div className={styles.container}>
      <video ref={videoRef} autoPlay playsInline muted className={styles.video} />

      {error && <div className={styles.error}>{error}</div>}

      {isRecording && (
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={`{ width: ${(recordingTime / 30) * 100}% }`} />
        </div>
      )}

      <div className={styles.topBar}>
        <Link href="/CreatorShop">
          <button className={styles.sideButton} onClick={handleUndo}>
            <X className="h-6 w-6" />
          </button>
        </Link>
      </div>

      <div className={styles.bottomControls}>
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
          </button>
          <button
            className={`${styles.recordButton} ${isRecording ? styles.recording : ""}`}
            onClick={handleVideoCapture}
            disabled={!hasPermission}
          >
            <div className={styles.recordingInner} />
          </button>
        </div>

        <div className={styles.syncButtons}>
          <Link href="/instagramProfile">
            <button className={styles.syncButton}>
              <Instagram className="h-6 w-6" />
            </button>
          </Link>
          <Link href="/youtubeProfile">
            <button className={styles.syncButton}>
              <Youtube className="h-6 w-6" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VideoRecorder