import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as orderService from "../services/orderService"

// Load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')

    if (existingScript) {
      resolve(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export const processRazorpayPayment = createAsyncThunk(
  "orders/processRazorpayPayment",
  async (paymentData, { rejectWithValue, dispatch }) => {
    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        throw new Error("Razorpay SDK failed to load")
      }

      // Get Razorpay configuration from orderService
      const razorpayConfig = await orderService.getRazorpayConfig()

      return new Promise((resolve, reject) => {
        const options = {
          key: razorpayConfig.key_id,
          amount: Math.round(paymentData.totalAmount * 100), // Amount in paise
          currency: "INR",
          name: "Your Store Name",
          description: "Purchase from Your Store",
          image: "/logo.png", // Your logo URL (optional)
          handler: async (response) => {
            try {
              // Payment successful, create order
              const orderData = {
                items: paymentData.orderItems,
                shippingAddress: paymentData.shippingAddress,
                totalAmount: paymentData.totalAmount,
                paymentStatus: "completed",
                paymentMethod: "online",
                name: paymentData.name,
                phone: paymentData.phone,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }

              const orderResult = await dispatch(createOrder(orderData)).unwrap()

              // Store order data with actual order ID
              localStorage.setItem(
                "orderData",
                JSON.stringify({
                  name: paymentData.name,
                  shippingAddress: paymentData.shippingAddress,
                  phone: paymentData.phone,
                  paymentMethod: "online",
                  totalAmount: paymentData.totalAmount,
                  orderId: orderResult.order.orderId, // Use actual order ID from API
                  _id: orderResult.order._id,
                  paymentId: response.razorpay_payment_id,
                  paymentStatus: "completed",
                }),
              )

              resolve({ success: true, orderResult })
            } catch (error) {
              console.error("Failed to create order after payment:", error)
              reject(new Error("Payment successful but order creation failed. Please contact support."))
            }
          },
          prefill: {
            name: paymentData.name,
            email: paymentData.userEmail,
            contact: paymentData.phone?.replace("+91", "") || "",
          },
          notes: {
            address: paymentData.shippingAddress,
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: () => {
              reject(new Error("Payment cancelled by user"))
            },
          },
        }

        if (window.Razorpay) {
          const rzp = new window.Razorpay(options)
          rzp.on("payment.failed", (response) => {
            reject(new Error(`Payment failed: ${response.error.description}`))
          })
          rzp.open()
        } else {
          reject(new Error("Razorpay SDK not available"))
        }
      })
    } catch (error) {
      console.error("Error in processRazorpayPayment:", error)
      return rejectWithValue(error.message || "Failed to process payment")
    }
  },
)

export const createOrder = createAsyncThunk("orders/createOrder", async (orderData, { rejectWithValue }) => {
  try {
    const response = await orderService.createOrder(orderData)
    return response
  } catch (error) {
    console.error("Error in createOrder thunk:", error)
    return rejectWithValue(error.message || "Failed to create order")
  }
})

export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await orderService.getUserOrders()
    return response
  } catch (error) {
    console.error("Error in fetchUserOrders thunk:", error)
    return rejectWithValue(error.message || "Failed to fetch user orders")
  }
})

export const fetchOrderById = createAsyncThunk("orders/fetchOrderById", async (id, { rejectWithValue }) => {
  try {
    const response = await orderService.getOrderById(id)
    return response
  } catch (error) {
    console.error("Error in fetchOrderById thunk:", error)
    return rejectWithValue(error.message || "Failed to fetch order")
  }
})

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    currentOrder: null,
    userOrders: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearOrderError: (state) => {
      state.error = null
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processRazorpayPayment.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(processRazorpayPayment.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentOrder = action.payload.orderResult
        state.error = null
      })
      .addCase(processRazorpayPayment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentOrder = action.payload
        state.error = null
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.userOrders = action.payload
        state.error = null
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentOrder = action.payload
        state.error = null
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearOrderError, clearCurrentOrder, setCurrentOrder } = ordersSlice.actions
export default ordersSlice.reducer
