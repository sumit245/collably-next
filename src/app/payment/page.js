"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { ArrowLeft, CreditCard, Wallet, Building2, Smartphone } from "lucide-react"
import styles from "./stylespayment.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import { LikeProvider } from "../actions/LikeContext"
import Header from "../components/HeaderShop"
import Footer from "../components/FooterShop"
import { createOrder } from "../store/orderSlice"
import { clearCart } from "../store/cartSlice"

export default function Payment() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [selectedPayment, setSelectedPayment] = useState("cash")
  const { items, total } = useSelector((state) => state.cart)
  const user = useSelector((state) => state.auth.user)

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    const orderData = JSON.parse(localStorage.getItem("orderData") || "{}")

    if (!user) {
      router.push("/login")
      return
    }

    const order = {
      ...orderData,
      paymentMethod: selectedPayment,
      items: items,
      total: total,
      userId: user.id,
    }

    try {
      await dispatch(createOrder(order)).unwrap()
      dispatch(clearCart())
      localStorage.removeItem("orderData")
      router.push("/order")
    } catch (error) {
      console.error("Failed to create order:", error)
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <LikeProvider>
      <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
          <Header />
          
          <header className={styles.header}>
            
            <div className={styles.headerContent}>
              <h3 className={styles.title}>PAYMENT</h3>
              
            </div>
          </header>

          <div className={styles.paymentBanner}>
            <div>Secure Payments</div>
            <div>Easy Returns</div>
            <div>Fast Refunds</div>
          </div>

          <div className={styles.bankOffer}>
            <h3 className={styles.offerTitle}>Bank Offer</h3>
            <p className={styles.offerText}>
              10% Instant Discount on HDFC Bank Credit Card EMI on a min spend of ₹3,500. TCA
            </p>
            <button className={styles.showMoreButton}>Show More</button>
          </div>

          <form onSubmit={handlePaymentSubmit} className={styles.paymentForm}>
            <div className={styles.paymentOptions}>
              <h2 className={styles.sectionTitle}>ONLINE PAYMENT OPTIONS</h2>
              
              <div className={styles.paymentMethod}>
                <label className={styles.paymentLabel}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={selectedPayment === 'upi'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  />
                  <Smartphone className={styles.paymentIcon} />
                  <span className={styles.paymentText}>UPI (Pay via any App)</span>
                </label>
              </div>

              <div className={styles.paymentMethod}>
                <label className={styles.paymentLabel}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={selectedPayment === 'card'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  />
                  <CreditCard className={styles.paymentIcon} />
                  <span className={styles.paymentText}>Credit/Debit Card</span>
                  <span className={styles.offers}>2 Offers</span>
                </label>
              </div>

              <div className={styles.paymentMethod}>
                <label className={styles.paymentLabel}>
                  <input
                    type="radio"
                    name="payment"
                    value="wallet"
                    checked={selectedPayment === 'wallet'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  />
                  <Wallet className={styles.paymentIcon} />
                  <span className={styles.paymentText}>Wallets</span>
                  <span className={styles.offers}>4 Offers</span>
                </label>
              </div>

              <div className={styles.paymentMethod}>
                <label className={styles.paymentLabel}>
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={selectedPayment === 'netbanking'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  />
                  <Building2 className={styles.paymentIcon} />
                  <span className={styles.paymentText}>Net Banking</span>
                </label>
              </div>
            </div>

            <div className={styles.paymentSection}>
              <h2 className={styles.sectionTitle}>PAY ON DELIVERY OPTION</h2>
              <div className={styles.paymentMethod}>
                <label className={styles.paymentLabel}>
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={selectedPayment === 'cash'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  />
                  <span className={styles.paymentText}>Cash on Delivery</span>
                </label>
              </div>
            </div>

            <div className={styles.paymentFooter}>
              <div className={styles.priceDetails}>
                <span>₹{total.toFixed(2)}</span>
                <button type="button" className={styles.viewDetails}>VIEW DETAILS</button>
              </div>
              <button type="submit" className={styles.payNowButton}>
                PAY NOW
              </button>
            </div>
          </form>

          <Footer />
        </div>
      </div>
    </LikeProvider>
  );
}

