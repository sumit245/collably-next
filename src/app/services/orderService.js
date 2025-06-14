import api from "./api"

export const getRazorpayConfig = async () => {
  try {
    // This will get the Razorpay configuration from your api.js
    // You can add the key_id and key_secret there
    return await api.getRazorpayConfig()
  } catch (error) {
    console.error("Error in orderService.getRazorpayConfig:", error)
    throw error
  }
}

export const createOrder = async (orderData) => {
  try {
    const data = await api.fetch("/order", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
    return data
  } catch (error) {
    console.error("Error in orderService.createOrder:", error)
    throw error
  }
}

export const getUserOrders = async () => {
  try {
    return await api.fetch("/orders")
  } catch (error) {
    console.error("Error in orderService.getUserOrders:", error)
    throw error
  }
}

export const getOrderById = async (id) => {
  try {
    return await api.fetch(`/order/${id}`)
  } catch (error) {
    console.error("Error in orderService.getOrderById:", error)
    throw error
  }
}

export const updateOrderStatus = async (id, status) => {
  try {
    return await api.fetch(`/order/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })
  } catch (error) {
    console.error("Error in orderService.updateOrderStatus:", error)
    throw error
  }
}

export const cancelOrder = async (id) => {
  try {
    return await api.fetch(`/order/${id}/cancel`, {
      method: "PATCH",
    })
  } catch (error) {
    console.error("Error in orderService.cancelOrder:", error)
    throw error
  }
}

export const verifyPayment = async (paymentData) => {
  try {
    return await api.fetch("/payment/verify", {
      method: "POST",
      body: JSON.stringify(paymentData),
    })
  } catch (error) {
    console.error("Error in orderService.verifyPayment:", error)
    throw error
  }
}
