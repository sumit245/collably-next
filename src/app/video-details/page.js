"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"
import { Package, Tag, Users, ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { clearCurrentMedia, clearFormData } from "../store/mediaSlice"
import { BASE_URL } from "../services/api"

const MediaDetailsContent = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const currentMedia = useSelector((state) => state.media.currentMedia)
  const formData = useSelector((state) => state.media.formData)
  const user = useSelector((state) => state.auth.user)
  const [accessToken, setAccessToken] = useState(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken")
      setAccessToken(token)
    }
  }, [])

  useEffect(() => {
    if (!accessToken) {
      setError("Authentication failed. Please log in again.")
      return
    }
  }, [accessToken])

  const getFileFromSource = async (src, fileName) => {
    if (src.startsWith("data:")) {
      const [mime, bstr] = src.split(",")
      const u8arr = new Uint8Array(
        atob(bstr)
          .split("")
          .map((c) => c.charCodeAt(0)),
      )
      return new File([u8arr], fileName, { type: mime.match(/:(.*?);/)[1] })
    }
    const response = await fetch(src)
    const blob = await response.blob()
    return new File([blob], fileName, { type: blob.type })
  }

  const handleSubmit = async () => {
    if (!formData.product || !formData.category || !formData.audience) return

    try {
      setIsLoading(true)
      setError(null)
      if (!currentMedia?.src) throw new Error("No media selected")

      const postFormData = new FormData()
      const fileExtension = currentMedia.type === "photo" ? "jpg" : "mp4"
      const mediaFile = await getFileFromSource(currentMedia.src, `media_${Date.now()}.${fileExtension}`)

      if (!mediaFile) throw new Error("Failed to create file from media source")

      postFormData.append("media", mediaFile)

      // Handle multiple links (product is now a comma-separated string)
      if (formData.product) {
        // Split the comma-separated string into an array and trim each link
        const links = formData.product.split(",").map((link) => link.trim())
        // Append each link to the form data
        postFormData.append("links", JSON.stringify(links))
      }

      // Keep the original product field for backward compatibility
      postFormData.append("caption", formData.product)
      
      // Add category as a tag
      if (formData.category) {
        postFormData.append("tags", formData.category)
      }

      if (formData.audience) postFormData.append("audience", formData.audience)
      if (formData.ageRestriction) postFormData.append("ageRestriction", formData.ageRestriction)

      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: { Authorization: accessToken },
        body: postFormData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload post")
      }

      dispatch(clearCurrentMedia())
      dispatch(clearFormData())
      router.refresh()
      router.push("/upload-success")
    } catch (err) {
      console.error("Upload error:", err.message)
      router.push("/upload-error")
    } finally {
      setIsLoading(false)
    }
  }

  if (!currentMedia) return null

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
            <div className={styles.username}>{user?.username || "Username"}</div>

            <button className={styles.optionButton} onClick={() => router.push("/set-product")}>
              <Package size={20} /> Add Links:{" "}
              {formData.product ? `${formData.product.split(",").length} links added` : "Not selected"}
            </button>

            <button className={styles.optionButton} onClick={() => router.push("/set-visibility")}>
              <Tag size={20} /> Category: {formData.category || "Not set"}
            </button>

            <button className={styles.optionButton} onClick={() => router.push("/select-audience")}>
              <Users size={20} />
              Select Audience:{" "}
              {formData.audience
                ? `${formData.audience}${formData.ageRestriction ? ` (${formData.ageRestriction})` : ""}`
                : "Not selected"}
            </button>

            <button
              className={`${styles.doneButton} ${!(formData.product && formData.category && formData.audience) || isLoading ? styles.disabledButton : ""}`}
              onClick={handleSubmit}
              disabled={!(formData.product && formData.category && formData.audience) || isLoading}
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
  return <MediaDetailsContent />
}