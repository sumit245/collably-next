// linkCreate.js
"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"
import ShareModal from "./modalLink"
import { createReferralLink } from "../store/brandSlice"
import { toast } from "react-hot-toast"

export default function LinksPage() {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState("my-links")
  const [inputText, setInputText] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const userId = useSelector((state) => state.auth.user?.user._id)
  const referralLink = useSelector((state) => state.brands.referralLink)
console.log(userId)
  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  const handlePasteClick = async () => {
    if (inputText) {
      try {
        await dispatch(createReferralLink({ userId, productUrl: inputText })).unwrap()
        setIsModalOpen(true)
      } catch (error) {
        toast.error("Failed to create referral link")
      }
    } else {
      try {
        const clipboardText = await navigator.clipboard.readText()
        setInputText(clipboardText)
      } catch (err) {
        console.error("Failed to read clipboard contents: ", err)
        toast.error("Failed to paste from clipboard")
      }
    }
  }

  const buttonLabel = inputText ? "Create" : "Paste"

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <div className={styles.container}>
          <h1 className={styles.header}>Links</h1>

          <div className={styles.tabContainer}>
            <button
              className={`${styles.tab} ${activeTab === "my-links" ? styles.activeTab : styles.inactiveTab}`}
              onClick={() => setActiveTab("my-links")}
            >
              My Links
            </button>
            <button
              className={`${styles.tab} ${activeTab === "link-folders" ? styles.activeTab : styles.inactiveTab}`}
              onClick={() => setActiveTab("link-folders")}
            >
              Link Folders
            </button>
          </div>

          <div className={styles.createLinkSection}>
            <h2 className={styles.createLinkHeader}>Create Link</h2>
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="Paste URL here..."
                className={styles.input}
                value={inputText}
                onChange={handleInputChange}
              />
              <button className={styles.button} onClick={handlePasteClick}>
                {buttonLabel}
              </button>
            </div>
          </div>

          {activeTab === "my-links" ? (
            <>
              <div className={styles.loadingSection}>
                <div className={styles.loadingHeader}>
                  <span className={styles.loadingText}>Loading...</span>
                  <div className={styles.actionButtons}>
                    <button className={styles.actionButton}>Filters</button>
                    <button className={styles.actionButton}>Search</button>
                  </div>
                </div>
                <p className={styles.metricsText}>Metrics are lifetime totals</p>
              </div>

              <div className={styles.cardContainer}>
                {[1, 2, 3].map((i) => (
                  <div key={i} className={styles.card} />
                ))}
              </div>
            </>
          ) : (
            <div className={styles.metricsText}>Link Folders content goes here</div>
          )}
        </div>
        <FooterCreator />

        <ShareModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productName="Product Name" // You might want to fetch this from the API response
          productLink={referralLink}
        />
      </div>
    </div>
  )
}