import { createSlice } from "@reduxjs/toolkit"

const likedProductsSlice = createSlice({
  name: "likedProducts",
  initialState: {
    items: [],
    count: 0,
  },
  reducers: {
    toggleLikeProduct: (state, action) => {
      const existingIndex = state.items.findIndex((item) => item._id === action.payload._id)
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1)
        state.count -= 1
      } else {
        state.items.push(action.payload)
        state.count += 1
      }
      localStorage.setItem("likedProducts", JSON.stringify(state.items))
      localStorage.setItem("likedProductsCount", state.count.toString())
    },
    loadLikedProducts: (state) => {
      const savedLikedProducts = JSON.parse(localStorage.getItem("likedProducts")) || []
      const savedCount = Number.parseInt(localStorage.getItem("likedProductsCount") || "0", 10)
      state.items = savedLikedProducts
      state.count = savedCount
    },
    removeLikedProduct: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload)
      state.count -= 1
      localStorage.setItem("likedProducts", JSON.stringify(state.items))
      localStorage.setItem("likedProductsCount", state.count.toString())
    },
  },
})

export const { toggleLikeProduct, loadLikedProducts, removeLikedProduct } = likedProductsSlice.actions

export default likedProductsSlice.reducer

