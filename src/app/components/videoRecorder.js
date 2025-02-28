"use client"

import { useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import { X, Instagram, Youtube } from "lucide-react"
import { useRouter } from "next/navigation"
import styles from "../videoRec/styles.vid.module.css"
import Link from "next/link"
import { setCurrentMedia } from "../store/mediaSlice"

function VideoRecorder() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isRecording, setIsRecording] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const [error, setError] = useState(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)

  const videoRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const progressIntervalRef = useRef(null)
  const fileInputRef = useRef(null)

  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
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

  useEffect(() => {
    setupCamera()
    return () => {
      videoRef.current?.srcObject?.getTracks().forEach(track => track.stop())
      clearInterval(progressIntervalRef.current)
    }
  }, [])

  const handleMediaCapture = (mediaSrc) => {
    dispatch(setCurrentMedia({
      id: Date.now().toString(),
      src: mediaSrc,
      type: "video",
      duration: recordingTime
    }))
    router.push("/preview")
  }

  const startRecording = () => {
    if (!videoRef.current?.srcObject) return

    mediaRecorderRef.current = new MediaRecorder(videoRef.current.srcObject)
    mediaRecorderRef.current.ondataavailable = e => e.data.size > 0 && chunksRef.current.push(e.data)
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" })
      handleMediaCapture(URL.createObjectURL(blob))
    }

    mediaRecorderRef.current.start()
    setIsRecording(true)
    setRecordingTime(0)

    progressIntervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev >= 30 ? (stopRecording(), 30) : prev + 1)
    }, 1000)

    setTimeout(stopRecording, 30000)
  }

  const stopRecording = () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop()
      setIsRecording(false)
      clearInterval(progressIntervalRef.current)
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        setSelectedFile(file)
        handleMediaCapture(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={styles.container}>
      <video ref={videoRef} autoPlay playsInline muted className={styles.video} />

      {error && <div className={styles.error}>{error}</div>}

      {isRecording && (
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={{ width: `${(recordingTime / 30) * 100}%` }} />
        </div>
      )}

      <div className={styles.topBar}>
        <Link href="/CreatorShop">
          <button className={styles.sideButton} onClick={() => setSelectedFile(null)}>
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
              {selectedFile && <video src={URL.createObjectURL(selectedFile)} className={styles.previewThumbnail} />}
            </div>
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