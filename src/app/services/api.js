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

    console.log("Request URL:", `${BASE_URL}${url}`);
    console.log("Request Options:", options);
    console.log("Request Headers:", headers);
    console.log("Access Token:", accessToken); 
    console.log("Authorization Header:", headers["Authorization"]);


    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers,
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Error Response:", errorData);  // Log detailed error from the server
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const responseData = await response.json();
      console.log("Response Data:", responseData);  // Log the response data for debugging
      return responseData;
    } catch (error) {
      console.error("API Error:", error.message);
      throw error;  // Propagate error
    }
  },
}
