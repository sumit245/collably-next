"use client";

import { useState } from "react";
import PostDetail from "../components/PostDetailComponent"; 

export default function PostDetailsPage() {
  const [posts] = useState([
    {
      id: 1,
      user: { username: "john_doe", avatar: "/user1.jpg" },
      image: "/post1.jpg",
      likes: 120,
      caption: "Beautiful sunset!",
      comments: 10,
    },
    {
      id: 2,
      user: { username: "jane_smith", avatar: "/user2.jpg" },
      image: "/post2.jpg",
      likes: 200,
      caption: "Enjoying my vacation!",
      comments: 30,
    },
  ]);

  const [currentPostId, setCurrentPostId] = useState(posts[0].id);

  return (
    <PostDetail
      posts={posts}
      initialPostId={currentPostId}
      onBack={() => console.log("Go back")}
    />
  );
}
