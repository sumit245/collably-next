"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { fetchBrands, createReferralLink } from "../store/brandSlice"
import styles from "../CreatorHome/stylescreator.module.css"
import ShareModal from "../linkCreate/modalLink"
import { toast } from "react-hot-toast"

export default function TopBrands({ heading }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentBrand, setCurrentBrand] = useState(null)

  const dispatch = useDispatch()
  const brands = useSelector((state) => state.brands.items)
  const userId = useSelector((state) => state.auth.user?._id)
  const { referralLink } = useSelector((state) => state.brands)

  useEffect(() => {
    dispatch(fetchBrands())
  }, [dispatch])

  const handleBrandClick = async (e, brand) => {
    e.preventDefault()
    
    if (!userId) {
      toast.error("Please login to create a link")
      return
    }

    try {
      setCurrentBrand(brand)
      await dispatch(createReferralLink({ 
        userId, 
        productUrl: brand.brandWebsite 
      })).unwrap()
      setIsModalOpen(true)
    } catch (error) {
      toast.error("Failed to create link")
    }
  }

  if (!brands.length) {
    return <div className={styles.topBrandsWrapper}>Loading brands...</div>
  }

  return (
    <div className={styles.topBrandsWrapper}>
      <div className={styles.headingWrapper}>
        <h2 className={styles.topBrandsTitle}>{heading}</h2>
        <Link href="/brandsdisplayCreator" className={styles.viewAllLink}>
          View All <span className={styles.arrow}>→</span>
        </Link>
      </div>
      <div
        className={styles.topBrandsScroll}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`${styles.topBrandsTrack} ${isHovered ? styles.topBrandsPaused : ""}`}>
          {[...brands, ...brands].map((brand, index) => (
            <div 
              key={`${brand.brandName || brand._id}-${index}`} 
              className={styles.topBrandsTile}
              onClick={(e) => handleBrandClick(e, brand)}
            >
              <div className={styles.topBrandsLogoWrapper}>
                <Image
                  src={brand.brandLogo || "/placeholder.svg"}
                  alt={brand.brandName}
                  width={40}
                  height={40}
                  className={styles.topBrandsLogo}
                />
              </div>
              <span className={styles.topBrandsName}>{brand.brandName}</span>
            </div>
          ))}
        </div>
      </div>
      
      <ShareModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        productName={currentBrand?.brandName || "Brand"} 
        productLink={referralLink} 
      />
    </div>
  )
}
