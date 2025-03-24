// Helper function to fetch metadata from a URL
export async function fetchProductMetadata(url) {
    try {
      // First, check if we're in a browser environment
      if (typeof window === "undefined") {
        return null
      }
  
      const response = await fetch("/api/fetch-metadata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })
  
      if (!response.ok) {
        throw new Error("Failed to fetch metadata")
      }
  
      return await response.json()
     
    } catch (error) {
      console.error("Error fetching product metadata:", error)
      return null
    }
  }
  
  