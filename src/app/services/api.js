const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/api"

const api = {
  fetch: async (url, options = {}) => {
    const accessToken = localStorage.getItem("accessToken")
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (accessToken) {
      headers["Authorization"] = accessToken
    }

    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API Error:", error.message)
      throw error
    }
  },

  getPosts: async () => {
    return api.fetch("/posts")
  },

  getPostById: async (postId) => {
    return api.fetch(`/post/${postId}`)
  },

  likePost: async (postId) => {
    return api.fetch(`/post/${postId}/like`, { method: "PATCH" })
  },

  unlikePost: async (postId) => {
    return api.fetch(`/post/${postId}/unlike`, { method: "PATCH" })
  },

  commentOnPost: async (postId, comment) => {
    return api.fetch(`/post/${postId}/comment`, {
      method: "POST",
      body: JSON.stringify({ comment }),
    })
  },

  savePost: async (postId) => {
    return api.fetch(`/savePost/${postId}`, { method: "PATCH" })
  },

  unsavePost: async (postId) => {
    return api.fetch(`/unSavePost/${postId}`, { method: "PATCH" })
  },

  getUserPosts: async (userId) => {
    return api.fetch(`/user_posts/${userId}`)
  },

  getPostDiscover: async () => {
    return api.fetch("/post_discover")
  },

  getSavedPosts: async () => {
    return api.fetch("/getSavePosts")
  },
}

export default api
