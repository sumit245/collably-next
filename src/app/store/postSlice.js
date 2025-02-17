import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createPost } from "../services/postService";

export const createPostAsync = createAsyncThunk("posts/createPost", async (formData, { rejectWithValue }) => {
  try {
    const response = await createPost(formData);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
    currentPost: null,
  },
  reducers: {
    clearPostError: (state) => {
      state.error = null;
    },
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPostAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPostAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.unshift(action.payload);
        state.currentPost = action.payload;
        state.error = null;
      })
      .addCase(createPostAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPostError, setCurrentPost } = postSlice.actions;
export default postSlice.reducer;
