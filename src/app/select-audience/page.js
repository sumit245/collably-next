"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"

export default function SelectAudience() {
  const router = useRouter()
  const [selectedAudience, setSelectedAudience] = useState("")
  const [selectedAgeRestriction, setSelectedAgeRestriction] = useState("")

  useEffect(() => {
    const storedData = localStorage.getItem("videoDetailsData")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setSelectedAudience(parsedData.audience || "")
      setSelectedAgeRestriction(parsedData.ageRestriction || "")
    }
  }, [])

  const handleSelect = (audience) => {
    setSelectedAudience(audience)
    const storedData = localStorage.getItem("videoDetailsData")
    const updatedData = storedData ? JSON.parse(storedData) : {}
    updatedData.audience = audience
    localStorage.setItem("videoDetailsData", JSON.stringify(updatedData))
  }

  const handleAgeRestriction = (restriction) => {
    setSelectedAgeRestriction(restriction)
    const storedData = localStorage.getItem("videoDetailsData")
    const updatedData = storedData ? JSON.parse(storedData) : {}
    updatedData.ageRestriction = restriction
    localStorage.setItem("videoDetailsData", JSON.stringify(updatedData))
  }

  const handleDone = () => {
    router.back()
  }

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>Select audience</h1>

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
              className={`${styles.option} ${selectedAudience === "For kids" ? styles.selected : ""}`}
              onClick={() => handleSelect("For kids")}
            >
              <div className={styles.radio} />
              <span>Yes, it's Made for Kids</span>
            </button>

            <button
              className={`${styles.option} ${selectedAudience === "Not for kids" ? styles.selected : ""}`}
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
                className={`${styles.option} ${selectedAgeRestriction === "18-plus" ? styles.selected : ""}`}
                onClick={() => handleAgeRestriction("18-plus")}
              >
                <div className={styles.radio} />
                <span>Yes, restrict my video to viewers over 18</span>
              </button>

              <button
                className={`${styles.option} ${selectedAgeRestriction === "no-restriction" ? styles.selected : ""}`}
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

