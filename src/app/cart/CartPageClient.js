"use client"

import { useSelector } from "react-redux"
import Header from "../components/HeaderShop"
import Footer from "../components/FooterShop"
import styles from "../shop/StyleShop.module.css"
import { ViewCart } from "../components/ViewCart"
import { LikeProvider } from "../actions/LikeContext"

export default function CartPageClient() {
  const user = useSelector((state) => state.auth.user)

  return (
    <LikeProvider>
      <div className={styles.bodyShop}>
        <div className={styles.smartphoneContainer}>
          <Header />
          <main>
            <ViewCart user={user} />
          </main>
          <Footer />
        </div>
      </div>
    </LikeProvider>
  )
}

