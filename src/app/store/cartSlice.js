import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const addToCart = createAsyncThunk("cart/addToCart", async (item, { getState }) => {
    const { cart } = getState();
    const updatedItems = [...cart.items];
    const existingItemIndex = updatedItems.findIndex((i) => i.id === item.id);
  
    if (existingItemIndex !== -1) {
      updatedItems[existingItemIndex].quantity += 1; 
    } else {
      updatedItems.push({ ...item, quantity: 1 }); 
    }
  
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    return updatedItems;
  });
  

export const loadCart = createAsyncThunk("cart/loadCart", async () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || []
  return cartItems
})

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
        state.error = null
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.items = action.payload
      })
  },
})

export default cartSlice.reducer

