"use client"

import Image from "next/image"
import Link from "next/link"
import styles from '../CreatorHome/TrendingBrands.module.css'

const TrendingBrand = () => {
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
      <div className={styles.gridWrapper}>
        {brands.map((brand) => (
          <div key={brand.id} className={styles.card}>
            <div >
              <Image
                src={brand.image || "/placeholder.svg"}
                alt={brand.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className={styles.contentWrapper}>
                <div className={styles.textWrapper}>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrendingBrand
