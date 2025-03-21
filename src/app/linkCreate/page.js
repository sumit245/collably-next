"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"
import ShareModal from "./modalLink"
import { createReferralLink } from "../store/brandSlice"
import { toast } from "react-hot-toast"
import { ArrowLeft, LinkIcon } from 'lucide-react'
import TopBrands from '../components/TopBrandLink';

export default function LinksPage() {
  const dispatch = useDispatch()
  const [inputText, setInputText] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isButtonClicked, setIsButtonClicked] = useState(false)  // Track button click state
  const userId = useSelector(state => state.auth.user?._id)
  const { referralLink } = useSelector(state => state.brands)

  const handlePasteClick = async () => {
    if (!isButtonClicked) {  // If the button hasn't been clicked yet, try to paste
      try {
        setInputText(await navigator.clipboard.readText()) // Paste the clipboard content into the input field
        setIsButtonClicked(true)  // Change button text to "Make Profit Link"
      } catch {
        toast.error("Failed to paste")
      }
    } else {  // If the button is clicked, create the referral link
      if (inputText) {
        try {
          await dispatch(createReferralLink({ userId, productUrl: inputText })).unwrap()
          setIsModalOpen(true)
          setInputText("")  // Clear input after generating the link
          setIsButtonClicked(false)  // Reset button state after link is generated
        } catch {
          toast.error("Failed to create link")
        }
      } else {
        toast.error("Please paste a valid URL")
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
            <h2 className={styles.createLinkHeader}>Make your own Profit Links in Seconds</h2>
            <p className={styles.createLinkSubheader}>
              Paste a link from our active partner sites in the box below to make a link & share it
            </p>
            
            <div className={styles.inputWrapper}>
              <div className={styles.linkIconContainer}>
                <LinkIcon className={styles.linkIcon} size={24} color="white" />
              </div>
              <input 
                value={inputText} 
                onChange={e => setInputText(e.target.value)}
                placeholder="Paste homepage or product link here" 
                className={styles.input} 
              />
            </div>
            
            <button 
              className={styles.createButton} 
              onClick={handlePasteClick}
            >
              {isButtonClicked ? "MAKE PROFIT LINK" : "PASTE LINK"}  {/* Conditional button text */}
            </button>
          </div>

          <TopBrands heading="Quick Homepage Links of Brands "/>
            
          <div className={styles.bestPracticesSection}>
            <h2 className={styles.bestPracticesHeader}>Best Practices & Tips:</h2>
            
            <div className={styles.practiceItem}>
              <div className={styles.bulletPoint}></div>
              <div className={styles.practiceContent}>
                <p className={styles.practiceTitle}>Ensure Link Format is Correct:</p>
                <div className={styles.exampleContainer}>
                  <div className={styles.circle}></div>
                  <p><span className={styles.rightText}>Right:</span> https://www.oneplus.in</p>
                </div>
                <div className={styles.exampleContainer}>
                  <div className={styles.circle}></div>
                  <p><span className={styles.wrongText}>Wrong:</span> oneplus.in (missing https://)</p>
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