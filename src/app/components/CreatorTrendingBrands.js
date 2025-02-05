"use client"

import Image from "next/image"
import Link from "next/link"
import styles from '../CreatorHome/TrendingBrands.module.css'

const TrendingBrands = () => {
  // Sample data array for brands
  const brands = [
    {
      id: 1,
      name: "Walmart Affiliate Program",
      percentage: "7.28%",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      name: "Target Affiliate Program",
      percentage: "5.5%",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      name: "Amazon Affiliate Program",
      percentage: "4.8%",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.headingWrapper}>
        <h2 className={styles.heading}>Trending Brands</h2>
        <Link href="/brands" className={styles.viewAllLink}>
          View All →
        </Link>
      </div>
      <div className={styles.gridWrapper}>
        {brands.map((brand) => (
          <div key={brand.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={brand.image || "/placeholder.svg"}
                alt={brand.name}
                fill
                className={styles.cardImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className={styles.overlay} />
              <div className={styles.contentWrapper}>
                <div className={styles.textWrapper}>
                  <h3 className={styles.cardTitle}>{brand.name}</h3>
                  <p className={styles.cardPercentage}>Up to {brand.percentage}</p>
                </div>
                <button
                  onClick={() => console.log(`Create link for ${brand.name}`)}
                  className={styles.createLinkButton}
                >
                  Create Link
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrendingBrands
