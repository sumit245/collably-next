"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { fetchBrands } from "../store/brandSlice"
import styles from "../CreatorHome/stylescreator.module.css"

export default function TopBrands() {
  const [isHovered, setIsHovered] = useState(false)

  const dispatch = useDispatch()
  const brands = useSelector((state) => state.brands.items)

  useEffect(() => {
    dispatch(fetchBrands())
  }, [dispatch])

  // If brands array is empty, show a loading state or return null
  if (!brands.length) {
    return <div className={styles.topBrandsWrapper}>Loading brands...</div>
  }

  return (
    <div className={styles.topBrandsWrapper}>
      <h2 className={styles.topBrandsTitle}>Explore all Top Brands</h2>

      <div
        className={styles.topBrandsScroll}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`${styles.topBrandsTrack} ${isHovered ? styles.topBrandsPaused : ""}`}>
          {/* Duplicate the brands array to create a continuous scrolling effect */}
          {[...brands, ...brands].map((brand, index) => (
            <div key={`${brand.brandName || brand._id}-${index}`} className={styles.topBrandsTile}>
              <Link href={brand.brandWebsite} className={styles.topBrandsLogoWrapper}>
                <Image
                  src={brand.brandLogo || "/placeholder.svg"}
                  alt={brand.brandName}
                  width={40}
                  height={40}
                  className={styles.topBrandsLogo}
                />
              </Link>
              <span className={styles.topBrandsName}>{brand.brandName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

