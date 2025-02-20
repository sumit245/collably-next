"use client"

import { useRef, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import styles from "../videoRec/styles.vid.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import { RotateCcw, Check } from "lucide-react"
import FooterCreator from "../components/FooterCreator"
import { Suspense } from "react"

const PreviewPageContent = () => {
  const router = useRouter()
  const currentMedia = useSelector((state) => state.media.currentMedia)
  const [mediaLoaded, setMediaLoaded] = useState(false)
  const mediaRef = useRef(null)

  useEffect(() => {
    if (mediaRef.current && currentMedia?.src) {
      if (currentMedia.type === "photo") {
        mediaRef.current.onload = () => setMediaLoaded(true)
        mediaRef.current.src = currentMedia.src
      } else {
        mediaRef.current.onloadedmetadata = () => setMediaLoaded(true)
        mediaRef.current.src = currentMedia.src
      }
    }
  }, [currentMedia])

  const handleConfirm = () => {
    router.push("/video-details")
  }

  const handleDiscard = () => {
    router.push(currentMedia?.type === "photo" ? "/photorec" : "/videoRec")
  }

  if (!currentMedia) {
    router.push("/CreatorShop")
    return null
  }

  return (
    <div className={stylesShop.bodyShop}>
      <div className={`${stylesShop.smartphoneContainer} ${styles.previewContainer}`}>
        <div className={styles.mediaWrapper}>
          {currentMedia.type === "photo" ? (
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

export default function PreviewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PreviewPageContent />
    </Suspense>
  )
}

