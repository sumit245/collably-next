"use client"

import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authslice"
import productsReducer from "./productSlice"
import ordersReducer from "./orderSlice"
import cartReducer from "./cartSlice"
import brandsReducer from "./brandSlice"
import likedProductsReducer from "./likedproductSlice"
import searchReducer from "./searchSlice"
import postReducer from "./postSlice"
import mediaReducer from './mediaSlice'
import creatorReducer from "./creatorSlice"; 
import blogReducer from "./blogSlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    orders: ordersReducer,
    cart: cartReducer,
    brands: brandsReducer,
    likedProducts: likedProductsReducer,
    search: searchReducer,
    posts: postReducer,
    media: mediaReducer,
    creators: creatorReducer,
    blogs: blogReducer,
  },
})

