
export const BASE_URL = "http://127.0.0.1:5000/api"

const api = {
  fetch: async (endpoint, options = {}) => {
    try {
      const url = `${BASE_URL}${endpoint}`

      // Don't set Content-Type for FormData
      if (options.body instanceof FormData) {
        // Remove Content-Type to let browser set it with proper boundary
        if (options.headers) {
          delete options.headers["Content-Type"]
        }
      } else if (typeof options.body === "object" && !(options.body instanceof FormData)) {
        // For JSON data, set the Content-Type header
        options.headers = {
          ...options.headers,
          "Content-Type": "application/json",
        }
      }

      console.log("Request URL:", url)
      console.log("Request Method:", options.method)
      console.log("Request is FormData:", options.body instanceof FormData)

      const response = await fetch(url, options)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API Error Response:", errorText)
        try {
          // Try to parse as JSON
          const errorJson = JSON.parse(errorText)
          throw new Error(errorJson.msg || "API Error")
        } catch (e) {
          // If not JSON, throw the text
          throw new Error(`API Error: ${errorText}`)
        }
      }

      // Check if response is empty
      const text = await response.text()
      return text ? JSON.parse(text) : {}
    } catch (error) {
      console.error("API Error:", error.message)
      throw error
    }
  },
}

export default api
