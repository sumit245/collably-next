import api from "./api"

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

