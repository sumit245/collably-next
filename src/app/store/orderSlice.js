import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as orderService from "../services/orderService"

export const createOrder = createAsyncThunk("orders/createOrder", async (orderData, { rejectWithValue }) => {
  try {
    const response = await orderService.createOrder(orderData)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await orderService.getUserOrders()
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchOrderById = createAsyncThunk("orders/fetchOrderById", async (id, { rejectWithValue }) => {
  try {
    const response = await orderService.getOrderById(id)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    currentOrder: null,
    userOrders: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentOrder = action.payload
        state.error = null
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.userOrders = action.payload
        state.error = null
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentOrder = action.payload
        state.error = null
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export default ordersSlice.reducer

