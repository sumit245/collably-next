// heroCarousel.js
'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/postSlice';
import VideoCarouselCard from './Cards/VideoCard';
import { BASE_URL } from "../services/api";
export default function HeroCarousel({ data }) {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const videoData = posts
    .filter(post => post.video)
    .map(post => ({
      src: `${BASE_URL}${post.video.replace(/\\/g, "/")}`,
      poster: '',
      id: post._id 
    }));

  return (
    <main>
      <VideoCarouselCard 
        videos={videoData} 
        title={data.title} 
        subtitle={data.subtitle} 
      />
    </main>
  )
}

