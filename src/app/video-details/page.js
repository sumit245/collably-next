// post-details.js
"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"
import { Package, Eye, Users, Copy, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const MediaDetailsContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mediaSrc, setMediaSrc] = useState("")
  const [mediaType, setMediaType] = useState("")
  const [formData, setFormData] = useState({
    product: "",
    visibility: "",
    audience: "",
    ageRestriction: "",
  })

  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    const src = searchParams.get("mediaSrc")
    const type = searchParams.get("mediaType")
    const mediaId = searchParams.get("mediaId")
    const product = searchParams.get("product")
  
    if (src) {
      setMediaSrc(src)
      localStorage.setItem("savedMediaSrc", src) // Save it before navigation
    } else if (mediaId) {
      const storedMedia = sessionStorage.getItem(`media_${mediaId}`)
      if (storedMedia) {
        setMediaSrc(storedMedia)
        localStorage.setItem("savedMediaSrc", storedMedia) // Save it before navigation
      }
    } else {
      // Retrieve from localStorage if returning from another page
      const savedSrc = localStorage.getItem("savedMediaSrc")
      if (savedSrc) {
        setMediaSrc(savedSrc)
      }
    }
  
    if (type) {
      setMediaType(type)
      localStorage.setItem("savedMediaType", type) // Save type as well
    } else {
      const savedType = localStorage.getItem("savedMediaType")
      if (savedType) {
        setMediaType(savedType)
      }
    }
  
    const storedFormData = localStorage.getItem("videoDetailsData")
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData)
      setFormData(prevState => ({
        ...parsedFormData,
        product: product || parsedFormData.product || prevState.product
      }))
    } else if (product) {
      setFormData(prevState => ({ ...prevState, product }))
    }
  }, [searchParams])
  

  const handleSubmit = async () => {
    if (formData.product && formData.visibility && formData.audience) {
      localStorage.removeItem("videoDetailsData")
      router.push("/upload-success")
    }
  }

  const handleproductClick = () => {
    if (mediaSrc) {
      localStorage.setItem("savedMediaSrc", mediaSrc) 
    }
    router.push("/set-product")
  }
  

  const handleVisibilityClick = () => {
    router.push("/set-visibility")
  }

  const handleAudienceClick = () => {
    router.push("/select-audience")
  }

  const isFormComplete = formData.product && formData.visibility && formData.audience

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <div className={styles.container}>
          <Link href="/preview">
            <button className={styles.backButton}>
              <ArrowLeft size={24} color="white" />
            </button>
          </Link>
          <div className={styles.mediaPreview}>
            {mediaType === "photo" ? (
              <img src={mediaSrc || "/placeholder.svg"} alt="Preview" className={styles.media} />
            ) : (
              mediaSrc && <video src={mediaSrc} className={styles.video} autoPlay loop muted />
            )}
          </div>

          <div className={styles.form}>
            <div className={styles.username}>{user?.username || user?.user?.username || "Username"}</div>

            <button className={styles.optionButton} onClick={handleproductClick}>
              <Package size={20} />
              Add Product: {formData.product || "Not selected"}
            </button>

            <button className={styles.optionButton} onClick={handleVisibilityClick}>
              <Eye size={20} />
              Visibility: {formData.visibility || "Not set"}
            </button>

            <button className={styles.optionButton} onClick={handleAudienceClick}>
              <Users size={20} />
              Select Audience:{" "}
              {formData.audience
                ? `${formData.audience}${formData.ageRestriction ? ` (${formData.ageRestriction})` : ""}`
                : "Not selected"}
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

export default function MediaDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MediaDetailsContent />
    </Suspense>
  )
}