"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { ArrowLeft } from 'lucide-react'
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"
import { createReferralLink } from "../store/brandSlice"
import Link from 'next/link'

export default function SetProduct() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [selectedBrand, setSelectedBrand] = useState("")
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false)
  const [brandSearchQuery, setBrandSearchQuery] = useState("")
  const brands = useSelector((state) => state.brands.items)
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent("/set-product")}`)
    }
  }, [user, router])

  const handleBrandSelect = (brandId, brandLink) => {
    setSelectedBrand(brandId)
    // Assuming brandLink is the link you want to set when a brand is clicked
    setIsBrandDropdownOpen(false)
  }

  const handleDone = async () => {
    if (!user) {
      console.error("User is not logged in")
      router.push(`/login?redirect=${encodeURIComponent("/set-product")}`)
      return
    }

    const userId = user._id || user.id || user.user?._id || user.user?.id

    if (!userId) {
      console.error("Unable to find user ID in the user object:", user)
      return
    }

    if (selectedBrand && userId) {
      try {
        const result = await dispatch(
          createReferralLink({
            userId: userId,
            brandId: selectedBrand,
          }),
        ).unwrap()

        const storedData = localStorage.getItem("videoDetailsData")
        const updatedData = storedData ? JSON.parse(storedData) : {}
        updatedData.brand = brands.find((brand) => brand._id === selectedBrand)?.brandName
        updatedData.referralLink = result.referralLink
        localStorage.setItem("videoDetailsData", JSON.stringify(updatedData))
        router.back()
      } catch (error) {
        console.error("Failed to create referral link:", error)
      }
    } else {
      console.error("Please select a brand")
    }
  }

  if (!user) {
    return null
  }

  const selectedBrandData = brands.find((brand) => brand._id === selectedBrand)
  const filteredBrands = brands.filter((brand) =>
    brand.brandName.toLowerCase().includes(brandSearchQuery.toLowerCase())
  )

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <div className={styles.container}>
          <Link href="/video-details">
            <button className={styles.backButton}>
              <ArrowLeft size={24} color="white" />
            </button>
          </Link>
          <h1 className={styles.title}>Select Referral Link</h1>
          <div className={styles.dropdownContainer}>
            {/* Select Link Dropdown */}
            <div className={styles.customDropdown}>
              <label htmlFor="brand">Select Link</label>
              <div className={styles.dropdownHeader} onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}>
                {selectedBrandData ? (
                  <div className={styles.selectedItem}>
                    <span className={styles.itemName}>{selectedBrandData.brandName}</span>
                    <span className={styles.itemDescription}>{selectedBrandData.brandDescription}</span>
                  </div>
                ) : (
                  <span className={styles.placeholder}>Select a Link...</span>
                )}
              </div>
              {isBrandDropdownOpen && (
                <div className={styles.dropdownList}>
                  <div className={styles.searchInputWrapper}>
                    <input
                      type="text"
                      placeholder="Search brands..."
                      value={brandSearchQuery}
                      onChange={(e) => setBrandSearchQuery(e.target.value)}
                      className={styles.searchInput}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  {filteredBrands.map((brand) => (
                    <div
                      key={brand._id}
                      className={`${styles.dropdownItem} ${selectedBrand === brand._id ? styles.selected : ""}`}
                      onClick={() => handleBrandSelect(brand._id, brand.referralLink)}
                    >
                      <span className={styles.itemName}>https://collab.ly/QALSdo</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button className={styles.doneButton} onClick={handleDone} disabled={!selectedBrand}>
            Done
          </button>
        </div>
        <FooterCreator />
      </div>
    </div>
  )
}
