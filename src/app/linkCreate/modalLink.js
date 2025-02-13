// modalLink.js
"use client"

import { useState } from "react"
import { X, LinkIcon, Share2, Download } from 'lucide-react'
import styles from "./share.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import { toast } from "react-hot-toast"

export default function ShareModal({ isOpen, onClose, productName, productLink }) {
  const [qrCode, setQrCode] = useState(null)

  const handleShare = async (platform) => {
    let shareUrl

    switch (platform) {
      case "Facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productLink)}`
        break
      case "Twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(productLink)}`
        break
      case "WhatsApp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(productLink)}`
        break
      // Add more cases for other platforms
      default:
        console.log(`Sharing to ${platform} is not implemented yet`)
        return
    }

    window.open(shareUrl, "_blank")
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productLink)
      toast.success("Link copied to clipboard")
    } catch (err) {
      console.error("Failed to copy link:", err)
      toast.error("Failed to copy link")
    }
  }

  const handleSaveQR = async () => {
    try {
      const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(productLink)}`)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setQrCode(url)

      const link = document.createElement("a")
      link.href = url
      link.download = "qr-code.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Failed to generate QR code:", error)
      toast.error("Failed to generate QR code")
    }
  }

  const handleMore = () => {
    // Implement additional sharing options or actions
    console.log("More options clicked")
  }

  if (!isOpen) return null

  return (
    <div className={stylesShop.bodyShop}>
      <div className={styles.smartphoneContainer}>
        <div className={styles.overlay}>
          <div className={`${styles.modal} ${isOpen ? styles.modalOpen : ""}`}>
            <div className={styles.header}>
              <h3 className={styles.title}>Share Options</h3>
              <button onClick={onClose} className={styles.closeButton}>
                <X className={styles.closeIcon} />
              </button>
            </div>

            <div className={styles.content}>
              <p className={styles.commission}>Up to 7% commission</p>
              <p className={styles.productName}>{productName}</p>
              <p className={styles.productLink}>{productLink}</p>
            </div>

            <div className={styles.socialButtons}>
              {[
                { name: "Facebook", color: "#1877F2" },
                { name: "Instagram", color: "#E4405F" },
                { name: "Messenger", color: "#0099FF" },
                { name: "Twitter", color: "#1DA1F2" },
                { name: "WhatsApp", color: "#25D366" },
              ].map((platform) => (
                <button key={platform.name} onClick={() => handleShare(platform.name)} className={styles.socialButton}>
                  <div className={styles.iconWrapper} style={{ backgroundColor: platform.color }}>
                    <Share2 className={styles.icon} />
                  </div>
                  <span className={styles.platformName}>{platform.name}</span>
                </button>
              ))}
            </div>

            <button onClick={handleCopyLink} className={styles.copyButton}>
              <LinkIcon className={styles.copyIcon} />
              Copy link
            </button>

            <div className={styles.actionButtons}>
              <button className={styles.actionButton} onClick={handleSaveQR}>
                <Download className={styles.actionIcon} />
                Save QR
              </button>
              <button className={styles.actionButton} onClick={handleMore}>
                <Share2 className={styles.actionIcon} />
                More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}