"use client"

import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { updateFormData } from "../store/mediaSlice"
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SetCategory() {
  const router = useRouter()
  const dispatch = useDispatch()
  const selectedCategory = useSelector((state) => state.media.formData.category)

  const handleSelect = (category) => {
    dispatch(updateFormData({ category }))
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
            <h1 className={styles.title}>Select Category</h1>
          </div>
          <div className={styles.options}>
            <button
              className={`${styles.option} ${selectedCategory === "Fashion" ? styles.selected : ""}`}
              onClick={() => handleSelect("Fashion")}
            >
              <div className={styles.radio} />
              <div className={styles.optionContent}>
                <h3>Fashion</h3>
                <p>Clothing, accessories, and style items</p>
              </div>
            </button>

            <button
              className={`${styles.option} ${selectedCategory === "Electronics" ? styles.selected : ""}`}
              onClick={() => handleSelect("Electronics")}
            >
              <div className={styles.radio} />
              <div className={styles.optionContent}>
                <h3>Electronics</h3>
                <p>Gadgets, devices, and tech products</p>
              </div>
            </button>

            <button
              className={`${styles.option} ${selectedCategory === "Home" ? styles.selected : ""}`}
              onClick={() => handleSelect("Home")}
            >
              <div className={styles.radio} />
              <div className={styles.optionContent}>
                <h3>Home</h3>
                <p>Furniture, decor, and household items</p>
              </div>
            </button>
            
            <button
              className={`${styles.option} ${selectedCategory === "Beauty" ? styles.selected : ""}`}
              onClick={() => handleSelect("Beauty")}
            >
              <div className={styles.radio} />
              <div className={styles.optionContent}>
                <h3>Beauty</h3>
                <p>Cosmetics, skincare, and personal care</p>
              </div>
            </button>
          </div>
        </div>
        <FooterCreator />
      </div>
    </div>
  )
}