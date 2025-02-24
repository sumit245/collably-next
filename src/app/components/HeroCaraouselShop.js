"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "../store/postSlice"
import VideoCarouselCard from "./Cards/VideoCard"

export default function HeroCarousel() {
  const dispatch = useDispatch()
  const { posts, status, error } = useSelector((state) => state.posts)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts())
    }
  }, [status, dispatch])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "failed") {
    return <div>Error: {error}</div>
  }

  const videos = posts
    .filter((post) => post.video)
    .map((post) => ({
      src: `http://localhost:5000/${post.video.replace(/\\/g, "/")}`,
      id: post._id,
    }))

  if (videos.length === 0) {
    return <div>No videos available</div>
  }

  return (
    <main>
      <VideoCarouselCard videos={videos} title="Trending Today" subtitle="Discover the hottest reels" />
    </main>
  )
}

