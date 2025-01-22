import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item._id === action.payload._id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      localStorage.setItem("cart", JSON.stringify(state.items))
      localStorage.setItem("cartTotal", state.total.toFixed(2))
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload)
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      localStorage.setItem("cart", JSON.stringify(state.items))
      localStorage.setItem("cartTotal", state.total.toFixed(2))
    },
    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload
      const item = state.items.find((item) => item._id === _id)
      if (item) {
        item.quantity = Math.max(1, quantity)
        state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        localStorage.setItem("cart", JSON.stringify(state.items))
        localStorage.setItem("cartTotal", state.total.toFixed(2))
      }
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      localStorage.removeItem("cart")
      localStorage.removeItem("cartTotal")
    },
    loadCart: (state) => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || []
      state.items = savedCart
      state.total = savedCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, loadCart } = cartSlice.actions

export default cartSlice.reducer

