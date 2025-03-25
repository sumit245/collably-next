"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"
import ShareModal from "./modalLink"
import { createReferralLink } from "../store/brandSlice"
import { toast } from "react-hot-toast"
import { ArrowLeft, LinkIcon } from "lucide-react"
import TopBrands from "../components/TopBrandLink"

export default function LinksPage() {
  const dispatch = useDispatch()
  const [inputText, setInputText] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const userId = useSelector((state) => state.auth.user?._id)
  const { referralLink } = useSelector((state) => state.brands)

  // Function to validate URL
  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  const handlePasteClick = async () => {
  
    if (!inputText) {
      try {
        setInputText(await navigator.clipboard.readText())
      } catch {
        toast.error("Failed to paste")
      }
    } else {
     
      if (!isValidUrl(inputText)) {
        alert("Please enter a valid URL (e.g., https://www.example.com)")
        return
      }

      try {
        await dispatch(createReferralLink({ userId, productUrl: inputText })).unwrap()
        setIsModalOpen(true)
        setInputText("") 
      } catch {
        toast.error("Failed to create link")
      }
    }
  }

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <div className={styles.container}>
          <div className={styles.header}>
            <button className={styles.backButton}>
              <ArrowLeft size={20} />
            </button>
            <h1 className={styles.headerTitle}>My Links</h1>
          </div>

          <div className={styles.createLinkSection}>
            <h2 className={styles.createLinkHeader}>Make your own affiliate links in seconds</h2>
            <p className={styles.createLinkSubheader}>
            Paste a link from our partnered brands websites in the box below to generate your link & share it.
            </p>

            <div className={styles.inputWrapper}>
              <div className={styles.linkIconContainer}>
                <LinkIcon className={styles.linkIcon} size={24} color="white" />
              </div>
              <input
                value={inputText}
                onChange={handleInputChange}
                placeholder="Paste Homepage or Product Link here"
                className={styles.input}
              />
            </div>

            <button className={styles.createButton} onClick={handlePasteClick}>
              {inputText ? "Generate My Link" : "PASTE LINK"} 
            </button>
          </div>

          <TopBrands heading="Quick Homepage Links of Brands " />

          <div className={styles.bestPracticesSection}>
            <h2 className={styles.bestPracticesHeader}>Best Practices & Tips:</h2>

            <div className={styles.practiceItem}>
              <div className={styles.bulletPoint}></div>
              <div className={styles.practiceContent}>
                <p className={styles.practiceTitle}>Ensure Link Format is Correct:</p>
                <div className={styles.exampleContainer}>
                  <div className={styles.circle}></div>
                  <p>
                    <span className={styles.rightText}>Right:</span> https://www.oneplus.in
                  </p>
                </div>
                <div className={styles.exampleContainer}>
                  <div className={styles.circle}></div>
                  <p>
                    <span className={styles.wrongText}>Wrong:</span> oneplus.in (missing https://)
                  </p>
                </div>
                <p className={styles.tipText}>Tip: Copy directly from the Address Bar and paste</p>
              </div>
            </div>
          </div>
        </div>

        <FooterCreator />
        <ShareModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productName="Product Name"
          productLink={referralLink}
        />
      </div>
    </div>
  )
}

