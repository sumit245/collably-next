"use client"

import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { updateFormData } from "../store/mediaSlice"
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SelectAudience() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { audience, ageRestriction } = useSelector((state) => state.media.formData)

  const handleSelect = (newAudience) => {
    dispatch(updateFormData({ audience: newAudience }))
  }

  const handleAgeRestriction = (restriction) => {
    dispatch(updateFormData({ ageRestriction: restriction }))
  }

  const handleDone = () => {
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
          <h1 className={styles.title}>Select audience</h1> 
         </div>
          <div className={styles.question}>
            <h2>Is this video Made for Kids?</h2>
            <p>
              Regardless of your location, you're legally required to comply with the US Children's Online Privacy
              Protection Act (COPPA) and/or other laws. You're required to tell us whether your videos are Made for
              Kids.
            </p>
          </div>

          <div className={styles.options}>
            <button
              className={`${styles.option} ${audience === "For kids" ? styles.selected : ""}`}
              onClick={() => handleSelect("For kids")}
            >
              <div className={styles.radio} />
              <span>Yes, it's Made for Kids</span>
            </button>

            <button
              className={`${styles.option} ${audience === "Not for kids" ? styles.selected : ""}`}
              onClick={() => handleSelect("Not for kids")}
            >
              <div className={styles.radio} />
              <span>No, it's not Made for Kids</span>
            </button>
          </div>

          <div className={styles.ageRestriction}>
            <h3>Age restriction (advanced)</h3>
            <p>Do you want to restrict your video to an adult audience?</p>

            <div className={styles.options}>
              <button
                className={`${styles.option} ${ageRestriction === "18-plus" ? styles.selected : ""}`}
                onClick={() => handleAgeRestriction("18-plus")}
              >
                <div className={styles.radio} />
                <span>Yes, restrict my video to viewers over 18</span>
              </button>

              <button
                className={`${styles.option} ${ageRestriction === "no-restriction" ? styles.selected : ""}`}
                onClick={() => handleAgeRestriction("no-restriction")}
              >
                <div className={styles.radio} />
                <span>No, don't restrict my video to viewers over 18</span>
              </button>
            </div>
          </div>

          <button className={styles.doneButton} onClick={handleDone}>
            Done
          </button>
        </div>
        <FooterCreator />
      </div>
    </div>
  )
}