'use client'

import { useState, useEffect, Suspense } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"
import { Package, Eye, Users, ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { updateFormData, clearCurrentMedia, clearFormData } from '../store/mediaSlice'

const MediaDetailsContent = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const currentMedia = useSelector((state) => state.media.currentMedia)
  const formData = useSelector((state) => state.media.formData)
  const user = useSelector((state) => state.auth.user)
  const accessToken = localStorage.getItem("accessToken")
  

  useEffect(() => {
    if (!accessToken) {
      console.error("Access token is missing")
      setError("Authentication failed. Please log in again.")
      return
    }

    if (!currentMedia) {
      router.push('/CreatorShop')
    }
  }, [accessToken, currentMedia, router])

  const getFileFromSource = async (src, fileName) => {
    console.log("Source type:", typeof src)
    console.log("Source value:", src.substring(0, 100) + "...")

    if (src.startsWith("data:")) {
      const arr = src.split(",")
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], fileName, { type: mime })
    } else if (src.startsWith("blob:") || src.startsWith("http:") || src.startsWith("https:")) {
      const response = await fetch(src)
      const blob = await response.blob()
      return new File([blob], fileName, { type: blob.type })
    } else {
      const response = await fetch(src)
      const blob = await response.blob()
      return new File([blob], fileName, { type: blob.type })
    }
  }

  const handleSubmit = async () => {
    if (!formData.product || !formData.visibility || !formData.audience) {
      console.warn("Form is incomplete")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      if (!currentMedia?.src) {
        throw new Error("No media selected")
      }

      const postFormData = new FormData()
      const fileExtension = currentMedia.type === "photo" ? "jpg" : "mp4"
      const mediaFile = await getFileFromSource(currentMedia.src, `media_${Date.now()}.${fileExtension}`)
      
      if (!mediaFile) {
        throw new Error("Failed to create file from media source")
      }

      postFormData.append("media", mediaFile)
      postFormData.append("caption", formData.product)

      if (formData.audience) postFormData.append("audience", formData.audience)
      if (formData.ageRestriction) postFormData.append("ageRestriction", formData.ageRestriction)

      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          Authorization: accessToken,
        },
        body: postFormData,
      })

      const result = await response.text()
      console.log(result)

      // Clear Redux state
      dispatch(clearCurrentMedia())
      dispatch(clearFormData())

      router.push("/upload-success")
    } catch (err) {
      setError(err.message || "Failed to upload post")
      console.error("Upload error:", err)
    } finally {
      setIsLoading(false)
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

  const isFormComplete = formData.product && formData.visibility && formData.audience

  if (!currentMedia) {
    return null
  }

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <div className={styles.container}>
          <Link href="/preview">
            <button className={styles.backButton}>
              <ArrowLeft size={24} color="white" />
            </button>
          </Link>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.mediaPreview}>
            {currentMedia.type === "photo" ? (
              <img src={currentMedia.src || "/placeholder.svg"} alt="Preview" className={styles.media} />
            ) : (
              currentMedia.src && <video src={currentMedia.src} className={styles.video} autoPlay loop muted />
            )}
          </div>

          <div className={styles.form}>
            <div className={styles.username}>{user?.username || user?.username || "Username"}</div>

            <button className={styles.optionButton} onClick={handleproductClick}>
              <Package size={20} />
              Add Link: {formData.product || "Not selected"}
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
              className={`${styles.doneButton} ${!isFormComplete || isLoading ? styles.disabledButton : ""}`}
              onClick={handleSubmit}
              disabled={!isFormComplete || isLoading}
            >
              {isLoading ? "Uploading..." : "Done"}
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
