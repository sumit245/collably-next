"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"

export default function SetVisibility() {
  const router = useRouter()
  const [selectedVisibility, setSelectedVisibility] = useState("")

  useEffect(() => {
    const storedData = localStorage.getItem("videoDetailsData")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setSelectedVisibility(parsedData.visibility || "")
    }
  }, [])

  const handleSelect = (visibility) => {
    setSelectedVisibility(visibility)
    const storedData = localStorage.getItem("videoDetailsData")
    const updatedData = storedData ? JSON.parse(storedData) : {}
    updatedData.visibility = visibility
    localStorage.setItem("videoDetailsData", JSON.stringify(updatedData))
    router.back()
  }

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>Set visibility</h1>

          <div className={styles.options}>
            <button
              className={`${styles.option} ${selectedVisibility === "public" ? styles.selected : ""}`}
              onClick={() => handleSelect("Public")}
            >
              <div className={styles.radio} />
              <div className={styles.optionContent}>
                <h3>Public</h3>
                <p>Anyone can search for and view</p>
              </div>
            </button>

            <button
              className={`${styles.option} ${selectedVisibility === "unlisted" ? styles.selected : ""}`}
              onClick={() => handleSelect("Unlisted")}
            >
              <div className={styles.radio} />
              <div className={styles.optionContent}>
                <h3>Unlisted</h3>
                <p>Anyone with the link can view</p>
              </div>
            </button>

            <button
              className={`${styles.option} ${selectedVisibility === "private" ? styles.selected : ""}`}
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

