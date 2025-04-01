import Link from "next/link";
import HeaderComponent from "../components/HeaderComponents";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "../components/Cards/button";
import { Input } from "../components/Cards/input";
import styles from "./BlogPage.module.css"; // Import the CSS Module
import FooterComponent from "../components/FooterComponent";
import BottomNavComponent from "../components/BottomNavComponent";

// Sample blog data with user info
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt:
      "Learn how to build modern web applications with Next.js and React.",
    date: "March 28, 2025",
    readTime: "5 min read",
    category: "Development",
    slug: "getting-started-with-nextjs",
    user: {
      name: "john Doe",
      avatar: "/images/image29.webp", // Add the avatar path
    },
  },
  {
    id: 2,
    title: "Understanding React Hooks",
    excerpt:
      "React hooks are an essential part of modern React development.",
    date: "March 27, 2025",
    readTime: "6 min read",
    category: "Development",
    slug: "understanding-react-hooks",
    user: {
      name: "John Smith",
      avatar:  "/images/image29.webp",  // Add the avatar path
    },
  },
  {
    id: 2,
    title: "Understanding React Hooks",
    excerpt:
      "React hooks are an essential part of modern React development.",
    date: "March 27, 2025",
    readTime: "6 min read",
    category: "Development",
    slug: "understanding-react-hooks",
    user: {
      name: "John Smith",
      avatar: "/images/image29.webp", // Add the avatar path
    },
  },
  {
    id: 2,
    title: "Understanding React Hooks",
    excerpt:
      "React hooks are an essential part of modern React development.",
    date: "March 27, 2025",
    readTime: "6 min read",
    category: "Development",
    slug: "understanding-react-hooks",
    user: {
      name: "John Smith",
      avatar:  "/images/image29.webp", // Add the avatar path
    },
  },
  {
    id: 2,
    title: "Understanding React Hooks",
    excerpt:
      "React hooks are an essential part of modern React development.",
    date: "March 27, 2025",
    readTime: "6 min read",
    category: "Development",
    slug: "understanding-react-hooks",
    user: {
      name: "John Smith",
      avatar:  "/images/image29.webp", // Add the avatar path
    },
  },
  {
    id: 2,
    title: "Understanding React Hooks",
    excerpt:
      "React hooks are an essential part of modern React development.",
    date: "March 27, 2025",
    readTime: "6 min read",
    category: "Development",
    slug: "understanding-react-hooks",
    user: {
      name: "John Smith",
      avatar:  "/images/image29.webp", // Add the avatar path
    },
  },
  // ... other posts
];

const featuredPost = blogPosts[0];

export default function BlogPage() {
  return (
    <>
      <HeaderComponent />
      <div className={styles.main}>
        {/* Main Content */}
        <main className="container">
          {/* Featured Post */}
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
                    src={featuredPost.user.avatar}
                    alt={featuredPost.user.name}
                    className={styles.userAvatar}
                  />
                  <span>{featuredPost.user.name}</span>
                </div>
                <Button>
                  <Link href={`/blog/${featuredPost.slug}`} className={styles.readMore}>
                    Read More <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Latest Posts */}
          <section className={styles.latestPosts}>
            {blogPosts.slice(1).map((post) => (
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
                      href={`/blog/${post.slug}`}
                      className={styles.readMore}
                    >
                      Read More <ArrowRight />
                    </Link>
                  </div>
                  <div className={styles.userInfo}>
                    <img
                      src={post.user.avatar}
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

      <FooterComponent />
      <BottomNavComponent />
    </>
  );
}
