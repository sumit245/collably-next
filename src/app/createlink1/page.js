"use client"; // Ensures this runs only on the client side

import { useState } from "react";

export default function BrandViewer() {
  const [currentTab, setCurrentTab] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");

  // Open a brand's website in a new popup window
  const openBrandSite = (brandUrl) => {
    if (currentTab) {
      currentTab.close(); // Close previous tab if it exists
    }

    const newTab = window.open(brandUrl, "_blank", "width=800,height=600");
    setCurrentTab(newTab);

    // Track the tab's URL every second
    const interval = setInterval(() => {
      try {
        if (newTab.location.href) {
          setCurrentUrl(newTab.location.href);
        }
      } catch (error) {
        console.warn("Can't access the URL due to security restrictions.");
      }

      if (newTab.closed) {
        clearInterval(interval);
        setCurrentTab(null);
      }
    }, 1000);
  };

  // Copy the URL from the opened tab
  const copyUrl = () => {
    if (currentUrl) {
      navigator.clipboard.writeText(currentUrl);
      alert("Copied URL: " + currentUrl);
    } else {
      alert("No active website to copy URL from.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen p-4">
      <h1 className="text-2xl font-bold mt-4">Explore Top Brands</h1>

      {/* Buttons to Select Brand */}
      <div className="flex space-x-4 mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => openBrandSite("https://www.nykaa.com")}
        >
          Nykaa
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => openBrandSite("https://www.levis.com")}
        >
          Levi's
        </button>
      </div>

      {/* Copy URL Button */}
      <button
        onClick={copyUrl}
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded"
      >
        Create Link
      </button>

      {/* Display Copied URL */}
      {currentUrl && (
        <p className="mt-2 text-gray-600">
          Current URL: <span className="font-bold">{currentUrl}</span>
        </p>
      )}
    </div>
  );
}
