"use client"

import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authslice"
import productsReducer from "./productSlice"
import ordersReducer from "./orderSlice"
import cartReducer from "./cartSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    orders: ordersReducer,
    cart: cartReducer,
  },
})

