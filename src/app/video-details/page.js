"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"
import { Package, Eye, Users } from 'lucide-react'

export default function MediaDetails() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mediaSrc, setMediaSrc] = useState("")
  const [mediaType, setMediaType] = useState("")
  const [formData, setFormData] = useState({
    brand: "",
    product: "",
    visibility: "",
    audience: "",
    ageRestriction: "",
  })

  useEffect(() => {
    const src = searchParams.get("mediaSrc")
    const type = searchParams.get("mediaType")
    const mediaId = searchParams.get("mediaId")

    if (src) {
      setMediaSrc(src)
    } else if (mediaId) {
      const storedMedia = sessionStorage.getItem(`media_${mediaId}`)
      if (storedMedia) {
        setMediaSrc(storedMedia)
      }
    }

    if (type) {
      setMediaType(type)
    }

    // Retrieve form data from localStorage
    const storedFormData = localStorage.getItem('videoDetailsData')
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData))
    }
  }, [searchParams])

  const handleSubmit = async () => {
    if (formData.brand && formData.product && formData.visibility && formData.audience) {
      // Clear the form data from localStorage
      localStorage.removeItem('videoDetailsData')
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
          <div className={styles.mediaPreview}>
            {mediaType === "photo" ? (
              <img src={mediaSrc || "/placeholder.svg"} alt="Preview" className={styles.media} />
            ) : (
              mediaSrc && <video src={mediaSrc} className={styles.video} autoPlay loop muted />
            )}
          </div>

          <div className={styles.form}>
            <div className={styles.username}>Username</div>

            <button className={styles.optionButton} onClick={handleproductClick}>
              <Package size={20} />
              Add Product: {formData.brand && formData.product ? `${formData.brand} - ${formData.product}` : "Not selected"}
            </button>

            <button className={styles.optionButton} onClick={handleVisibilityClick}>
              <Eye size={20} />
              Visibility: {formData.visibility || "Not set"}
            </button>

            <button className={styles.optionButton} onClick={handleAudienceClick}>
              <Users size={20} />
              Select Audience: {formData.audience ? `${formData.audience}${formData.ageRestriction ? ` (${formData.ageRestriction})` : ''}` : "Not selected"}
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
