"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"
import { Package, Eye, Users } from "lucide-react"

export default function VideoDetails() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [videoSrc, setVideoSrc] = useState("")
  const [formData, setFormData] = useState({
    brand: "",
    product: "",
    visibility: "",
    audience: "",
  })

  useEffect(() => {
    const src = searchParams.get("videoSrc")
    if (src) {
      setVideoSrc(src)
    }
  }, [searchParams])

  useEffect(() => {
    const storedData = localStorage.getItem("videoDetailsData")
    if (storedData) {
      setFormData(JSON.parse(storedData))
    }
  }, [])

  const handleSubmit = async () => {
    if (formData.brand && formData.product && formData.visibility && formData.audience) {
      router.push("/upload-success")
    }
  }

  const handleproductClick = () => {
    router.push("/set-product")
  }

  const handleVisibilityClick = () => {
    router.push("/set-visibility")
  }

  const handleAudienceClick = () => {
    router.push("/select-audience")
  }

  const isFormComplete = formData.brand && formData.product && formData.visibility && formData.audience

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <div className={styles.container}>
          <div className={styles.videoPreview}>{videoSrc && <video src={videoSrc} className={styles.video} />}</div>

          <div className={styles.form}>
            <div className={styles.username}>Username</div>

            <button className={styles.optionButton} onClick={handleproductClick}>
              <Package size={20} />
              Add Product: {formData.brand ? `${formData.brand} - ${formData.product}` : "Not selected"}
            </button>

            <button className={styles.optionButton} onClick={handleVisibilityClick}>
              <Eye size={20} />
              Visibility: {formData.visibility || "Not set"}
            </button>

            <button className={styles.optionButton} onClick={handleAudienceClick}>
              <Users size={20} />
              Select Audience: {formData.audience || "Not selected"}
            </button>

            <button
              className={`${styles.doneButton} ${!isFormComplete ? styles.disabledButton : ""}`}
              onClick={handleSubmit}
              disabled={!isFormComplete}
            >
              Done
            </button>
          </div>
        </div>
        <FooterCreator />
      </div>
    </div>
  )
}

