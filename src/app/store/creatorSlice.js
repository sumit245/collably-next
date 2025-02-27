import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as creatorService from "../services/creatorService"

export const fetchCreators = createAsyncThunk(
    "creators/fetchCreators",
    async (_, { rejectWithValue }) => {
      try {
       
        const response = await creatorService.getAllCreators();
      
        
        if (!response.user) {
        
          return rejectWithValue("Invalid response format");
        }
        
      
        return response.user;
      } catch (error) {
      
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
       
      
        state.isLoading = false;
        state.items = action.payload || [];
        state.error = null;
      
      })
      
      .addCase(fetchCreators.rejected, (state, action) => {
       
        state.isLoading = false;
        state.error = action.payload;
      });
      
  },
})

export default creatorSlice.reducer