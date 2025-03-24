"use client"

import { useState, useEffect } from "react"
import { fetchProductMetadata } from "./product-metadata"
import styles from "../feed/stylesfeed.module.css"

export default function ProductPreview({ url, onClick }) {
  const [metadata, setMetadata] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadMetadata() {
      try {
        setLoading(true)
        const data = await fetchProductMetadata(url)
        if (isMounted) {
          setMetadata(data)
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load product information")
          console.error(err)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    if (url) {
      loadMetadata()
    }

    return () => {
      isMounted = false
    }
  }, [url])
  console.log("meta",metadata)
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
          <img
            src={metadata.image || "/placeholder.svg"}
            alt={metadata.title || "Product"}
            className={styles.productPreviewImg}
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

