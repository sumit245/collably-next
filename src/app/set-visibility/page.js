"use client"

import { useRouter } from "next/navigation"
import styles from "./page.module.css"
import stylesShop from '../shop/StyleShop.module.css'
import FooterCreator from '../components/FooterCreator'

export default function SetVisibility() {
  const router = useRouter()

  const handleSelect = (visibility) => {
    // Handle visibility selection
    router.back()
  }

  return (
    <div className={stylesShop.bodyShop}>
    <div className={stylesShop.smartphoneContainer}>
    <div className={styles.container}>
      <h1 className={styles.title}>Set visibility</h1>

      <div className={styles.options}>
        <button className={styles.option} onClick={() => handleSelect("public")}>
          <div className={styles.radio} />
          <div className={styles.optionContent}>
            <h3>Public</h3>
            <p>Anyone can search for and view</p>
          </div>
        </button>

        <button className={styles.option} onClick={() => handleSelect("unlisted")}>
          <div className={styles.radio} />
          <div className={styles.optionContent}>
            <h3>Unlisted</h3>
            <p>Anyone with the link can view</p>
          </div>
        </button>

        <button className={styles.option} onClick={() => handleSelect("private")}>
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

