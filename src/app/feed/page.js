'use client'

import { useState, useRef, useEffect } from 'react'
import Reel from '../components/Reel'
import ShareModal from '../components/ShareModal'
import styles from './stylesfeed.module.css'
import styleshop from '../shop/StyleShop.module.css'
import Footer from '../components/FooterShop'
import { reelsDataSource } from '../utils.faker'

const parseLikes = (likes) => {
  if (typeof likes === 'string') {
    if (likes.includes('K')) return parseFloat(likes) * 1000;
    if (likes.includes('M')) return parseFloat(likes) * 1000000;
  }
  return likes;
};

const formatLikes = (likes) => {
  if (likes >= 1000000) return (likes / 1000000).toFixed(1) + 'M';
  if (likes >= 1000) return (likes / 1000).toFixed(1) + 'K';
  return likes.toString();
};

export default function ReelsPage() {
  const [reelsData, setReelsData] = useState(reelsDataSource);
  const [activeReel, setActiveReel] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentShareReel, setCurrentShareReel] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / window.innerHeight);
      setActiveReel(index);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = (reelId) => {
    setReelsData(reels =>
      reels.map(reel => {
        if (reel.id === reelId) {
          const currentLikes = parseLikes(reel.likes); 
          return {
            ...reel,
            likes: reel.isLiked ? currentLikes - 1 : currentLikes + 1,
            isLiked: !reel.isLiked
          };
        }
        return reel;
      })
    );
  };

  const handleComment = (reelId, comment) => {
    setReelsData(reels =>
      reels.map(reel => {
        if (reel.id === reelId) {
          return {
            ...reel,
            comments: [...reel.comments, { id: Date.now(), username: 'currentUser', text: comment }]
          };
        }
        return reel;
      })
    );
  };

  const handleShare = (reel) => {
    setCurrentShareReel(reel);
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
    setCurrentShareReel(null);
  };

  return (
    <div className={styleshop.bodyShop}>
      <div className={styleshop.smartphoneContainer}>
        <div ref={containerRef} className={styles.reelsContainer}>
          {reelsData.map((reel, index) => (
            <div key={reel.id} className={styles.reelWrapper}>
              <Reel 
                {...reel} 
                likes={formatLikes(reel.likes)} 
                isActive={index === activeReel} 
                onLike={() => handleLike(reel.id)}
                onComment={(comment) => handleComment(reel.id, comment)}
                onShare={() => handleShare(reel)}
              />
            </div>
          ))}
        </div>
        <Footer />
      </div>
      {isShareModalOpen && (
        <ShareModal reel={currentShareReel} onClose={closeShareModal} />
      )}
    </div>
  );
}