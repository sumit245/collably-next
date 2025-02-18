import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../services/api"

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await api.getPosts()
  return response.posts
})

export const fetchPostById = createAsyncThunk("posts/fetchPostById", async (postId) => {
  const response = await api.getPostById(postId)
  return response.post
})

export const likePost = createAsyncThunk("posts/likePost", async (postId) => {
  const response = await api.likePost(postId)
  return response.post
})

export const unlikePost = createAsyncThunk("posts/unlikePost", async (postId) => {
  const response = await api.unlikePost(postId)
  return response.post
})

export const commentOnPost = createAsyncThunk("posts/commentOnPost", async ({ postId, comment }) => {
  const response = await api.commentOnPost(postId, comment)
  return response.post
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
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.currentPost = action.payload
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const updatedPost = action.payload
        const index = state.posts.findIndex((post) => post._id === updatedPost._id)
        if (index !== -1) {
          state.posts[index] = updatedPost
        }
        if (state.currentPost && state.currentPost._id === updatedPost._id) {
          state.currentPost = updatedPost
        }
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        const updatedPost = action.payload
        const index = state.posts.findIndex((post) => post._id === updatedPost._id)
        if (index !== -1) {
          state.posts[index] = updatedPost
        }
        if (state.currentPost && state.currentPost._id === updatedPost._id) {
          state.currentPost = updatedPost
        }
      })
      .addCase(commentOnPost.fulfilled, (state, action) => {
        const updatedPost = action.payload
        const index = state.posts.findIndex((post) => post._id === updatedPost._id)
        if (index !== -1) {
          state.posts[index] = updatedPost
        }
        if (state.currentPost && state.currentPost._id === updatedPost._id) {
          state.currentPost = updatedPost
        }
      })
  },
})

export default postSlice.reducer

