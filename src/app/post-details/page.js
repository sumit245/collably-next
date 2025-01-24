"use client"

import { ArrowLeft, PenLine, Globe2, MapPin, ListPlus, Users, Share2, Instagram, Youtube } from "lucide-react"
import { useRouter } from "next/navigation"
// import styles from "./styles.vid.module.css"

export default function PostDetails({ videoUrl }) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-white">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl">Add details</h1>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-full">Next</button>
      </div>

      {/* Video Preview */}
      <div className="aspect-[9/16] w-full bg-gray-900">
        <video src={videoUrl} className="w-full h-full object-contain" autoPlay />
      </div>

      {/* Details Form */}
      <div className="p-4 space-y-6">
        <input
          type="text"
          placeholder="Create a title (type @ to mention a channel)"
          className="w-full bg-transparent border-b border-gray-800 py-2 focus:outline-none"
        />

        <button className="flex items-center justify-between w-full py-4">
          <div className="flex items-center gap-4">
            <PenLine className="h-6 w-6" />
            <span>Add product</span>
          </div>
          <ArrowLeft className="h-6 w-6 rotate-180" />
        </button>

        <button className="flex items-center justify-between w-full py-4">
          <div className="flex items-center gap-4">
            <Globe2 className="h-6 w-6" />
            <div>
              <div>Visibility</div>
              <div className="text-sm text-gray-400">Public</div>
            </div>
          </div>
          <ArrowLeft className="h-6 w-6 rotate-180" />
        </button>

        <button className="flex items-center justify-between w-full py-4">
          <div className="flex items-center gap-4">
            <Users className="h-6 w-6" />
            <div>
              <div>Set audience</div>
              <div className="text-sm text-gray-400">Everyone</div>
            </div>
          </div>
          <ArrowLeft className="h-6 w-6 rotate-180" />
        </button>

        <button className="flex items-center justify-between w-full py-4">
          <div className="flex items-center gap-4">
            <MapPin className="h-6 w-6" />
            <span>Location</span>
          </div>
          <ArrowLeft className="h-6 w-6 rotate-180" />
        </button>

        <button className="flex items-center justify-between w-full py-4">
          <div className="flex items-center gap-4">
            <ListPlus className="h-6 w-6" />
            <span>Add to playlists</span>
          </div>
          <ArrowLeft className="h-6 w-6 rotate-180" />
        </button>

        {/* Social Media Sync */}
        <div className="flex justify-end gap-4 pt-4">
          <button className="p-2 rounded-full bg-gray-800">
            <Instagram className="h-6 w-6" />
          </button>
          <button className="p-2 rounded-full bg-gray-800">
            <Youtube className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  )
}