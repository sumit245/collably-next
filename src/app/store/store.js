"use client"

import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authslice"
import productsReducer from "./productSlice"
import ordersReducer from "./orderSlice"
import cartReducer from "./cartSlice"
import brandsReducer from "./brandSlice"
import likedProductsReducer from "./likedproductSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    orders: ordersReducer,
    cart: cartReducer,
    brands: brandsReducer,
    likedProducts: likedProductsReducer,
  },
})

