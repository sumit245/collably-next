"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { CreditCard, Wallet, Building2, Smartphone } from "lucide-react"
import styles from "./stylespayment.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import { LikeProvider } from "../actions/LikeContext"
import Header from "../components/HeaderShop"
import Footer from "../components/FooterShop"
import { createOrder, clearOrderError } from "../store/orderSlice"
import { clearCart } from "../store/cartSlice"

export default function Payment() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [selectedPayment, setSelectedPayment] = useState("cash")
  const { items, total } = useSelector((state) => state.cart)
  const user = useSelector((state) => state.auth.user)
  const { error, isLoading } = useSelector((state) => state.orders)
  const [localError, setLocalError] = useState(null)
  const [formData, setFormData] = useState({})
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent("/CreatorHome")}`)
    }

    const data = localStorage.getItem("userInfo")
    if (data) {
      setFormData(JSON.parse(data))
    }

    // Load Razorpay script
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      dispatch(clearOrderError())
      // Clean up script
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [dispatch, user, router])

  const createOrderInBackend = async (paymentData = null) => {
    const orderItems = items.map((item) => ({
      product: item._id,
      quantity: item.quantity,
      price: item.price,
    }))

    const shippingAddress = `${formData.name}, ${formData.address}, ${formData.locality}, ${formData.city}, ${formData.state}, ${formData.pincode}`

    const order = {
      items: orderItems,
      shippingAddress: shippingAddress,
      totalAmount: total,
      paymentStatus: paymentData ? "completed" : "pending",
      paymentMethod: selectedPayment,
      name: formData.name,
      phone: formData.phone,
      ...(paymentData && {
        razorpayPaymentId: paymentData.razorpay_payment_id,
        razorpayOrderId: paymentData.razorpay_order_id,
        razorpaySignature: paymentData.razorpay_signature,
      }),
    }

    const result = await dispatch(createOrder(order)).unwrap()
    return result
  }

  const handleRazorpayPayment = () => {
    setIsProcessingPayment(true)
    setLocalError(null)

    const options = {
      key: "rzp_test_Zs6ix1Ja70U0kB", // Your Razorpay key ID
      amount: Math.round(total * 100), // Amount in paise
      currency: "INR",
      name: "Your Store Name",
      description: "Purchase from Your Store",
      image: "/logo.png", // Your logo URL
      handler: async (response) => {
        try {
          // Payment successful, create order
          const orderResult = await createOrderInBackend(response)

          // Store order data with actual order ID
          localStorage.setItem(
            "orderData",
            JSON.stringify({
              name: formData.name,
              shippingAddress: `${formData.name}, ${formData.address}, ${formData.locality}, ${formData.city}, ${formData.state}, ${formData.pincode}`,
              phone: formData.phone,
              paymentMethod: selectedPayment,
              totalAmount: total,
              orderId: orderResult.order.orderId, // Use actual order ID from API
              _id: orderResult.order._id,
              paymentId: response.razorpay_payment_id,
            }),
          )

          dispatch(clearCart())
          localStorage.removeItem("userInfo")
          setIsProcessingPayment(false)
          router.push("/order")
        } catch (error) {
          console.error("Failed to create order after payment:", error)
          setLocalError("Payment successful but order creation failed. Please contact support.")
          setIsProcessingPayment(false)
        }
      },
      prefill: {
        name: formData.name,
        email: user?.email || "",
        contact: formData.phone?.replace("+91", "") || "",
      },
      notes: {
        address: `${formData.address}, ${formData.locality}, ${formData.city}, ${formData.state}, ${formData.pincode}`,
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: () => {
          setIsProcessingPayment(false)
          setLocalError("Payment cancelled by user")
        },
      },
    }

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options)
      rzp.on("payment.failed", (response) => {
        setIsProcessingPayment(false)
        setLocalError(`Payment failed: ${response.error.description}`)
      })
      rzp.open()
    } else {
      setIsProcessingPayment(false)
      setLocalError("Razorpay SDK not loaded. Please refresh and try again.")
    }
  }

  const handleCashOnDelivery = async () => {
    setLocalError(null)

    try {
      const orderResult = await createOrderInBackend()

      // Store order data with actual order ID
      localStorage.setItem(
        "orderData",
        JSON.stringify({
          name: formData.name,
          shippingAddress: `${formData.name}, ${formData.address}, ${formData.locality}, ${formData.city}, ${formData.state}, ${formData.pincode}`,
          phone: formData.phone,
          paymentMethod: selectedPayment,
          totalAmount: total,
          orderId: orderResult.order.orderId, // Use actual order ID from API
          _id: orderResult.order._id,
        }),
      )

      dispatch(clearCart())
      localStorage.removeItem("userInfo")
      router.push("/order")
    } catch (error) {
      console.error("Failed to create order:", error)
      setLocalError(error.message || "An unexpected error occurred")
    }
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent("/CreatorHome")}`)
      return
    }

    if (items.length === 0) {
      setLocalError("Your cart is empty")
      return
    }

    if (selectedPayment === "cash") {
      await handleCashOnDelivery()
    } else {
      // Handle online payments via Razorpay
      handleRazorpayPayment()
    }
  }

  if (!user) {
    return null
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

          {(error || localError) && <div className={styles.errorMessage}>{error || localError}</div>}

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
                    checked={selectedPayment === "upi"}
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
                    checked={selectedPayment === "card"}
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
                    checked={selectedPayment === "wallet"}
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
                    checked={selectedPayment === "netbanking"}
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
                    checked={selectedPayment === "cash"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  />
                  <span className={styles.paymentText}>Cash on Delivery</span>
                </label>
              </div>
            </div>

            <div className={styles.paymentFooter}>
              <div className={styles.priceDetails}>
                <span>₹{total.toFixed(2)}</span>
                <button type="button" className={styles.viewDetails}>
                  VIEW DETAILS
                </button>
              </div>
              <button type="submit" className={styles.payNowButton} disabled={isLoading || isProcessingPayment}>
                {isLoading || isProcessingPayment ? "Processing..." : "PAY NOW"}
              </button>
            </div>
          </form>

          <Footer />
        </div>
      </div>
    </LikeProvider>
  )
}
