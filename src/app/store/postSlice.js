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
     
  },
})



export default postSlice.reducer