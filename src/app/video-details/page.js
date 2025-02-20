"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"
import { Package, Eye, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

const MediaDetailsContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useDispatch()
  const [mediaSrc, setMediaSrc] = useState("")
  const [mediaType, setMediaType] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    product: "",
    visibility: "",
    audience: "",
    ageRestriction: "",
  })
  const accessToken = localStorage.getItem("accessToken")
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (!accessToken) {
      console.error("Access token is missing")
      setError("Authentication failed. Please log in again.")
      return
    }

    const src = searchParams.get("mediaSrc")
    const type = searchParams.get("mediaType")
    const mediaId = searchParams.get("mediaId")
    const product = searchParams.get("product")

    if (src) {
      setMediaSrc(src)
      localStorage.setItem("savedMediaSrc", src)
    } else if (mediaId) {
      const storedMedia = sessionStorage.getItem(`media_${mediaId}`)
      if (storedMedia) {
        setMediaSrc(storedMedia)
        localStorage.setItem("savedMediaSrc", storedMedia)
      }
    } else {
      const savedSrc = localStorage.getItem("savedMediaSrc")
      if (savedSrc) {
        setMediaSrc(savedSrc)
      }
    }

    if (type) {
      setMediaType(type)
      localStorage.setItem("savedMediaType", type)
    } else {
      const savedType = localStorage.getItem("savedMediaType")
      if (savedType) {
        setMediaType(savedType)
      }
    }

    const storedFormData = localStorage.getItem("videoDetailsData")
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData)
      setFormData((prevState) => ({
        ...parsedFormData,
        product: product || parsedFormData.product || prevState.product,
      }))
    } else if (product) {
      setFormData((prevState) => ({ ...prevState, product }))
    }
  }, [searchParams, accessToken])

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

      if (!mediaSrc) {
        throw new Error("No media selected")
      }

      console.log("Media source type:", typeof mediaSrc)
      console.log("Media source length:", mediaSrc.length)

      const postFormData = new FormData();
const fileExtension = mediaType === "photo" ? "jpg" : "webm";
const mediaFile = await getFileFromSource(mediaSrc, `media_${Date.now()}.${fileExtension}`);
if (!mediaFile) {
  throw new Error("Failed to create file from media source");
}

      postFormData.append("media", mediaFile)
      postFormData.append("caption", formData.product)

      if (formData.audience) postFormData.append("audience", formData.audience)
      if (formData.ageRestriction) postFormData.append("ageRestriction", formData.ageRestriction)

      console.log("FormData entries:")
      for (const [key, value] of postFormData.entries()) {
        console.log(`${key}:`, value)
      }

      const accessToken = localStorage.getItem("accessToken")

      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          Authorization: accessToken,
        },
        body: postFormData,
      })

      const result = await response.text()
      console.log(result)

      localStorage.removeItem("videoDetailsData")
      localStorage.removeItem("savedMediaSrc")
      localStorage.removeItem("savedMediaType")

      router.push("/upload-success")
    } catch (err) {
      setError(err.message || "Failed to upload post")
      console.error("Upload error:", err)
    } finally {
      setIsLoading(false)
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

          {error && <div className={styles.error}>{error}</div>}

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

