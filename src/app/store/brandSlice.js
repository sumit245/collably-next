import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as brandService from "../services/brandService"

export const fetchBrands = createAsyncThunk("brands/fetchBrands", async (_, { rejectWithValue }) => {
  try {
    const response = await brandService.getAllBrands()
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchProductsByBrand = createAsyncThunk(
  "brands/fetchProductsByBrand",
  async (brandId, { rejectWithValue }) => {
    try {
      const response = await brandService.getProductsByBrand(brandId)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const createReferralLink = createAsyncThunk(
  "brands/createReferralLink",
  async ({ userId, productId, brandId }, { rejectWithValue }) => {
    try {
      const response = await brandService.createReferralLink(userId, productId, brandId)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const brandsSlice = createSlice({
  name: "brands",
  initialState: {
    items: [],
    products: [],
    referralLink: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
        state.error = null
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchProductsByBrand.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProductsByBrand.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload
        state.error = null
      })
      .addCase(fetchProductsByBrand.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(createReferralLink.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createReferralLink.fulfilled, (state, action) => {
        state.isLoading = false
        state.referralLink = action.payload
        state.error = null
      })
      .addCase(createReferralLink.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export default brandsSlice.reducer
