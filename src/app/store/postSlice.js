import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

const fetchWithToken = async (url, options = {}) => {
  const accessToken = localStorage.getItem("accessToken")
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (accessToken) {
    headers["Authorization"] = accessToken
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return fetchWithToken("/posts")
})

export const fetchPostById = createAsyncThunk("posts/fetchPostById", async (postId) => {
  return fetchWithToken(`/post/${postId}`)
})

export const likePost = createAsyncThunk("posts/likePost", async (postId) => {
  return fetchWithToken(`/post/${postId}/like`, { method: 'PATCH' })
})

export const unlikePost = createAsyncThunk("posts/unlikePost", async (postId) => {
  return fetchWithToken(`/post/${postId}/unlike`, { method: 'PATCH' })
})

export const savePost = createAsyncThunk("posts/savePost", async (postId) => {
  return fetchWithToken(`/savePost/${postId}`, { method: 'PATCH' })
})

export const unsavePost = createAsyncThunk("posts/unsavePost", async (postId) => {
  return fetchWithToken(`/unSavePost/${postId}`, { method: 'PATCH' })
})

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    currentPost: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.posts = action.payload.posts
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.currentPost = action.payload.post
      })
      .addCase(likePost.fulfilled, (state, action) => {
        if (state.currentPost && state.currentPost._id === action.payload.post._id) {
          state.currentPost = action.payload.post
        }
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        if (state.currentPost && state.currentPost._id === action.payload.post._id) {
          state.currentPost = action.payload.post
        }
      })
      .addCase(savePost.fulfilled, (state, action) => {
        if (state.currentPost && state.currentPost._id === action.payload.post._id) {
          state.currentPost = action.payload.post
        }
      })
      .addCase(unsavePost.fulfilled, (state, action) => {
        if (state.currentPost && state.currentPost._id === action.payload.post._id) {
          state.currentPost = action.payload.post
        }
      })
  },
})

export default postSlice.reducer