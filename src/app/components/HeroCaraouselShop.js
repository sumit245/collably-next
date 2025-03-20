'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/postSlice';
import VideoCarouselCard from './Cards/VideoCard';
import { BASE_URL } from "../services/api";
import styles from "../cart/styleCart.module.css";

export default function HeroCarousel({ data }) {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === 'succeeded' && posts.length > 0) {
      setIsLoading(false);
    }
  }, [status, posts]);

  const videoData = posts
    .filter(post => post.video)
    .map(post => ({
      src: post.video,
      poster: '',
      id: post._id 
    }));

  return (
    <main>
      {isLoading || videoData.length === 0 ? (
        <div className={styles.skeletonContainer}>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonSubtitle}></div>
          <div className={styles.skeletonVideos}>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className={styles.skeletonVideo}></div>
            ))}
          </div>
        </div>
      ) : (
        <VideoCarouselCard 
          videos={videoData} 
          title={data.title} 
          subtitle={data.subtitle} 
        />
      )}
    </main>
  )
}
