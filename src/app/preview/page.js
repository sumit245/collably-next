"use client"

import { useRef, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import styles from "../videoRec/styles.vid.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import { RotateCcw, Check } from "lucide-react"
import FooterCreator from "../components/FooterCreator"

export default function PreviewPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mediaType = searchParams.get("mediaType")
  const mediaId = searchParams.get("mediaId")
  const [mediaSrc, setMediaSrc] = useState(null)
  const [mediaLoaded, setMediaLoaded] = useState(false)
  const mediaRef = useRef(null)

  useEffect(() => {
    if (mediaId) {
      const storedMedia = sessionStorage.getItem(`media_${mediaId}`)
      if (storedMedia) {
        setMediaSrc(storedMedia)
      }
    }
  }, [mediaId])

  useEffect(() => {
    if (mediaRef.current && mediaSrc) {
      if (mediaType === "photo") {
        mediaRef.current.onload = () => setMediaLoaded(true)
        mediaRef.current.src = mediaSrc
      } else {
        mediaRef.current.onloadedmetadata = () => setMediaLoaded(true)
        mediaRef.current.src = mediaSrc
      }
    }
  }, [mediaSrc, mediaType])

  const handleConfirm = () => {
    router.push(`/video-details?${searchParams.toString()}`)
  }

  const handleDiscard = () => {
    if (mediaId) {
      sessionStorage.removeItem(`media_${mediaId}`)
    }
    router.push("/videoRec")
  }

  return (
    <div className={stylesShop.bodyShop}>
      <div className={`${stylesShop.smartphoneContainer} ${styles.previewContainer}`}>
        <div className={styles.mediaWrapper}>
          {mediaType === "photo" ? (
            <img
              ref={mediaRef}
              alt="Preview"
              className={styles.previewMedia}
              style={{ display: mediaLoaded ? "block" : "none" }}
            />
          ) : (
            <video
              ref={mediaRef}
              autoPlay
              loop
              muted={false}
              className={styles.previewMedia}
              style={{ display: mediaLoaded ? "block" : "none" }}
            />
          )}
          {!mediaLoaded && <div className={styles.loading}>Loading...</div>}
        </div>
        <div className={styles.previewControls}>
          <button className={styles.previewButton} onClick={handleDiscard}>
            <RotateCcw className="h-6 w-6" />
          </button>
          <button className={`${styles.previewButton} ${styles.confirmButton}`} onClick={handleConfirm}>
            <Check className="h-6 w-6" />
          </button>
        </div>
        <FooterCreator />
      </div>
    </div>
  )
}

