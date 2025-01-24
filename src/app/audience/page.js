"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Info } from "lucide-react"

export default function Audience() {
  const router = useRouter()
  const [audience, setAudience] = useState("not-for-kids")

  const handleSave = () => {
    // Save audience setting
    router.back()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex items-center p-4 border-b border-gray-800">
        <button onClick={() => router.back()} className="mr-4">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold">Select audience</h1>
        <button onClick={handleSave} className="ml-auto px-6 py-2 bg-white text-black rounded-full">
          Done
        </button>
      </header>

      <main className="max-w-3xl mx-auto p-4 space-y-6">
        <div>
          <h2 className="text-2xl mb-2">Is this video Made for Kids?</h2>
          <p className="text-gray-400 text-sm">
            Regardless of your location, you're legally required to comply with the US Children's Online Privacy
            Protection Act (COPPA) and/or other laws. You're required to tell us whether your videos are Made for Kids.
          </p>
        </div>

        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="audience"
              value="for-kids"
              checked={audience === "for-kids"}
              onChange={(e) => setAudience(e.target.value)}
              className="h-5 w-5"
            />
            <span className="font-medium">Yes, it's Made for Kids</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="audience"
              value="not-for-kids"
              checked={audience === "not-for-kids"}
              onChange={(e) => setAudience(e.target.value)}
              className="h-5 w-5"
            />
            <span className="font-medium">No, it's not Made for Kids</span>
          </label>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Age restriction (advanced)</h3>
          <p className="text-gray-400 text-sm mb-4">Do you want to restrict your video to an adult audience?</p>
          <p className="text-gray-400 text-sm">
            Age-restricted videos are not shown in certain areas of YouTube. These videos may have limited or no ads
            monetisation.
          </p>
        </div>
      </main>
    </div>
  )
}

