import api from "./api"

export const createOrder = (orderData) =>
  api.fetch("/order", {
    method: "POST",
    body: JSON.stringify(orderData),
  })

export const getUserOrders = () => api.fetch("/orders")

export const getOrderById = (id) => api.fetch(`/order/${id}`)

export const updateOrderStatus = (id, status) =>
  api.fetch(`/order/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  })

export const cancelOrder = (id) =>
  api.fetch(`/order/${id}/cancel`, {
    method: "PATCH",
  })
