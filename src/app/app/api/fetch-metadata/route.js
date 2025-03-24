// API route to fetch metadata from a URL
import { JSDOM } from "jsdom"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { url } = req.body

    if (!url) {
      return res.status(400).json({ error: "URL is required" })
    }

    // Fetch the HTML content of the URL
    const response = await fetch(url)
    const html = await response.text()

    // Create a DOM parser
    const dom = new JSDOM(html)
    const document = dom.window.document

    // Extract metadata
    const metadata = {
      title:
        document.querySelector('meta[property="og:title"]')?.content ||
        document.querySelector("title")?.textContent ||
        "",
      image:
        document.querySelector('meta[property="og:image"]')?.content ||
        document.querySelector('meta[name="twitter:image"]')?.content ||
        "",
      price: extractPrice(html),
      description:
        document.querySelector('meta[property="og:description"]')?.content ||
        document.querySelector('meta[name="description"]')?.content ||
        "",
      url: url,
    }

    return res.status(200).json(metadata)
  } catch (error) {
    console.error("Error fetching metadata:", error)
    return res.status(500).json({ error: "Failed to fetch metadata" })
  }
}

// Helper function to extract price from HTML
function extractPrice(html) {
  // This is a simple implementation - you might need to adjust based on the e-commerce sites you're targeting
  const priceRegex = /[$£€](\d+(?:\.\d{1,2})?)/
  const match = html.match(priceRegex)
  return match ? match[0] : ""
}

