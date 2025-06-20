"use client";

import { useState, useRef, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import Image from "next/image"
import Link from "next/link"
import Footer from "../../components/FooterShop"
import ShareModal from "../../components/ShareModal"
import LoginModal from "../../components/loginModal"
import CommentSection from "../../components/commentSection"
import api from "../../services/api"
import styles from "../stylesfeed.module.css"
import stylesReels from "../reel.module.css"
import styleshop from "../../shop/StyleShop.module.css"
import { LikeProvider } from "../../actions/LikeContext"

export default function ReelDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [reelsData, setReelsData] = useState([])
  const [activeReel, setActiveReel] = useState(0)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [currentShareReel, setCurrentShareReel] = useState(null)
  const [isCommenting, setIsCommenting] = useState(false)
  const [isPaused, setIsPaused] = useState({})
  const [showProductModal, setShowProductModal] = useState(false)
  const videoRefs = useRef([])
  const observer = useRef(null)
  const commentSectionRef = useRef(null)
  const productsRowRef = useRef({})
  const containerRef = useRef(null)
  const currentUserId = useSelector((state) => state.auth.user?._id)
  const currentUser = useSelector((state) => state.auth.user)
  const isLoggedIn = !!currentUserId
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [followLoading, setFollowLoading] = useState({})
  const [scrollPosition, setScrollPosition] = useState({})

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
          .filter(
            (post) => post.video && !post.images.length && post._id !== id
          )
          .map((reel) => ({
            ...reel,
            isLiked: (reel.likes || []).some(
              (like) => like._id === currentUserId
            ),
            isSaved: currentUser?.saved?.includes(reel._id),
          }));

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

  useEffect(() => {
    fetchCurrentReel()
  }, [fetchCurrentReel])

  useEffect(() => {
    if (!isLoading && reelsData.length === 1) {
      fetchRelatedReels();
    }
  }, [isLoading, reelsData.length, fetchRelatedReels]);

  // Handle scroll to ensure proper snap
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollTop = containerRef.current.scrollTop
      const height = window.innerHeight
      const index = Math.round(scrollTop / height)

      if (index !== activeReel) {
        setActiveReel(index)

        // Force snap to the active reel
        setTimeout(() => {
          containerRef.current?.scrollTo({
            top: index * height,
            behavior: "smooth",
          })
        }, 50)
      }
    }

    containerRef.current?.addEventListener("scroll", handleScroll, { passive: true })
    return () => containerRef.current?.removeEventListener("scroll", handleScroll)
  }, [activeReel])

  // Intersection Observer setup
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
            setActiveReel(index)
          }
        });
      },
      { threshold: 0.7 },
    )

    videoRefs.current.forEach((video) => {
      if (video) observer.current.observe(video);
    });

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [reelsData]);

  // Video playback control
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeReel) {
        if (!isPaused[index]) {
          video.play().catch((err) => console.error("Error playing video:", err))
        }
        video.muted = false
      } else {
        video.pause();
        video.muted = true;
        video.currentTime = 0;
      }
    })
  }, [activeReel, isPaused])

  const updateReel = async (reelId, action, apiCall) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      await apiCall(reelId)
      setReelsData((prevReels) => prevReels.map((reel) => (reel._id === reelId ? { ...reel, ...action(reel) } : reel)))
    } catch (error) {
      console.error("Error updating reel:", error)
    }
  };

  const handleLike = (reelId) =>
    updateReel(
      reelId,
      (reel) => ({
        isLiked: true,
        likes: [...(reel.likes || []), currentUserId],
      }),
      api.likePost,
    )

  const handleUnlike = (reelId) =>
    updateReel(
      reelId,
      (reel) => ({
        isLiked: false,
        likes: (reel.likes || []).filter((like) => like._id !== currentUserId),
      }),
      api.unlikePost,
    )

  const handleSave = (reelId) =>
    updateReel(reelId, () => ({ isSaved: true }), api.savePost);

  const handleUnsave = (reelId) => updateReel(reelId, () => ({ isSaved: false }), api.unsavePost)

  const handleFollowToggle = async (userId) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true)
      return
    }

    // Set loading state for this specific user
    setFollowLoading((prev) => ({ ...prev, [userId]: true }))

    try {
      // Check if the current user is following this user
      const isFollowing = reelsData.find((reel) => reel.user?._id === userId)?.user?.followers?.includes(currentUserId)

      // Make the API call
      if (isFollowing) {
        await api.unfollowUser(userId)
      } else {
        await api.followUser(userId)
      }

      // Update the reels data to reflect the follow/unfollow action
      setReelsData((prevReels) =>
        prevReels.map((reel) => {
          if (reel.user?._id === userId) {
            const updatedFollowers = isFollowing
              ? (reel.user.followers || []).filter((id) => id !== currentUserId)
              : [...(reel.user.followers || []), currentUserId]

            return {
              ...reel,
              user: {
                ...reel.user,
                followers: updatedFollowers,
              },
            }
          }
          return reel
        }),
      )
    } catch (error) {
      console.error("Follow toggle error:", error)
    } finally {
      // Clear loading state
      setFollowLoading((prev) => ({ ...prev, [userId]: false }))
    }
  }

  const handleComment = async (reelId, comment) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true)
      return
    }

    try {
      const updatedPost = await api.commentOnPost(reelId, comment)
      setReelsData((prevReels) =>
        prevReels.map((reel) => (reel._id === reelId ? { ...reel, comments: updatedPost.comments } : reel)),
      )
      setIsCommenting(false)
    } catch (error) {
      console.error("Error commenting on post:", error);
    }
  };

  const handleShare = (reel) => {
    setCurrentShareReel(reel);
    setIsShareModalOpen(true);
  };

  const handleVideoClick = (index) => {
    if (!videoRefs.current[index]) return;

    setIsPaused((prev) => {
      const newState = { ...prev, [index]: !prev[index] };

      if (newState[index]) {
        videoRefs.current[index].pause();
      } else {
        videoRefs.current[index]
          .play()
          .catch((err) => console.error("Error playing video:", err));
      }

      return newState;
    });
  };

  const handleVideoClick = (index) => {
    if (!videoRefs.current[index]) return

    setIsPaused((prev) => {
      const newState = { ...prev, [index]: !prev[index] }

      if (newState[index]) {
        videoRefs.current[index].pause()
      } else {
        videoRefs.current[index].play().catch((err) => console.error("Error playing video:", err))
      }

      return newState
    })
  }

  const scrollProducts = (index, direction) => {
    if (!productsRowRef.current[index]) return

    const scrollAmount = 150
    const currentPosition = scrollPosition[index] || 0
    const newPosition =
      direction === "left" ? Math.max(0, currentPosition - scrollAmount) : currentPosition + scrollAmount

    productsRowRef.current[index].scrollTo({
      left: newPosition,
      behavior: "smooth",
    })

    setScrollPosition((prev) => ({
      ...prev,
      [index]: newPosition,
    }))
  }

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleProductClick = (url) => {
    const referralCode = url?.match(/referralCode=([A-Za-z0-9]{6})/)?.[1]
    if (referralCode) {
      try {
        // dispatch(trackReferralClick(referralCode)).unwrap();
      } catch (error) {
        console.error("Tracking failed:", error)
      }
    }
    window.location.href = url
  }

  if (isLoading) {
    return (
      <div className={styleshop.bodyShop}>
        <div className={styleshop.smartphoneContainer}>
          <div className={styles.loadingIndicator}>Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styleshop.bodyShop}>
        <div className={styleshop.smartphoneContainer}>
          <div className={styles.errorMessage}>
            <p>{error}</p>
            <button className={styles.backButton} onClick={() => router.back()}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (reelsData.length === 0) {
    return (
      <div className={styleshop.bodyShop}>
        <div className={styleshop.smartphoneContainer}>
          <div className={styles.errorMessage}>
            <p>Reel not found</p>
            <button className={styles.backButton} onClick={() => router.back()}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LikeProvider>
      <div className={styleshop.bodyShop}>
        <div className={styleshop.smartphoneContainer}>
          <div ref={containerRef} className={styles.reelsContainer}>
            {reelsData.map((reel, index) => (
              <div key={reel._id} className={styles.reelWrapper}>
                <div className={stylesReels.reelContainer}>
                  <div className={stylesReels.videoContainer}>
                    {reel.video ? (
                      <>
                        <video
                          ref={(el) => (videoRefs.current[index] = el)}
                          className={stylesReels.video}
                          loop
                          playsInline
                          onClick={() => handleVideoClick(index)}
                          controls={false}
                          data-index={index}
                          autoPlay={index === activeReel && !isPaused[index]}
                          muted={index !== activeReel}
                        >
                          <source src={reel.video} type="video/mp4" />
                        </video>
                        {isPaused[index] && (
                          <div className={stylesReels.playIconOverlay} onClick={() => handleVideoClick(index)}>
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        )}
                      </>
                    ) : reel.images?.[0] ? (
                      <Image
                        src={reel.images[0] || "/placeholder.svg"}
                        alt="Post"
                        fill
                        className={stylesReels.image}
                        objectFit="cover"
                      />
                    ) : (
                      <Image src="/placeholder.svg" alt="Placeholder" fill objectFit="cover" />
                    )}
                  </div>

                  <div className={stylesReels.actions}>
                    <div className={stylesReels.actionItem}>
                      <button
                        className={stylesReels.actionButton}
                        onClick={() => (reel.isLiked ? handleUnlike(reel._id) : handleLike(reel._id))}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill={reel.isLiked ? "red" : "none"}
                          stroke={reel.isLiked ? "red" : "white"}
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span className={stylesReels.actionCount}>{reel.likes?.length || 0}</span>
                      </button>
                    </div>

                    <div className={stylesReels.actionItem}>
                      <button className={stylesReels.actionButton} onClick={() => handleShare(reel)}>
                        <svg
                          height="24px"
                          width="24px"
                          version="1.1"
                          id="Layer_1"
                          viewBox="0 0 512 512"
                          xmlSpace="preserve"
                          fill=""
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                          <g id="SVGRepo_iconCarrier">
                            <path
                              style={{ fill: "none" }}
                              d="M501.801,213.374L324.879,36.453V142.94h-59.905c-140.708,0-254.775,114.066-254.775,254.775v77.833l92.966-101.742c52.389-57.335,126.474-89.996,204.14-89.996h17.574v106.487L501.801,213.374z"
                            />
                            <path
                              style={{ fill: "#fff" }}
                              d="M10.197,485.747c-1.238,0-2.488-0.225-3.687-0.691c-3.925-1.523-6.51-5.3-6.51-9.509v-77.833c0-70.777,27.562-137.318,77.609-187.365c50.047-50.046,116.588-77.609,187.366-77.609h49.705V36.453c0-4.125,2.486-7.844,6.296-9.423c3.811-1.579,8.198-0.707,11.115,2.21l176.923,176.922c1.912,1.912,2.987,4.507,2.987,7.212c0,2.705-1.075,5.299-2.987,7.212L332.09,397.509c-2.917,2.916-7.304,3.791-11.115,2.21c-3.81-1.579-6.296-5.297-6.296-9.423v-96.288h-7.374c-74.616,0-146.278,31.593-196.611,86.677L17.728,482.427C15.758,484.584,13.007,485.747,10.197,485.747zM264.974,153.139c-134.86,0-244.576,109.716-244.576,244.575v51.551l75.237-82.339c54.187-59.303,131.338-93.316,211.669-93.316h17.573c5.632,0,10.199,4.566,10.199,10.199v81.864l152.299-152.299L335.077,61.076v81.864c0,5.633-4.567,10.199-10.199,10.199H264.974z"
                            />
                            <path
                              style={{ fill: "none" }}
                              d="M247.503,190.884c-5.444,0-9.963-4.3-10.184-9.789c-0.227-5.628,4.152-10.375,9.78-10.601c2.762-0.111,5.571-0.168,8.35-0.168c5.633,0,10.199,4.566,10.199,10.199c0,5.633-4.566,10.199-10.199,10.199c-2.507,0-5.039,0.051-7.529,0.151C247.781,190.882,247.642,190.884,247.503,190.884z"
                            />
                            <path
                              style={{ fill: "none" }}
                              d="M140.757,228.2c-3.139,0-6.236-1.444-8.234-4.169c-3.33-4.543-2.348-10.925,2.196-14.255c22.329-16.37,47.27-27.846,74.131-34.11c5.49-1.279,10.97,2.131,12.249,7.616c1.279,5.486-2.131,10.97-7.616,12.249c-24.164,5.635-46.607,15.963-66.704,30.696C144.962,227.558,142.85,228.2,140.757,228.2z"
                            />
                          </g>
                        </svg>
                      </button>
                    </div>

                    <div className={stylesReels.actionItem}>
                      <button
                        className={stylesReels.actionButton}
                        onClick={() => (reel.isSaved ? handleUnsave(reel._id) : handleSave(reel._id))}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill={reel.isSaved ? "white" : "none"}
                          stroke="white"
                        >
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className={stylesReels.userProfile}>
                    <div className={stylesReels.profileContainer}>
                      <Link href={`/creator/${reel.user?._id}`}>
                        <img
                          src={reel.user?.avatar || "/placeholder.svg"}
                          alt={reel.user?.fullname || "User"}
                          className={stylesReels.profileImage}
                        />
                      </Link>
                      <div className={stylesReels.profileInfo}>
                        <Link href={`/creator/${reel.user?._id}`} className={stylesReels.profileName}>
                          {reel.user?.fullname || "User"}
                        </Link>
                        {currentUserId !== reel.user?._id && (
                          <button
                            className={`${styles.followButton} ${
                              followLoading[reel.user?._id] ? styles.followButtonLoading : ""
                            }`}
                            onClick={() => handleFollowToggle(reel.user?._id)}
                            disabled={followLoading[reel.user?._id]}
                          >
                            {followLoading[reel.user?._id]
                              ? "Loading..."
                              : reel.user?.followers?.includes(currentUserId)
                                ? "Following"
                                : "Follow"}
                          </button>
                        )}
                      </div>
                    </div>
                    {/* View Product Button - Now above the products row */}
                  {reel.products && reel.products.length > 0 && (
                    <div className={stylesReels.viewProductWrapper}>
                      <button
                        className={stylesReels.viewProductButton}
                        onClick={() => {
                          setCurrentShareReel(reel)
                          setShowProductModal(true)
                        }}
                      >
                        Shop Products ({reel.products.length})
                      </button>
                    </div>
                  )}
                  </div>

                  

                  {/* Products Row */}
                  {reel.products && reel.products.length > 0 && (
                    <div className={stylesReels.productsContainer}>
                      {reel.products.length > 3 && (
                        <button
                          className={`${stylesReels.scrollButton} ${stylesReels.scrollButtonLeft}`}
                          onClick={() => scrollProducts(index, "left")}
                        >
                          ‹
                        </button>
                      )}

                      <div className={stylesReels.productsRow} ref={(el) => (productsRowRef.current[index] = el)}>
                        {reel.products.map((product, productIndex) => (
                          <div key={productIndex} className={stylesReels.productCard}>
                            <a
                              href={product.url}
                              onClick={(e) => {
                                e.preventDefault()
                                handleProductClick(product.url)
                              }}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <div className={stylesReels.productImage}>
                                <img src={product.image || "/placeholder.svg"} alt={product.title} />
                              </div>
                              <div className={stylesReels.productInfo}>
                                <div className={stylesReels.productBrand}>{product.title?.substring(0, 20)}...</div>
                                {product.price && <div className={stylesReels.productPrice}>{product.price}</div>}
                              </div>
                            </a>
                          </div>
                        ))}
                      </div>

                      {reel.products.length > 3 && (
                        <button
                          className={`${stylesReels.scrollButton} ${stylesReels.scrollButtonRight}`}
                          onClick={() => scrollProducts(index, "right")}
                        >
                          ›
                        </button>
                      )}
                    </div>
                  )}

                  {isCommenting && index === activeReel && (
                    <div ref={commentSectionRef}>
                      <CommentSection
                        comments={reel.comments}
                        onAddComment={(comment) => handleComment(reel._id, comment)}
                        onClose={() => setIsCommenting(false)}
                        postId={reel._id}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Footer />
        </div>
        {isShareModalOpen && <ShareModal reel={currentShareReel} onClose={() => setIsShareModalOpen(false)} />}
        {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}

        {/* Product Modal */}
        {showProductModal && currentShareReel && (
          <div className={stylesReels.productModalOverlay} onClick={() => setShowProductModal(false)}>
            <div className={stylesReels.productModal} onClick={(e) => e.stopPropagation()}>
              <div className={stylesReels.modalHeader}>
                <h3>Shop Products ({currentShareReel.products?.length || 0})</h3>
                <button className={stylesReels.closeButton} onClick={() => setShowProductModal(false)}>
                  ×
                </button>
              </div>
              <div className={stylesReels.modalContent}>
                <div className={stylesReels.productsGrid}>
                  {currentShareReel.products?.map((product, index) => (
                    <div key={index} className={stylesReels.productGridItem}>
                      <div className={stylesReels.productGridImage}>
                        <img src={product.image || "/placeholder.svg"} alt={product.title} />
                      </div>
                      <div className={stylesReels.productGridInfo}>
                        <div className={stylesReels.productGridTitle}>{product.title}</div>
                        {product.price && <div className={stylesReels.productGridPrice}>{product.price}</div>}
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={stylesReels.productGridLink}
                          onClick={(e) => {
                            e.preventDefault()
                            handleProductClick(product.url)
                          }}
                        >
                          Visit Product
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </LikeProvider>
  )
}
