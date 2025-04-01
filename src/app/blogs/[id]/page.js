"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { fetchBlogById, removeBlog } from "../../store/blogSlice"
import Image from "next/image"
import { Calendar, Clock, ArrowLeft, Trash2 } from "lucide-react"
import HeaderComponent from "../../components/HeaderComponents"
import FooterComponent from "../../components/FooterComponent"
import BottomNavComponent from "../../components/BottomNavComponent"
import styles from "../../postDetails/postDetails.module.css"
import stylesBlog from "../blogmodal.module.css"

export default function BlogDetail() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()

  const { currentBlog, loading, error } = useSelector((state) => state.blogs)
  const currentUser = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id))
    }
  }, [dispatch, id])

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

  if (loading) return <div>Loading blog...</div>
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
console.log(currentBlog)
  const isAuthor = currentUser && currentBlog.author && currentUser._id === currentBlog.author._id

  return (
    <>
      <HeaderComponent />
      <div className={stylesBlog.blogbyid}>
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
                onClick={handleDelete}
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

            {/* Blog content */}
            <div className={styles.blogContent}>
              {blog.content.split("\n").map((paragraph, index) => (
                <p key={index} style={{ marginBottom: "16px" }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
      <BottomNavComponent />
    </>
  )
}

