"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../store/blogSlice";
import HeaderComponent from "../components/HeaderComponents";
import { ArrowRight, Calendar, Clock, Plus } from 'lucide-react';
import { Button } from "../components/Cards/button";
import styles from "./page.module.css";
import pageStyles from "../blogs/page.module.css";
import stylesBlog from "../blogs/blogmodal.module.css";
import FooterComponent from "../components/FooterComponent";
import BottomNavComponent from "../components/BottomNavComponent";
import CreateBlogModal from "../components/CreateBlogModal";

export default function BlogPage() {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user;


  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const blogPosts = blogs && blogs.length > 0 
    ? blogs.map(blog => ({
        id: blog._id,
        title: blog.title,
        excerpt: blog.content.substring(0, 120) + "...",
        date: new Date(blog.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        readTime: `${Math.ceil(blog.content.length / 1000)} min read`,
        category: "Development", 
        user: {
          name: blog.author?.fullname || blog.author?.username || "Anonymous",
          avatar: blog.author?.avatar || "/images/image29.webp",
        },
      }))
    : [];

  const featuredPost = blogPosts.length > 0 ? blogPosts[0] : null;

  const handleCreateModalClose = () => {
    setShowCreateModal(false);
    dispatch(fetchBlogs());
  };

  if (loading && blogs.length === 0) return <div>Loading blogs...</div>;
  if (error) return <div>Error loading blogs: {error}</div>;

  return (
    <>
      <HeaderComponent />
      <div className={styles.main}>
        {/* Main Content */}
        <main className="container">

              {/* Create Blog Button (only shown if authenticated) */}
      {isAuthenticated && (
        <button 
          className={pageStyles.createButton}
          onClick={() => setShowCreateModal(true)}
          aria-label="Create new blog post"
        >
          <Plus />Create new Blog..
        </button>
      )}

          {/* Featured Post */}
          {featuredPost && (
            <section className={styles.featuredPost}>
              <h2>Featured Post</h2>
              <div className={styles.grid}>
                <div className={styles.content}>
                  <div className={styles.category}>{featuredPost.category}</div>
                  <h3>{featuredPost.title}</h3>
                  <p>{featuredPost.excerpt}</p>
                  <div className={styles.meta}>
                    <div>
                      <Calendar />
                      {featuredPost.date}
                    </div>
                    <div>
                      <Clock />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <div className={styles.userInfo}>
                    <img
                      src={featuredPost.user.avatar || "/placeholder.svg"}
                      alt={featuredPost.user.name}
                      className={styles.userAvatar}
                    />
                    <span>{featuredPost.user.name}</span>
                  </div>
                  <Button>
                    <Link href={`/blogs/${featuredPost.id}`} className={styles.readMore}>
                      Read More <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          )}

          {/* Latest Posts */}
          <section className={styles.latestPosts}>
            {blogPosts.slice(featuredPost ? 1 : 0).map((post) => (
              <article key={post.id} className={styles.post}>
                <div className={styles.content}>
                  <div className={styles.category}>{post.category}</div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className={styles.meta}>
                    <div>
                      <Calendar />
                      {post.date}
                    </div>
                    <Link
                      href={`/blogs/${post.id}`}
                      className={styles.readMore}
                    >
                      Read More <ArrowRight />
                    </Link>
                  </div>
                  <div className={styles.userInfo}>
                    <img
                      src={post.user.avatar || "/placeholder.svg"}
                      alt={post.user.name}
                      className={styles.userAvatar}
                    />
                    <span>{post.user.name}</span>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </main>
      </div>
      {/* <button 
          className={pageStyles.createButton}
          onClick={() => setShowCreateModal(true)}
          aria-label="Create new blog post"
        >
          <Plus />
        </button> */}
    
      {/* Create Blog Modal */}
      {showCreateModal && <CreateBlogModal onClose={handleCreateModalClose} />}

      <FooterComponent />
      <BottomNavComponent />
    </>
  );
}
