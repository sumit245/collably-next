export async function fetchProductMetadata(url) {
    try {
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
  
  