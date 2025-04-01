import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as blogService from "../services/blogService"
import { FaLessThanEqual } from "react-icons/fa6"

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async (_, { rejectWithValue }) => {
  try {
    const response = await blogService.getBlogs()
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchBlogById = createAsyncThunk("blogs/fetchBlogById", async (id, { rejectWithValue }) => {
  try {
    const response = await blogService.getBlogById(id)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const createNewBlog = createAsyncThunk("blogs/createBlog", async (blogData, { rejectWithValue }) => {
  try {
    const response = await blogService.createBlog(blogData)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const removeBlog = createAsyncThunk("blogs/deleteBlog", async (id, { rejectWithValue }) => {
  try {
    await blogService.deleteBlog(id)
    return id
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const initialState = {
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,
}

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    clearCurrentBlog: (state) => {
      state.currentBlog = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = FaLessThanEqual
        state.blogs = action.payload.blogs || []
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false
        state.currentBlog = action.payload.blog || action.payload
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(createNewBlog.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createNewBlog.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload.blog) {
          state.blogs.unshift(action.payload.blog)
        } else if (action.payload) {
          state.blogs.unshift(action.payload)
        }
      })
      .addCase(createNewBlog.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(removeBlog.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeBlog.fulfilled, (state, action) => {
        state.loading = false
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload)
      })
      .addCase(removeBlog.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearCurrentBlog } = blogSlice.actions
export default blogSlice.reducer

