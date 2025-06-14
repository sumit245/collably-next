"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { ArrowLeft } from "lucide-react"
import styles from "./stylesform.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import { LikeProvider } from "../actions/LikeContext"
import Header from "../components/HeaderShop"
import Footer from "../components/FooterShop"
import PincodeLookup from "india-pincode-lookup"
import { processRazorpayPayment } from "../store/orderSlice"
import { clearCart } from "../store/cartSlice"

export default function AddressForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    addressType: "home",
    isDefault: false,
  })

  const [cityStateReadOnly, setCityStateReadOnly] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()
  const { items, total } = useSelector((state) => state.cart)
  const user = useSelector((state) => state.auth.user)
  const { isLoading, error } = useSelector((state) => state.orders)

  useEffect(() => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent("/CreatorHome")}`)
    }

    if (!items || items.length === 0) {
      router.push("/cart")
    }
  }, [user, items, router])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === "pincode" && value.length === 6) {
      fetchCityAndState(value)
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const fetchCityAndState = (pincode) => {
    const locations = PincodeLookup.lookup(pincode)

    if (locations && locations.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        city: locations[0].districtName || "",
        state: locations[0].stateName || "",
      }))
      setCityStateReadOnly(true)
    } else {
      alert("No information available for this pincode.")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.pincode ||
      !formData.city ||
      !formData.state
    ) {
      alert("Please fill in all required fields")
      return
    }

    const orderItems = items.map((item) => ({
      product: item._id,
      quantity: item.quantity,
      price: item.price,
    }))

    const shippingAddress = `${formData.name}, ${formData.address}, ${formData.locality}, ${formData.city}, ${formData.state}, ${formData.pincode}`

    const paymentData = {
      orderItems,
      shippingAddress,
      totalAmount: total,
      name: formData.name,
      phone: formData.phone,
      userEmail: user?.email || "",
      userInfo: formData,
    }

    try {
      const result = await dispatch(processRazorpayPayment(paymentData)).unwrap()

      if (result.success) {
        // Clear cart and navigate to confirmation
        dispatch(clearCart())
        router.push("/order")
      }
    } catch (error) {
      console.error("Payment processing failed:", error)
    }
  }

  if (!user || !items || items.length === 0) {
    return null
  }

  return (
    <LikeProvider>
      <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
          <Header />

          <header className={styles.header}>
            <button onClick={() => router.back()} className={styles.backButton}>
              <ArrowLeft className={styles.backIcon} />
            </button>
            <h1 className={styles.title}>ADD NEW ADDRESS</h1>
          </header>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <form className={styles.form} onSubmit={handleSubmit}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>CONTACT DETAILS</h2>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name*"
                  className={styles.input}
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone.startsWith("+91") ? formData.phone : "+91" + formData.phone}
                  onChange={(e) => {
                    let value = e.target.value
                    if (value.startsWith("+91")) {
                      value = value.slice(3)
                    }

                    value = value.replace(/[^0-9]/g, "")
                    if (value.length > 10) {
                      value = value.slice(0, 10)
                    }
                    handleChange({
                      target: { name: "phone", value: "+91" + value },
                    })
                  }}
                  placeholder="Mobile No*"
                  className={styles.input}
                  required
                />
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>ADDRESS</h2>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "")
                    if (value.length <= 6) {
                      handleChange({
                        target: { name: "pincode", value: value },
                      })
                    }
                  }}
                  placeholder="Pin Code*"
                  className={styles.input}
                  required
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address (House No, Building, Street, Area)*"
                  className={styles.input}
                  required
                />
                <input
                  type="text"
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                  placeholder="Locality / Town*"
                  className={styles.input}
                  required
                />
                <div className={styles.cityStateGroup}>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City / District*"
                    className={styles.inputCity}
                    required
                    readOnly={cityStateReadOnly}
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State*"
                    className={styles.inputCity}
                    required
                    readOnly={cityStateReadOnly}
                  />
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>SAVE ADDRESS AS</h2>
              <div className={styles.addressTypeGroup}>
                <button
                  type="button"
                  className={`${styles.addressTypeButton} ${formData.addressType === "home" ? styles.active : ""}`}
                  onClick={() => setFormData((prev) => ({ ...prev, addressType: "home" }))}
                >
                  Home
                </button>
                <button
                  type="button"
                  className={`${styles.addressTypeButton} ${formData.addressType === "work" ? styles.active : ""}`}
                  onClick={() => setFormData((prev) => ({ ...prev, addressType: "work" }))}
                >
                  Work
                </button>
              </div>
            </section>

            <label className={styles.defaultCheckbox}>
              <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} />
              Make this my default address
            </label>

            {/* Order Summary */}
            <div className={styles.orderSummary}>
              <h3 className={styles.summaryTitle}>Order Summary</h3>
              <div className={styles.summaryContent}>
                <div className={styles.summaryRow}>
                  <span>Items ({items.length})</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <div className={styles.summaryRow + " " + styles.totalRow}>
                  <span>
                    <strong>Total Amount</strong>
                  </span>
                  <span>
                    <strong>₹{total.toFixed(2)}</strong>
                  </span>
                </div>
              </div>
            </div>

            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? "Processing Payment..." : "PROCEED TO PAY"}
            </button>
          </form>

          <Footer />
        </div>
      </div>
    </LikeProvider>
  )
}
