"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { fetchBrands, createReferralLink } from "../store/brandSlice"
import styles from "../CreatorHome/hero.module.css"
import { toast } from "react-hot-toast"

export default function TrendingBrands({ heading = "Trending Brands" }) {
  const [notification, setNotification] = useState({ show: false, message: "" })
  const [processingBrandId, setProcessingBrandId] = useState(null)

  const dispatch = useDispatch()
  const brands = useSelector((state) => state.brands.items)
  const userId = useSelector((state) => state.auth.user?._id)
  const { referralLink } = useSelector((state) => state.brands)

  useEffect(() => {
    dispatch(fetchBrands())
  }, [dispatch])

  const createLink = async (brand) => {
    if (!userId) {
      toast.error("Please login to create a link")
      return null
    }

    setProcessingBrandId(brand._id)
    try {
      await dispatch(
        createReferralLink({
          userId,
          productUrl: brand.brandWebsite,
        }),
      ).unwrap()
      return true
    } catch (error) {
      toast.error("Failed to create link")
      return null
    } finally {
      setProcessingBrandId(null)
    }
  }

  const handleShare = async (brand) => {
    const success = await createLink(brand)
    if (!success) return

    const shareData = {
      title: brand.brandName,
      text: `Check out ${brand.brandName} with profit up to ${brand.profit || "10"}%!`,
      url: referralLink || brand.brandWebsite || window.location.origin,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback for browsers that don't support Web Share API
        toast.error("Sharing not supported on this browser. Link copied to clipboard instead.")
        await navigator.clipboard.writeText(shareData.url)
        setNotification({ show: true, message: "Link copied!" })
        setTimeout(() => {
          setNotification({ show: false, message: "" })
        }, 3000)
      }
    } catch (err) {
      console.error("Error sharing:", err)
    }
  }

  const handleShareNow = async (brand) => {
    const success = await createLink(brand)
    if (!success) return

    const text = `Check out ${brand.brandName} with profit up to ${brand.profit || "10"}%!`
    const url = referralLink || brand.brandWebsite || window.location.origin
   const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleCopyLink = async (brand) => {
    const success = await createLink(brand)
    if (!success) return

    const linkToCopy = referralLink || brand.brandWebsite || window.location.origin

    try {
      await navigator.clipboard.writeText(linkToCopy)
      setNotification({ show: true, message: "Link copied!" })
      setTimeout(() => {
        setNotification({ show: false, message: "" })
      }, 3000)
    } catch (err) {
      console.error("Failed to copy: ", err)
      toast.error("Failed to copy link")
    }
  }

  if (!brands.length) {
    return <div className={styles.trendbrandWrapper}>Loading brands...</div>
  }

  // Only show first 5 brands
  const displayBrands = brands.slice(0, 5)

  return (
    <div className={styles.trendbrandWrapper}>
      <div className={styles.trendbrandHeader}>
        <h2 className={styles.trendbrandTitle}>{heading}</h2>
        <Link href="/brandsdisplay" className={styles.trendbrandViewAll}>
          View All<span>→</span>
        </Link>
      </div>

      <div className={styles.trendbrandCardsContainer}>
        {displayBrands.map((brand, index) => (
          <div key={`${brand._id}-${index}`} className={styles.trendbrandCard}>
            <div className={styles.trendbrandBanner}>{brand.promotion || "UPTO 85% OFF"}</div>

            <button
              className={styles.trendbrandShareTop}
              onClick={() => handleShare(brand)}
              disabled={processingBrandId === brand._id}
            >
              <span className={styles.trendbrandShareIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
                    stroke="#4A90E2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
                    stroke="#4A90E2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
                    stroke="#4A90E2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.59 13.51L15.42 17.49"
                    stroke="#4A90E2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.41 6.51L8.59 10.49"
                    stroke="#4A90E2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className={styles.trendbrandShareText}>
                {processingBrandId === brand._id ? "CREATING..." : "SHARE"}
              </span>
            </button>

            <Link href={brand.brandWebsite || "#"} className={styles.trendbrandLogoContainer}>
              <Image
                src={brand.brandLogo || "/placeholder.svg"}
                alt={brand.brandName}
                width={120}
                height={60}
                className={styles.trendbrandLogo}
              />
            </Link>

            <div className={styles.trendbrandEarnContainer}>
              <span className={styles.trendbrandYouEarn}>YOU EARN</span>
            </div>

            <div className={styles.trendbrandProfitContainer}>
              <h3 className={styles.trendbrandProfit}>Upto {brand.profit || 17}% Profit</h3>
            </div>

            <button
              className={styles.trendbrandShareNowBtn}
              onClick={() => handleShareNow(brand)}
              disabled={processingBrandId === brand._id}
            >
              <span className={styles.trendbrandWhatsappIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9 16.124 19.0521 17.6242 17.5518C19.1245 16.0516 19.9724 14.0273 19.9724 11.9176C19.9724 9.80781 19.1245 7.78361 17.6242 6.28333L17.6 6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.512 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.65 11.92C18.6518 13.1263 18.3347 14.3066 17.7378 15.3328C17.141 16.359 16.2899 17.1952 15.2752 17.7508C14.2605 18.3064 13.1209 18.5635 11.97 18.49L12 18.53ZM15.29 13.3C15.11 13.21 14.25 12.79 14.09 12.73C13.93 12.67 13.81 12.64 13.69 12.82C13.57 13 13.23 13.38 13.13 13.5C13.0223 13.6045 12.8892 13.6839 12.74 13.73C12.5654 13.7749 12.3879 13.8062 12.21 13.83C11.8169 13.7499 11.442 13.607 11.1 13.41C10.6168 13.1306 10.1845 12.7716 9.82 12.35C9.77 12.28 9.82 12.22 9.86 12.17C9.9 12.12 9.95 12.06 10 12C10.05 11.94 10.07 11.9 10.11 11.84C10.15 11.78 10.14 11.73 10.12 11.68C10.1 11.63 9.82 11.04 9.68 10.77C9.54 10.5 9.39 10.56 9.29 10.55H9.05C8.95216 10.5584 8.85783 10.5851 8.77 10.63C8.67572 10.6767 8.58517 10.7344 8.5 10.8C8.33 10.96 7.87 11.38 7.87 12.06C7.87 12.74 8.38 13.4 8.45 13.5C8.52 13.6 9.81 15.61 11.81 16.48C12.63 16.83 13.2 16.96 13.64 17.06C14.31 17.21 14.93 17.19 15.42 17.14C15.9723 17.0797 16.5133 16.9287 17.02 16.69C17.3 16.54 17.64 16.21 17.75 15.81C17.86 15.41 17.86 15.06 17.83 15C17.8 14.94 17.68 14.91 17.5 14.86L15.29 13.3Z"
                    fill="white"
                  />
                </svg>
              </span>
              {processingBrandId === brand._id ? "CREATING..." : "SHARE NOW"}
            </button>

            <button
              className={styles.trendbrandCopyLink}
              onClick={() => handleCopyLink(brand)}
              disabled={processingBrandId === brand._id}
            >
              {processingBrandId === brand._id ? "CREATING..." : "COPY LINK"}
            </button>
          </div>
        ))}
      </div>

      {notification.show && <div className={styles.trendbrandNotification}>{notification.message}</div>}
    </div>
  )
}