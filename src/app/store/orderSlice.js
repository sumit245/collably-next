import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as orderService from "../services/orderService";

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await orderService.createOrder(orderData);
      return response;
    } catch (error) {
      console.error("Error creating order:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching all orders of a user
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderService.getUserOrders();
      return response;
    } catch (error) {
      console.error("Error fetching user orders:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching a specific order by ID
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await orderService.getOrderById(id);
      return response;
    } catch (error) {
      console.error("Error fetching order by ID:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Order slice with initial state and reducers
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    currentOrder: null,
    userOrders: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearOrderError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createOrder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle fetchUserOrders
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle fetchOrderById
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        state.error = null;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderError } = ordersSlice.actions;
export default ordersSlice.reducer;
