"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import styles from "../CreatorHome/TrendingBrands.module.css"
import stylebrands from "../CreatorHome/stylescreator.module.css"

const LocalBrands = () => {
  const [isHovered, setIsHovered] = useState(false)

  const brands = [
    {
      id: 1,
      name: "Nykaa Affiliate Program",
      percentage: "7.28%",
      image: "/images/image14.webp",
    },
    {
      id: 2,
      name: "AJIO's Affiliate Program",
      percentage: "5.5%",
      image: "/images/image15.webp",
    },
    {
      id: 3,
      name: "Meesho Affiliate Program",
      percentage: "4.8%",
      image: "/images/image16.webp",
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.headingWrapper}>
        <h2 className={styles.heading}>Collab with Local Brands</h2>
        <Link href="/brands" className={styles.viewAllLink}>
          View All →
        </Link>
      </div>

      <div
        className={stylebrands.topBrandsScroll}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`${stylebrands.topBrandsTrack} ${isHovered ? stylebrands.topBrandsPaused : ""}`}>
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <div key={`${brand.id}-${index}`} className={styles.card}>
              <div style={{ position: "relative", width: "100%", height: "200px" }}>
                <Image
                  src={brand.image || "/placeholder.svg"}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LocalBrands

