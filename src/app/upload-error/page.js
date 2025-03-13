"use client"

import { useRouter } from "next/navigation"
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"
import { AlertCircle } from "lucide-react"

export default function UploadError() {
  const router = useRouter()

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <div className={styles.container}>
          <div className={styles.errorContainer}>
            <AlertCircle size={64} color="red" />
            <h2 className={styles.errorTitle}>Something went wrong</h2>
            <p className={styles.errorMessage}>Please try again later</p>

            <button className={styles.homeButton} onClick={() => router.push("/CreatorShop")}>
              Go back home
            </button>
          </div>
        </div>
        <FooterCreator />
      </div>
    </div>
  )
}

