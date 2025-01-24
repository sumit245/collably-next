"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import styles from "./page.module.css"
import stylesShop from '../shop/StyleShop.module.css'
import FooterCreator from '../components/FooterCreator'

export default function VideoDetails() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [videoSrc, setVideoSrc] = useState("")
  const [formData, setFormData] = useState({
    brand: "",
    product: "",
    visibility: "public",
    audience: "not-for-kids",
  })

  useEffect(() => {
    const src = searchParams.get("videoSrc")
    if (src) {
      setVideoSrc(src)
    }
  }, [searchParams])

  const handleSubmit = async () => {
    // Handle form submission
    router.push("/upload-success")
  }

  const handleVisibilityClick = () => {
    router.push("/set-visibility")
  }

  const handleAudienceClick = () => {
    router.push("/select-audience")
  }

  return (
    <div className={stylesShop.bodyShop}>
    <div className={stylesShop.smartphoneContainer}>
    <div className={styles.container}>
      <div className={styles.videoPreview}>
        {videoSrc && <video src={videoSrc} className={styles.video} controls />}
      </div>

      <div className={styles.form}>
        <div className={styles.username}>Username</div>

        <div className={styles.productSection}>
          <div className={styles.dropdown}>
            <input
              type="text"
              placeholder="Add brand"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            />
          </div>
          <div className={styles.dropdown}>
            <input
              type="text"
              placeholder="Add product"
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
            />
          </div>
        </div>

        <button className={styles.optionButton} onClick={handleVisibilityClick}>
          Visibility: {formData.visibility}
        </button>

        <button className={styles.optionButton} onClick={handleAudienceClick}>
          Select Audience
        </button>

        <button className={styles.doneButton} onClick={handleSubmit}>
          Done
        </button>
      </div>
    </div>
      <FooterCreator />
        </div>
        </div>
  )
}

