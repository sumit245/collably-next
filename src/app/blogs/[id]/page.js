"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { fetchBlogById, removeBlog, fetchBlogs } from "../../store/blogSlice"
import Image from "next/image"
import { Calendar, Clock, ArrowLeft, Trash2, ArrowRight } from 'lucide-react'
import HeaderComponent from "../../components/HeaderComponents"
import FooterComponent from "../../components/FooterComponent"
import BottomNavComponent from "../../components/BottomNavComponent"
import Modal from "../../components/modal" // Import the modal component
import styles from "../../postDetails/postDetails.module.css"
import stylesBlog from "../blogmodal.module.css"

export default function BlogDetail() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()

  const { currentBlog, loading, error, blogs } = useSelector((state) => state.blogs)
  const currentUser = useSelector((state) => state.auth.user)

  const [isModalVisible, setIsModalVisible] = useState(false) // State for modal visibility

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id))
    }
    // Fetch all blogs for recommendations if not already loaded
    if (!blogs || blogs.length === 0) {
      dispatch(fetchBlogs())
    }
  }, [dispatch, id, blogs])

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        await dispatch(removeBlog(id)).unwrap()
        router.push("/blogs")
      } catch (error) {
        console.error("Failed to delete blog:", error)
      }
    }
  }

  const handleDeleteClick = () => {
    setIsModalVisible(true);  // Show the modal when delete button is clicked
  }

  const handleCancelDelete = () => {
    setIsModalVisible(false);  // Hide the modal when cancel is clicked
  }

  const handleConfirmDelete = async () => {
    setIsModalVisible(false);  // Close the modal
    try {
      await dispatch(removeBlog(id)).unwrap();  // Delete the blog
      router.push("/blogs");
    } catch (error) {
      console.error("Failed to delete blog:", error)
    }
  }

  if (loading && !currentBlog) return <div>Loading blog...</div>
  if (error) return <div>Error loading blog: {error}</div>
  if (!currentBlog) return <div>Blog not found</div>

  const blog = {
    title: currentBlog.title,
    content: currentBlog.content,
    date: new Date(currentBlog.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    readTime: `${Math.ceil(currentBlog.content.length / 1000)} min read`,
    user: {
      name: currentBlog.author?.fullname || currentBlog.author?.username || "Anonymous",
      avatar: currentBlog.author?.avatar || "/images/image29.webp",
    },
  }

  // Ensure recommendedBlogs is defined correctly
  const recommendedBlogs = blogs
    .filter((blogItem) => blogItem._id !== id)
    .slice(0, 4)
    .map((blogItem) => ({
      id: blogItem._id,
      title: blogItem.title,
      excerpt: blogItem.content.substring(0, 80) + "...",
      date: new Date(blogItem.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      readTime: `${Math.ceil(blogItem.content.length / 1000)} min read`,
      user: {
        name: blogItem.author?.fullname || blogItem.author?.username || "Anonymous",
        avatar: blogItem.author?.avatar || "/images/image29.webp",
      },
    }))

  const isAuthor = currentUser && currentBlog.author && currentUser._id === currentBlog.author._id

  return (
    <>
      <HeaderComponent />
      <div className={stylesBlog.blogbyid}>
        <div className={stylesBlog.blogContentWrapper}>
          <div className={styles.postDetail}>
            <div className={styles.header}>
              <div className={styles.profile}>
                <button onClick={() => router.push("/blogs")} className={styles.backButton}>
                  <ArrowLeft size={24} />
                </button>
                <div className={styles.userInfo}>
                  <Image
                    src={blog.user.avatar || "/placeholder.svg"}
                    alt={blog.user.name}
                    width={32}
                    height={32}
                    className={styles.avatar}
                  />
                  <span className={styles.username}>{blog.user.name}</span>
                </div>
              </div>
              {isAuthor && (
                <button
                  onClick={handleDeleteClick}
                  className={styles.deleteButton}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "red", padding: "8px" }}
                >
                  <Trash2 size={24} />
                </button>
              )}
            </div>

            <div className={styles.mainPost}>
              <h1 className={styles.blogTitle}>{blog.title}</h1>

              <div className={styles.meta} style={{ marginBottom: "20px" }}>
                <div>
                  <Calendar size={16} />
                  <span style={{ marginLeft: "5px" }}>{blog.date}</span>
                </div>
                <div>
                  <Clock size={16} />
                  <span style={{ marginLeft: "5px" }}>{blog.readTime}</span>
                </div>
              </div>

              <div className={styles.blogContent}>
                {blog.content.split("\n").map((paragraph, index) => (
                  <p key={index} style={{ marginBottom: "16px" }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className={stylesBlog.blogRecommendations}>
            <h3 className={stylesBlog.blogRecommendationsTitle}>Recommended Posts</h3>
            {recommendedBlogs.length > 0 ? (
              <div className={stylesBlog.blogRecommendationsList}>
                {recommendedBlogs.map((post) => (
                  <div key={post.id} className={stylesBlog.blogRecommendationItem}>
                    <h4 className={stylesBlog.blogRecommendationTitle}>{post.title}</h4>
                    <p className={stylesBlog.blogRecommendationExcerpt}>{post.excerpt}</p>
                    <div className={stylesBlog.blogRecommendationMeta}>
                      <div className={stylesBlog.blogRecommendationDate}>
                        <Calendar size={14} />
                        <span>{post.date}</span>
                      </div>
                      <div className={stylesBlog.blogRecommendationReadTime}>
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className={stylesBlog.blogRecommendationAuthor}>
                      <Image
                        src={post.user.avatar || "/placeholder.svg"}
                        alt={post.user.name}
                        width={24}
                        height={24}
                        className={stylesBlog.blogRecommendationAvatar}
                      />
                      <span>{post.user.name}</span>
                    </div>
                    <button 
                      onClick={() => router.push(`/blogs/${post.id}`)} 
                      className={stylesBlog.blogRecommendationReadMore}
                    >
                      Read More <ArrowRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className={stylesBlog.blogNoRecommendations}>No recommendations available</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for delete confirmation */}
      <Modal 
        isVisible={isModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <FooterComponent />
      <BottomNavComponent />
    </>
  )
}
