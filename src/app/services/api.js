const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/api"

const api = {
  fetch: async (url, options = {}) => {
    const token = localStorage.getItem("token")
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || "An error occurred")
    }
    return data
  },
}

export default api

