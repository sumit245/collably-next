"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"

export default function Visibility() {
  const router = useRouter()
  const [visibility, setVisibility] = useState("public")

  const handleSave = () => {
    // Save visibility setting
    router.back()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex items-center p-4 border-b border-gray-800">
        <button onClick={() => router.back()} className="mr-4">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold">Set visibility</h1>
        <button onClick={handleSave} className="ml-auto px-6 py-2 bg-white text-black rounded-full">
          Done
        </button>
      </header>

      <main className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl mb-6">Publish now</h2>

        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="visibility"
              value="public"
              checked={visibility === "public"}
              onChange={(e) => setVisibility(e.target.value)}
              className="h-5 w-5"
            />
            <div>
              <p className="font-medium">Public</p>
              <p className="text-sm text-gray-400">Anyone can search for and view</p>
            </div>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="visibility"
              value="unlisted"
              checked={visibility === "unlisted"}
              onChange={(e) => setVisibility(e.target.value)}
              className="h-5 w-5"
            />
            <div>
              <p className="font-medium">Unlisted</p>
              <p className="text-sm text-gray-400">Anyone with the link can view</p>
            </div>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="visibility"
              value="private"
              checked={visibility === "private"}
              onChange={(e) => setVisibility(e.target.value)}
              className="h-5 w-5"
            />
            <div>
              <p className="font-medium">Private</p>
              <p className="text-sm text-gray-400">Only people you choose can view</p>
            </div>
          </label>
        </div>
      </main>
    </div>
  )
}

