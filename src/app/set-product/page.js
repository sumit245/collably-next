"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react'
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"
import Link from "next/link"

export default function SetProduct() {
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const linkUrl = "https://collab.ly/QALSdo"

  const handleDone = () => {
    router.push(`/video-details?product=${encodeURIComponent(linkUrl)}`)
  }

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <div className={styles.container}>
          <Link href="/video-details">
            <button className={styles.backButton}>
              <ArrowLeft size={24} color="white" />
            </button>
          </Link>
          <h1 className={styles.title}>Add Link</h1>
          <div className={styles.dropdownContainer}>
            <div className={styles.customDropdown}>
              <label htmlFor="link">Add Link</label>
              <div className={styles.dropdownHeader} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <span className={styles.placeholder}>{linkUrl}</span>
                {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {isDropdownOpen && (
                <div className={styles.dropdownList}>
                  <div className={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
                    {linkUrl}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button className={styles.doneButton} onClick={handleDone}>
            Done
          </button>
        </div>
        <FooterCreator />
      </div>
    </div>
  )
}
