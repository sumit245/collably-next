import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as creatorService from "../services/creatorService"

export const fetchCreators = createAsyncThunk(
    "creators/fetchCreators",
    async (_, { rejectWithValue }) => {
      try {
        console.log("🔵 FetchCreators Dispatched"); // ✅ Log before calling API
        const response = await creatorService.getAllCreators();
        console.log("🟢 API Response:", response);
        
        if (!response.user) {
          console.error("🔴 No 'user' field in API response");
          return rejectWithValue("Invalid response format");
        }
        
        console.log("🟢 Extracted User Data:", response.user);
        return response.user;
      } catch (error) {
        console.error("🔴 Error Fetching Creators:", error.message);
        return rejectWithValue(error.message);
      }
    }
  );
  
  
const creatorSlice = createSlice({
  name: "creators",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreators.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCreators.fulfilled, (state, action) => {
        console.log("🟢 Redux Store Updated with Creators:", action.payload);
        console.log("🟢 Previous State:", state);
        state.isLoading = false;
        state.items = action.payload || [];
        state.error = null;
        console.log("🟢 New State:", state);
      })
      
      .addCase(fetchCreators.rejected, (state, action) => {
        console.error("🔴 Redux Fetch Rejected:", action.payload);
        state.isLoading = false;
        state.error = action.payload;
      });
      
  },
})

export default creatorSlice.reducer