"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { ChevronDown, ChevronUp, ArrowLeft, Search } from "lucide-react"
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"
import Link from "next/link"
import { fetchReferralsByUserId } from "../store/brandSlice"

export default function SetProductClient() {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLink, setSelectedLink] = useState("")
  const referrals = useSelector((state) => state.brands.referrals || [])

  const userId = useSelector((state) => state.auth.user?.user._id)

  useEffect(() => {
    if (userId) {
      dispatch(fetchReferralsByUserId(userId))
    }
  }, [dispatch, userId])

  useEffect(() => {
    const product = searchParams.get("product")
    if (product) {
      setSelectedLink(product)
    }
  }, [searchParams])

  const filteredReferrals = (referrals || []).filter((referral) =>
    referral.referralLink.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDone = () => {
    const currentFormData = JSON.parse(localStorage.getItem("videoDetailsData") || "{}")
    const updatedFormData = { ...currentFormData, product: selectedLink }
    localStorage.setItem("videoDetailsData", JSON.stringify(updatedFormData))
    router.push(`/video-details?product=${encodeURIComponent(selectedLink)}`)
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
                      onClick={() => {
                        setSelectedLink(referral.referralLink)
                        setIsDropdownOpen(false)
                      }}
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

