"use client"

import { X, LinkIcon, Share2, Download } from "lucide-react"
import styles from "./share.module.css"
import stylesShop from "../shop/StyleShop.module.css"

export default function ShareModal({ isOpen, onClose, productName, productLink }) {
  const handleShare = async (platform) => {
    // Implement actual sharing logic here
    console.log(`Sharing to ${platform}:`, productLink)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productLink)
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
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
          <button className={styles.actionButton}>
            <Download className={styles.actionIcon} />
            Save QR
          </button>
          <button className={styles.actionButton}>
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

