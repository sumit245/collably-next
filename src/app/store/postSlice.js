import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { BASE_URL } from "../services/api";

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

export const fetchSavedPosts = createAsyncThunk("posts/fetchSavedPosts", async () => {
  return fetchWithToken("/getSavePosts")
})

// New search posts thunk
// Update the searchPosts thunk in your postSlice.js file


export const searchPosts = createAsyncThunk(
  "posts/searchPosts",
  async ({ q = '', category = '', sort = 'newest' }) => {
    const queryParams = new URLSearchParams();

    if (q.trim()) queryParams.append('q', q.trim());
    if (category && category !== 'All Categories') queryParams.append('category', category);
    queryParams.append('sort', sort); // Always include sort parameter

    const queryString = queryParams.toString();
    return fetchWithToken(`/searchPosts${queryString ? `?${queryString}` : ''}`);
  }
);


export const likePost = createAsyncThunk("posts/likePost", async (postId) => {
  return fetchWithToken(`/post/${postId}/like`, { method: "PATCH" })
})

export const unlikePost = createAsyncThunk("posts/unlikePost", async (postId) => {
  return fetchWithToken(`/post/${postId}/unlike`, { method: "PATCH" })
})

export const commentOnPost = createAsyncThunk("posts/commentOnPost", async ({ postId, comment }) => {
  return fetchWithToken(`/post/${postId}/comment`, {
    method: "POST",
    body: JSON.stringify({ comment }),
  })
})

export const savePost = createAsyncThunk("posts/savePost", async (postId) => {
  return fetchWithToken(`/savePost/${postId}`, { method: "PATCH" })
})

export const unsavePost = createAsyncThunk("posts/unsavePost", async (postId) => {
  return fetchWithToken(`/unSavePost/${postId}`, { method: "PATCH" })
})

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    savedPosts: [],
    searchResults: [],
    currentPost: null,
    status: "idle",
    savedPostsStatus: "idle",
    searchStatus: "idle",
    error: null,
  },
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchStatus = "idle";
    }
  },
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
      .addCase(fetchSavedPosts.pending, (state) => {
        state.savedPostsStatus = "loading"
      })
      .addCase(fetchSavedPosts.fulfilled, (state, action) => {
        state.savedPostsStatus = "succeeded"; 
        state.savedPosts = action.payload.savedPosts || []; 
      })
      .addCase(fetchSavedPosts.rejected, (state, action) => {
        state.savedPostsStatus = "failed"
        state.error = action.error.message
      })
      // Add search posts cases
      .addCase(searchPosts.pending, (state) => {
        state.searchStatus = "loading"
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.searchStatus = "succeeded"
        state.searchResults = action.payload.posts || []
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.searchStatus = "failed"
        state.error = action.error.message
        state.searchResults = []
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.currentPost = action.payload.post
      })
      .addCase(likePost.fulfilled, (state, action) => {
        updatePost(state, action.payload.post)
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        updatePost(state, action.payload.post)
      })
      .addCase(commentOnPost.fulfilled, (state, action) => {
        updatePost(state, action.payload.post)
      })
      .addCase(savePost.fulfilled, (state, action) => {
        updatePost(state, action.payload.post)
      })
      .addCase(unsavePost.fulfilled, (state, action) => {
        updatePost(state, action.payload.post)
      })
  },
})

const updatePost = (state, updatedPost) => {
  if (state.currentPost && state.currentPost._id === updatedPost._id) {
    state.currentPost = updatedPost
  }
  state.posts = state.posts.map(post => 
    post._id === updatedPost._id ? updatedPost : post
  )
  if (state.savedPosts.length > 0) {
    state.savedPosts = state.savedPosts.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    )
  }
  if (state.searchResults.length > 0) {
    state.searchResults = state.searchResults.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    )
  }
}

export const { clearSearchResults } = postSlice.actions
export default postSlice.reducer