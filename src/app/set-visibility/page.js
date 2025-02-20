"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateFormData } from "../store/mediaSlice"
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SetVisibility() {
  const router = useRouter()
  const dispatch = useDispatch()
  const selectedVisibility = useSelector((state) => state.media.formData.visibility)

  const handleSelect = (visibility) => {
    dispatch(updateFormData({ visibility }))
    router.back()
  }

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Link href="/video-details">
              <button className={styles.backButton}>
                <ArrowLeft size={24} color="white" />
              </button>
            </Link>
            <h1 className={styles.title}>Set visibility</h1>
          </div>
          <div className={styles.options}>
            <button
              className={`${styles.option} ${selectedVisibility === "Public" ? styles.selected : ""}`}
              onClick={() => handleSelect("Public")}
            >
              <div className={styles.radio} />
              <div className={styles.optionContent}>
                <h3>Public</h3>
                <p>Anyone can search for and view</p>
              </div>
            </button>

            <button
              className={`${styles.option} ${selectedVisibility === "Unlisted" ? styles.selected : ""}`}
              onClick={() => handleSelect("Unlisted")}
            >
              <div className={styles.radio} />
              <div className={styles.optionContent}>
                <h3>Unlisted</h3>
                <p>Anyone with the link can view</p>
              </div>
            </button>

            <button
              className={`${styles.option} ${selectedVisibility === "Private" ? styles.selected : ""}`}
              onClick={() => handleSelect("Private")}
            >
              <div className={styles.radio} />
              <div className={styles.optionContent}>
                <h3>Private</h3>
                <p>Only people you choose can view</p>
              </div>
            </button>
          </div>
        </div>
        <FooterCreator />
      </div>
    </div>
  )
}