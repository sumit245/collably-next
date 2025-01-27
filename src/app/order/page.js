"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LikeProvider } from "../actions/LikeContext"
import Header from "../components/HeaderShop"
import Footer from "../components/FooterShop"
import styles from "./stylesOrder.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import Link from "next/link"

export default function OrderConfirmation() {
  const [orderInfo, setOrderInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedOrderData = localStorage.getItem("orderData")
    if (storedOrderData) {
      setOrderInfo(JSON.parse(storedOrderData))
      setIsLoading(false)
    } else {
      router.push("/cart")
    }
  }, [router])

  if (isLoading) {
    return (
      <LikeProvider>
        <div className={stylesShop.bodyShop}>
          <div className={stylesShop.smartphoneContainer}>
            <Header />
            <div className={styles.loading}>Loading order information...</div>
            <Footer />
          </div>
        </div>
      </LikeProvider>
    )
  }

  return (
    <LikeProvider>
      <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
          <Header />
          <div className={styles.container}>
            <h2 className={styles.title}>Order Confirmation</h2>
            <div className={styles.cartContainer}>
              <div className={styles.itemList}>
                <div className={styles.successMessage}>
                  Thank you for your order! Your order has been placed and is being processed.
                </div>
                {orderInfo && (
                  <div className={styles.orderDetails}>
                    <p>
                      <strong>Delivery to:</strong> {orderInfo.name}
                    </p>
                    <p>
                      <strong>Address:</strong> {orderInfo.shippingAddress}
                    </p>
                    <p>
                      <strong>Phone:</strong> {orderInfo.phone}
                    </p>
                    <p>
                      <strong>Payment Method:</strong> {orderInfo.paymentMethod}
                    </p>
                    <p>
                      <strong>Total Amount:</strong> ₹{orderInfo.totalAmount.toFixed(2)}
                    </p>
                    <p>
                      <strong>Order ID:</strong> {orderInfo.orderId}
                    </p>
                    <p>
                      <strong>Estimated Delivery:</strong> 3-5 business days
                    </p>
                  </div>
                )}
              </div>
              <div className={styles.summary}>
                <Link href="/shop" className={styles.continueShoppingLink}>
                  <button className={styles.placeOrderButton}>Continue Shopping</button>
                </Link>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </LikeProvider>
  )
}

