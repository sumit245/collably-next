"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { ChevronDown, ChevronUp, ArrowLeft, Search } from 'lucide-react'
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
  const referrals = useSelector((state) => state.brands.referrals || [])
  const selectedLink = useSelector((state) => state.media.formData.product)

  const userId = useSelector((state) => state.auth.user?._id)

  useEffect(() => {
    if (userId) {
      dispatch(fetchReferralsByUserId(userId))
    }
  }, [dispatch, userId])

  const filteredReferrals = (referrals || []).filter((referral) =>
    referral.referralLink.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDone = () => {
    router.push('/video-details')
  }

  const handleSelectLink = (link) => {
    dispatch(updateFormData({ product: link }))
    setIsDropdownOpen(false)
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
                <span className={styles.placeholder}>{selectedLink || "Select a link"}</span>
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