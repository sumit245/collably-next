"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { fetchProductMetadata } from "./ProductMetadata"
import styles from "../feed/stylesfeed.module.css"

export default function ProductPreview({ url, onClick }) {
  const [metadata, setMetadata] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadMetadata() {
      try {
        setLoading(true)
        const data = await fetchProductMetadata(url)
        setMetadata(data)
      } catch (err) {
        setError("Failed to load product information")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (url) {
      loadMetadata()
    }
  }, [url])

  if (loading) {
    return <div className={styles.productPreviewLoading}>Loading product...</div>
  }

  if (error || !metadata) {
    return (
      <a href={url} onClick={onClick} className={styles.productPreviewError} rel="noopener noreferrer">
        {url}
      </a>
    )
  }

  return (
    <a href={url} onClick={onClick} className={styles.productPreview} rel="noopener noreferrer">
      <div className={styles.productPreviewImage}>
        {metadata.image ? (
          <Image
            src={metadata.image || "/placeholder.svg"}
            alt={metadata.title || "Product"}
            width={100}
            height={100}
            objectFit="cover"
          />
        ) : (
          <div className={styles.productPreviewNoImage}>No image available</div>
        )}
      </div>
      <div className={styles.productPreviewInfo}>
        <h4 className={styles.productPreviewTitle}>{metadata.title || "Product"}</h4>
        {metadata.price && <p className={styles.productPreviewPrice}>{metadata.price}</p>}
        <p className={styles.productPreviewShop}>View product</p>
      </div>
    </a>
  )
}

