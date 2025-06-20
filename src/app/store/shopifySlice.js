import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as shopifyProductService from "../services/shopifyService"

export const fetchShopifyProducts = createAsyncThunk(
  "shopifyProducts/fetchShopifyProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await shopifyProductService.getShopifyProducts()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchShopifyProductById = createAsyncThunk(
  "shopifyProducts/fetchShopifyProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await shopifyProductService.getShopifyProductById(id)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const shopifyProductsSlice = createSlice({
  name: "shopifyProducts",
  initialState: {
    items: [],
    currentProduct: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopifyProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchShopifyProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.products || action.payload
        state.error = null
      })
      .addCase(fetchShopifyProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchShopifyProductById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchShopifyProductById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentProduct = action.payload
        state.error = null
      })
      .addCase(fetchShopifyProductById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export default shopifyProductsSlice.reducer
