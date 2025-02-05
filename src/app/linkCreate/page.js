"use client"

import { useState } from "react"
import styles from "./page.module.css"
import FooterCreator from '../components/FooterCreator'
import stylesShop from '../shop/StyleShop.module.css';

export default function LinksPage() {
  const [activeTab, setActiveTab] = useState("my-links")
  const [inputText, setInputText] = useState("") 

  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  const handlePasteClick = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setInputText(clipboardText) 
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err)
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
              <button 
                className={styles.button} 
                onClick={handlePasteClick}
              >
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
      </div>
    </div>
  )
}