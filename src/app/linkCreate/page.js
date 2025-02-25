"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"
import ShareModal from "./modalLink"
import { createReferralLink, fetchReferralsByUserId, trackReferralClick } from "../store/brandSlice"
import { toast } from "react-hot-toast"
import { Search, Filter } from "lucide-react"

export default function LinksPage() {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState("my-links")
  const [inputText, setInputText] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const userId = useSelector((state) => state.auth.user?._id)
  const referralLink = useSelector((state) => state.brands.referralLink)
  const referrals = useSelector((state) => state.brands.referrals || [])

  useEffect(() => {
    if (userId) {
      dispatch(fetchReferralsByUserId(userId))
    }
  }, [dispatch, userId])

  const filteredReferrals = referrals.filter((referral) =>
    referral.referralLink.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  const handlePasteClick = async () => {
    if (inputText) {
      try {
        await dispatch(createReferralLink({ userId, productUrl: inputText })).unwrap()
        setIsModalOpen(true)
        setInputText("")
        dispatch(fetchReferralsByUserId(userId))
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

  const handleLinkClick = async (referralCode, referralLink, e) => {
    e.preventDefault() 

    try {
      await dispatch(trackReferralClick(referralCode)).unwrap()

      window.location.href = referralLink
    } catch (error) {
      console.error("Failed to track click:", error)
      window.location.href = referralLink
    }
  }

  const extractReferralCode = (url) => {
    const match = url.match(/referralCode=([A-Za-z0-9]{6})/)
    return match ? match[1] : null
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
              <div className={styles.linksHeader}>
                <div className={styles.searchContainer}>
                  <Search className={styles.searchIcon} size={20} />
                  <input
                    type="text"
                    placeholder="Search links..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>
                <button className={styles.filterButton}>
                  <Filter size={20} />
                  Filters
                </button>
              </div>

              <div className={styles.linksList}>
                {filteredReferrals.length > 0 ? (
                  filteredReferrals.map((referral) => {
                    const referralCode = extractReferralCode(referral.referralLink)
                    return (
                      <div
                        key={referral._id}
                        className={styles.linkCard}
                        onClick={(e) => handleLinkClick(referralCode, referral.referralLink, e)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className={styles.linkInfo}>
                          <div className={styles.linkUrl}>{referral.referralLink}</div>
                          <div className={styles.linkStats}>
                            <span>Clicks: {referral.clicks}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className={styles.noLinks}>No links found. Create your first link above!</div>
                )}
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
          productName="Product Name"
          productLink={referralLink}
        />
      </div>
    </div>
  )
}

