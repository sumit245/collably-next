"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/FooterShop";
import ShareModal from "../../components/ShareModal";
import LoginModal from "../../components/loginModal";
import CommentSection from "../../components/commentSection";
import api from "../../services/api";
import styles from "../stylesfeed.module.css";
import styleshop from "../../shop/StyleShop.module.css";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { LikeProvider } from "../../actions/LikeContext";

export default function ReelDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [reelsData, setReelsData] = useState([]);
  const [activeReel, setActiveReel] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentShareReel, setCurrentShareReel] = useState(null);
  const [isCommenting, setIsCommenting] = useState(false);
  const videoRefs = useRef([]);
  const observer = useRef(null);
  const currentUserId = useSelector((state) => state.auth.user?._id);
  const currentUser = useSelector((state) => state.auth.user);
  const isLoggedIn = !!currentUserId;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCurrentReel = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.getPostById(id);
      if (!response?.post) {
        setError("Failed to load reel data.");
        return;
      }

      const post = response.post;
      const formattedReel = {
        ...post,
        isLiked: (post.likes || []).some((like) => like._id === currentUserId),
        isSaved: currentUser?.saved?.includes(post._id),
        likes: post.likes || [],
        comments: post.comments || [],
      };

      setReelsData([formattedReel]);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching reel:", err);
      setError(err.message || "Failed to load the reel");
      setIsLoading(false);
    }
  }, [id, currentUserId, currentUser?.saved]);

  const fetchRelatedReels = useCallback(async () => {
    try {
      const { posts } = await api.getPosts();
      if (Array.isArray(posts)) {
        const otherReels = posts
          .filter((post) => post.video && !post.images.length && post._id !== id)
          .map((reel) => ({
            ...reel,
            isLiked: (reel.likes || []).some((like) => like._id === currentUserId),
            isSaved: currentUser?.saved?.includes(reel._id),
          }));
  
        // Shuffle before setting state
        setReelsData((prevReels) => {
          if (prevReels.length > 0) {
            return [...prevReels, ...shuffleArray(otherReels)];
          }
          return shuffleArray(otherReels);
        });
      }
    } catch (error) {
      console.error("Error fetching related reels:", error);
    }
  }, [id, currentUserId, currentUser?.saved]);
  
  // Define shuffleArray function
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  
  useEffect(() => {
    fetchCurrentReel();
  }, [fetchCurrentReel]);

  useEffect(() => {
    if (!isLoading && reelsData.length === 1) {
      fetchRelatedReels();
    }
  }, [isLoading, reelsData.length, fetchRelatedReels]);

  // *Intersection Observer for Accurate Active Reel Detection*
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setActiveReel(index);
          }
        });
      },
      { threshold: 0.75 } // Adjust threshold to detect when most of the reel is visible
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.current.observe(video);
    });

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [reelsData]);

  // *Play only the active reel and pause others*
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeReel) {
        video.play();
        video.muted = false;
      } else {
        video.pause();
        video.muted = true;
        video.currentTime = 0;
      }
    });
  }, [activeReel]);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <LikeProvider>
      <div className={styleshop.bodyShop}>
        <div className={styleshop.smartphoneContainer}>
          <div className={styles.reelsContainer}>
            {reelsData.map((reel, index) => (
              <div key={reel._id} className={styles.reelWrapper}>
                <div className={styles.reelContainer}>
                  {reel.video ? (
                    <video
                      className={styles.video}
                      loop
                      playsInline
                      ref={(el) => (videoRefs.current[index] = el)}
                      data-index={index} // Important for observer tracking
                      autoPlay={index === activeReel}
                      muted={index !== activeReel}
                    >
                      <source src={reel.video} type="video/mp4" />
                    </video>
                  ) : (
                    <div className={styles.noContentMessage}>No media available</div>
                  )}

                  <div className={styles.actions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => (reel.isLiked ? handleUnlike(reel._id) : handleLike(reel._id))}
                    >
                      <Heart fill={reel.isLiked ? "red" : "none"} size={24} />
                      <span>{reel.likes?.length || 0}</span>
                    </button>
                    <button className={styles.actionButton} onClick={() => handleShare(reel)}>
                      <Send size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Footer />
        </div>
        {isShareModalOpen && <ShareModal reel={currentShareReel} onClose={() => setIsShareModalOpen(false)} />}
        {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
      </div>
    </LikeProvider>
  );
}