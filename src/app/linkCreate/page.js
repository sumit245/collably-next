"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import stylesShop from "../shop/StyleShop.module.css";
import FooterCreator from "../components/FooterCreator";
import ShareModal from "./modalLink";
import {
  createReferralLink,
  fetchReferralsByUserId,
  trackReferralClick,
} from "../store/brandSlice";
import { toast } from "react-hot-toast";
import { Search, Filter } from "lucide-react";

export default function LinksPage() {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState("my-links")
  const [inputText, setInputText] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const userId = useSelector(state => state.auth.user?._id)
  const { referralLink, referrals = [] } = useSelector(state => state.brands)

  useEffect(() => { userId && dispatch(fetchReferralsByUserId(userId)) }, [dispatch, userId])

  const filteredReferrals = referrals.filter(r => 
    r.referralLink.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handlePasteClick = async () => {
    if (inputText) {
      try {
        await dispatch(createReferralLink({ userId, productUrl: inputText })).unwrap()
        setIsModalOpen(true)
        setInputText("")
        dispatch(fetchReferralsByUserId(userId))
      } catch { toast.error("Failed to create link") }
    } else try {
      setInputText(await navigator.clipboard.readText())
    } catch { toast.error("Failed to paste") }
  }

  const handleLinkClick = async (e, referralLink) => {
    e.preventDefault()
    const code = referralLink.match(/referralCode=([A-Za-z0-9]{6})/)?.[1]
    try { code && await dispatch(trackReferralClick(code)).unwrap() } catch {}
    window.location.href = referralLink
  }

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <div className={styles.container}>
          <h1 className={styles.header}>Links</h1>

          <div className={styles.tabContainer}>
            {["my-links", "link-folders"].map(tab => (
              <button key={tab} className={`${styles.tab} ${activeTab === tab ? styles.activeTab : styles.inactiveTab}`}
                onClick={() => setActiveTab(tab)}>
                {tab.replace("-", " ")}
              </button>
            ))}
          </div>

          <div className={styles.createLinkSection}>
            <h2 className={styles.createLinkHeader}>Create Link</h2>
            <div className={styles.inputContainer}>
              <input value={inputText} onChange={e => setInputText(e.target.value)}
                placeholder="Paste URL here..." className={styles.input} />
              <button className={styles.button} onClick={handlePasteClick}>
                {inputText ? "Create" : "Paste"}
              </button>
            </div>
          </div>

          {activeTab === "my-links" ? <>
            <div className={styles.linksHeader}>
              <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} size={20} />
                <input type="text" placeholder="Search links..." value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)} className={styles.searchInput} />
              </div>
              <button className={styles.filterButton}><Filter size={20} />Filters</button>
            </div>

            <div className={styles.linksList}>
              {filteredReferrals.length > 0 ? filteredReferrals.map(r => (
                <div key={r._id} className={styles.linkCard} onClick={e => handleLinkClick(e, r.referralLink)}>
                  <div className={styles.linkInfo}>
                    <div className={styles.linkUrl}>{r.referralLink}</div>
                    <div className={styles.linkStats}><span>Clicks: {r.clicks}</span></div>
                  </div>
                </div>
              )) : <div className={styles.noLinks}>No links found. Create your first link above!</div>}
            </div>
          </> : <div className={styles.metricsText}>Link Folders content goes here</div>}
        </div>
        
        <FooterCreator />
        <ShareModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
          productName="Product Name" productLink={referralLink} />
      </div>
    </div>
  );
}