"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./page.module.css"

export default function VideoDetails() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    brand: "",
    product: "",
    visibility: "public",
    audience: "not-for-kids",
  })

  const handleSubmit = async () => {
    // Handle form submission
    router.push("/upload-video")
  }

  const handleVisibilityClick = () => {
    router.push("/set-visibility")
  }

  const handleAudienceClick = () => {
    router.push("/select-audience")
  }

  return (
    <div className={styles.container}>
      <div className={styles.videoPreview}>{/* Video preview will be here */}</div>

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
  )
}

