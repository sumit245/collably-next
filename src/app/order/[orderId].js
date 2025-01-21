"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import Link from "next/link"
import { fetchOrderById } from "../../redux/orderSlice"
import styles from "./stylesOrder.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import Header from "../components/HeaderShop"
import Footer from "../components/FooterShop"
import { LikeProvider } from "../actions/LikeContext"

export default function OrderConfirmation() {
  const router = useRouter()
  const { orderId } = router.query
  const dispatch = useDispatch()
  const order = useSelector((state) => state.order.currentOrder)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId))
        .unwrap()
        .then(() => setIsLoading(false))
        .catch((error) => {
          console.error("Failed to fetch order:", error)
          setIsLoading(false)
        })
    }
  }, [orderId, dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!order) {
    return <div>Order not found</div>
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
              <p>Order Number: {order.id}</p>
              <p>Delivery to: {order.shippingAddress}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Total: ₹{order.totalAmount.toFixed(2)}</p>
              <p>Order Status: {order.orderStatus}</p>
              <p>Estimated delivery: 3-5 business days</p>
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

