"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSelector } from "react-redux"
import styles from "./stylesOrder.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import Header from "../components/HeaderShop"
import Footer from "../components/FooterShop"
import { LikeProvider } from "../actions/LikeContext"

export default function OrderConfirmation() {
  const [orderInfo, setOrderInfo] = useState(null)
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    const storedOrderInfo = JSON.parse(localStorage.getItem("orderData"))
    setOrderInfo(storedOrderInfo)
  }, [])

  if (!user) {
    return <div>Please log in to view your order.</div>
  }

  return (
    <LikeProvider>
      <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
          <Header />
          <h2 className={styles.title}>Order Confirmation</h2>
          <div className={styles.cartContainer}>
            <div className={styles.itemList}>
              <p>Thank you for your order! Your order has been placed and is being processed.</p>
              {orderInfo && (
                <>
                  <p>Delivery to: {orderInfo.name}</p>
                  <p>{orderInfo.shippingAddress}</p>
                  <p>Phone: {orderInfo.phone}</p>
                  <p>Payment Method: {orderInfo.paymentMethod}</p>
                  <p>Total: ₹{orderInfo.total}</p>
                  <p>Order Number: {Math.floor(Math.random() * 1000000)}</p>
                  <p>Estimated delivery: 3-5 business days</p>
                </>
              )}
            </div>
            <div className={styles.summary}>
              <Link href="/shop">
                <button className={styles.placeOrderButton}>Continue Shopping</button>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </LikeProvider>
  )
}

