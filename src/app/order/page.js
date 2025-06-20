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
      const parsedOrderData = JSON.parse(storedOrderData)
      setOrderInfo(parsedOrderData)
      setIsLoading(false)

      // Clean up localStorage after displaying the order
      // You might want to keep this for order history, but for now we'll clean it
      // localStorage.removeItem("orderData")
    } else {
      // If no order data found, redirect to cart
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

  if (!orderInfo) {
    return (
      <LikeProvider>
        <div className={stylesShop.bodyShop}>
          <div className={stylesShop.smartphoneContainer}>
            <Header />
            <div className={styles.container}>
              <h2 className={styles.title}>Order Not Found</h2>
              <div className={styles.cartContainer}>
                <div className={styles.itemList}>
                  <p>No order information found. Please try placing your order again.</p>
                </div>
                <div className={styles.summary}>
                  <Link href="/cart" className={styles.continueShoppingLink}>
                    <button className={styles.placeOrderButton}>Go to Cart</button>
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
                  🎉 Thank you for your order! Your order has been placed successfully and is being processed.
                </div>

                <div className={styles.orderDetails}>
                  <div className={styles.orderDetailItem}>
                    <strong>Order ID:</strong>
                    <span className={styles.orderId}>{orderInfo.orderId}</span>
                  </div>

                  <div className={styles.orderDetailItem}>
                    <strong>Delivery to:</strong> {orderInfo.name}
                  </div>

                  <div className={styles.orderDetailItem}>
                    <strong>Address:</strong> {orderInfo.shippingAddress}
                  </div>

                  <div className={styles.orderDetailItem}>
                    <strong>Phone:</strong> {orderInfo.phone}
                  </div>

                  <div className={styles.orderDetailItem}>
                    <strong>Payment Method:</strong>
                    <span className={styles.paymentMethod}>
                      {orderInfo.paymentMethod === "cash"
                        ? "Cash on Delivery"
                        : orderInfo.paymentMethod === "upi"
                          ? "UPI"
                          : orderInfo.paymentMethod === "card"
                            ? "Credit/Debit Card"
                            : orderInfo.paymentMethod === "wallet"
                              ? "Wallet"
                              : orderInfo.paymentMethod === "netbanking"
                                ? "Net Banking"
                                : orderInfo.paymentMethod}
                    </span>
                  </div>

                  {orderInfo.paymentId && (
                    <div className={styles.orderDetailItem}>
                      <strong>Payment ID:</strong>
                      <span className={styles.paymentId}>{orderInfo.paymentId}</span>
                    </div>
                  )}

                  <div className={styles.orderDetailItem}>
                    <strong>Total Amount:</strong>
                    <span className={styles.totalAmount}>₹{orderInfo.totalAmount.toFixed(2)}</span>
                  </div>

                  <div className={styles.orderDetailItem}>
                    <strong>Order Status:</strong>
                    <span className={styles.orderStatus}>Confirmed</span>
                  </div>

                  <div className={styles.orderDetailItem}>
                    <strong>Estimated Delivery:</strong> 3-5 business days
                  </div>
                </div>

                <div className={styles.nextSteps}>
                  <h3>What's Next?</h3>
                  <ul>
                    <li>You will receive an order confirmation email shortly</li>
                    <li>We'll send you tracking information once your order ships</li>
                    <li>You can track your order status in your account</li>
                  </ul>
                </div>
              </div>

              <div className={styles.summary}>
                <Link href="/shop" className={styles.continueShoppingLink}>
                  <button className={styles.placeOrderButton}>Continue Shopping</button>
                </Link>

                <Link href="/orders" className={styles.viewOrdersLink}>
                  <button className={styles.viewOrdersButton}>View All Orders</button>
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
