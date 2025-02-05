"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { X, Camera, Instagram, Youtube } from "lucide-react"
import { useRouter } from "next/navigation"
import styles from "../videoRec/styles.vid.module.css"
import Link from "next/link"

function ImageCapture() {
  const router = useRouter()
  const [hasPermission, setHasPermission] = useState(false)
  const [error, setError] = useState(null)
  const [capturedPhoto, setCapturedPhoto] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  const setupCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
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
    }
  }, [setupCamera])

  const handleMediaCapture = useCallback(
    (mediaSrc) => {
      const mediaId = Date.now().toString()
      sessionStorage.setItem(`media_${mediaId}`, mediaSrc);
      const mediaDetails = {
        mediaId,
        mediaType: "photo",
        mode: "post",
      }
      router.push(`/preview?${new URLSearchParams(mediaDetails).toString()}`)
    },
    [router],
  )

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      canvasRef.current.width = videoRef.current.videoWidth
      canvasRef.current.height = videoRef.current.videoHeight
      context.drawImage(videoRef.current, 0, 0)
      const photoDataUrl = canvasRef.current.toDataURL("image/jpeg")
      setCapturedPhoto(photoDataUrl)
      handleMediaCapture(photoDataUrl)
    }
  }, [handleMediaCapture])

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
    if (capturedPhoto) {
      URL.revokeObjectURL(capturedPhoto)
    }
    setCapturedPhoto(null)
    setSelectedFile(null)
    if (videoRef.current) {
      videoRef.current.srcObject = null
      setupCamera()
    }
  }, [capturedPhoto, setupCamera])

  return (
    <div className={styles.container}>
      <video ref={videoRef} autoPlay playsInline muted className={styles.video} />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {error && <div className={styles.error}>{error}</div>}

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
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <button className={styles.addButton} onClick={() => fileInputRef.current?.click()}>
            <div className={styles.addButtonPreview}>
              {selectedFile && (
                <img
                  src={URL.createObjectURL(selectedFile) || "/placeholder.svg"}
                  alt="Preview"
                  className={styles.previewThumbnail}
                />
              )}
            </div>
          </button>
          <button
            className={`${styles.recordButton} ${styles.photoButton}`}
            onClick={capturePhoto}
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

export default ImageCapture