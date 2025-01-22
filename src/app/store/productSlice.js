import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as productService from "../services/productService"

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await productService.getProducts()
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchProductById = createAsyncThunk("products/fetchProductById", async (_id, { rejectWithValue }) => {
  try {
    const response = await productService.getProductById(_id)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    currentProduct: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.map((product) => ({
          ...product,
          brandId: product.brandid,
          category: product.category,
        }))
        state.error = null
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentProduct = {
          ...action.payload,
          brandId: action.payload.brandid,
          category: action.payload.category,
        }
        state.error = null
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export default productsSlice.reducer

