"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { createReferralLink } from "../store/brandSlice"
import styles from "../CreatorHome/TrendingBrands.module.css"
import ShareModal from "../linkCreate/modalLink"
import { toast } from "react-hot-toast"

const TrendingBrands = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentBrand, setCurrentBrand] = useState(null)

  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.user?._id)
  const { referralLink } = useSelector((state) => state.brands)

  const brands = [
    {
      id: 1,
      name: "Nykaa Affiliate Program",
      percentage: "7.28%",
      image: "/images/image14.webp",
      website: "https://www.nykaa.com/",
    },
    {
      id: 2,
      name: "AJIO's Affiliate Program",
      percentage: "5.5%",
      image: "/images/image15.webp",
      website: "https://www.ajio.com/",
    },
    {
      id: 3,
      name: "Meesho Affiliate Program",
      percentage: "4.8%",
      image: "/images/image16.webp",
      website: "https://www.meesho.com/",
    },
  ]

  const handleCreateLink = async (brand) => {
    if (!userId) {
      toast.error("Please login to create a link")
      return
    }

    try {
      setCurrentBrand(brand)
      await dispatch(
        createReferralLink({
          userId,
          productUrl: brand.website,
        }),
      ).unwrap()
      setIsModalOpen(true)
    } catch (error) {
      toast.error("Failed to create link")
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.headingWrapper}>
        <h2 className={styles.heading}>Live Campaigns</h2>
        <Link href="/brandsdisplayCreator" className={styles.viewAllLink}>
          View All <span className={styles.arrow}>→</span>
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
                <button onClick={() => handleCreateLink(brand)} className={styles.createLinkButton}>
                  Create Link
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={currentBrand?.name || "Brand"}
        productLink={referralLink}
      />
    </div>
  )
}

export default TrendingBrands

