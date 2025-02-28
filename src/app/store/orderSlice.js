import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as orderService from "../services/orderService"

export const createOrder = createAsyncThunk("orders/createOrder", async (orderData, { rejectWithValue }) => {
  try {
   
    const response = await orderService.createOrder(orderData)
  
    return response
  } catch (error) {
    console.error("Error in createOrder thunk:", error)
    return rejectWithValue(error.message || "Failed to create order")
  }
})

export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await orderService.getUserOrders()
    return response
  } catch (error) {
    console.error("Error in fetchUserOrders thunk:", error)
    return rejectWithValue(error.message || "Failed to fetch user orders")
  }
})

export const fetchOrderById = createAsyncThunk("orders/fetchOrderById", async (id, { rejectWithValue }) => {
  try {
    const response = await orderService.getOrderById(id)
    return response
  } catch (error) {
    console.error("Error in fetchOrderById thunk:", error)
    return rejectWithValue(error.message || "Failed to fetch order")
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
  reducers: {
    clearOrderError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
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
        state.error = null
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
        state.error = null
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

export const { clearOrderError } = ordersSlice.actions
export default ordersSlice.reducer

