"use client"

import { useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import styles from "../videoRec/styles.vid.module.css"
import stylesShop from '../shop/StyleShop.module.css'
import { RotateCcw, Check } from "lucide-react"
import FooterCreator from '../components/FooterCreator'

export default function PreviewPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const videoSrc = searchParams.get("videoSrc")
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoSrc || ""
    }
  }, [videoSrc])

  const handleConfirm = () => {
    router.push(`/video-details?${searchParams.toString()}`)
  }

  const handleDiscard = () => {
    router.push("/videoRec")
  }

  return (
    <div className={stylesShop.bodyShop}>
    <div className={stylesShop.smartphoneContainer}>
    <div className={styles.container}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={false}
        className={styles.video}
      />
      <div className={styles.bottomControls}>
        <div className={styles.previewControls}>
          <button className={styles.previewButton} onClick={handleDiscard}>
            <RotateCcw className="h-6 w-6" />
          </button>
          <button
            className={`${styles.previewButton} ${styles.confirmButton}`}
            onClick={handleConfirm}
          >
            <Check className="h-6 w-6" />
          </button>
        </div>
      </div>
      
    </div>
    <FooterCreator />
    </div>
    </div>
  )
}
