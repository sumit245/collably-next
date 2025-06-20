"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { ChevronDown, ChevronUp, ArrowLeft, Search, Plus, X } from 'lucide-react'
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"
import Link from "next/link"
import { fetchReferralsByUserId } from "../store/brandSlice"
import { updateFormData } from "../store/mediaSlice"

export default function SetProductClient() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLinks, setSelectedLinks] = useState([])
  const [currentSelection, setCurrentSelection] = useState("")
  const referrals = useSelector((state) => state.brands.referrals || [])
  const formData = useSelector((state) => state.media.formData)

  const userId = useSelector((state) => state.auth.user?._id)

  useEffect(() => {
    if (userId) {
      dispatch(fetchReferralsByUserId(userId))
    }
  }, [dispatch, userId])

  // Initialize selected links from formData if available
  useEffect(() => {
    if (formData.product) {
      const links = Array.isArray(formData.product) 
        ? formData.product 
        : formData.product.split(',').map(link => link.trim())
      setSelectedLinks(links)
    }
  }, [formData.product])

  const filteredReferrals = (referrals || []).filter((referral) =>
    referral.referralLink.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDone = () => {
    if (selectedLinks.length > 0) {
      dispatch(updateFormData({ product: selectedLinks.join(', ') }))
    }
    router.push('/video-details')
  }

  const handleSelectLink = (link) => {
    setCurrentSelection(link)
    setIsDropdownOpen(false)
  }

  const handleAddLink = () => {
    if (!currentSelection || selectedLinks.includes(currentSelection) || selectedLinks.length >= 8) return
    
    const newLinks = [...selectedLinks, currentSelection]
    setSelectedLinks(newLinks)
    dispatch(updateFormData({ product: newLinks.join(', ') }))
    setCurrentSelection("")
  }

  const handleRemoveLink = (index) => {
    const newLinks = selectedLinks.filter((_, i) => i !== index)
    setSelectedLinks(newLinks)
    dispatch(updateFormData({ product: newLinks.join(', ') }))
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
          <h1 className={styles.title}>Add Links (Max 8)</h1>
          
          <div className={styles.dropdownContainer}>
            <div className={styles.customDropdown}>
              <label htmlFor="link">Select Link</label>
              <div className={styles.dropdownHeader} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <span className={styles.placeholder}>{currentSelection || "Select a link"}</span>
                {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {isDropdownOpen && (
                <div className={styles.dropdownList}>
                  <div className={styles.searchContainer}>
                    <Search size={20} />
                    <input
                      type="text"
                      placeholder="Search links..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={styles.searchInput}
                    />
                  </div>
                  {filteredReferrals.map((referral) => (
                    <div
                      key={referral._id}
                      className={styles.dropdownItem}
                      onClick={() => handleSelectLink(referral.referralLink)}
                    >
                      {referral.referralLink}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className={styles.addLinkContainer}>
              <button 
                className={`${styles.addButton} ${!currentSelection || selectedLinks.includes(currentSelection) || selectedLinks.length >= 8 ? styles.disabledButton : ''}`}
                onClick={handleAddLink}
                disabled={!currentSelection || selectedLinks.includes(currentSelection) || selectedLinks.length >= 8}
              >
                <Plus size={16} /> Add Link
              </button>
            </div>
            
            {selectedLinks.length > 0 && (
              <div className={styles.selectedLinksContainer}>
                <h3 className={styles.selectedLinksTitle}>Selected Links ({selectedLinks.length}/8)</h3>
                <div className={styles.linksList}>
                  {selectedLinks.map((link, index) => (
                    <div key={index} className={styles.linkItem}>
                      <span className={styles.linkText}>{link}</span>
                      <button 
                        className={styles.removeButton}
                        onClick={() => handleRemoveLink(index)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button 
            className={`${styles.doneButton} ${selectedLinks.length === 0 ? styles.disabledButton : ''}`}
            onClick={handleDone}
            disabled={selectedLinks.length === 0}
          >
            Done
          </button>
        </div>
        <FooterCreator />
      </div>
    </div>
  )
}
