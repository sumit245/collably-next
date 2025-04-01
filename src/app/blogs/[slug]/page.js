import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "../../components/Cards/button";
import styles from "../BlogPostPage.module.css"; // Import CSS Module

// This would typically come from a CMS or API
const getBlogPost = (slug) => {
  // Sample blog post data
  return {
    title: "Getting Started with Next.js",
    content: `...`, // Your HTML content goes here
    date: "March 28, 2025",
    readTime: "5 min read",
    author: "Jane Doe",
    authorImage: "/placeholder.svg?height=100&width=100",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Development",
  };
};

export default function BlogPostPage({ params }) {
  const post = getBlogPost(params.slug);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className="container mx-auto px-4 py-6">
          <div className={styles.headerContent}>
            <Link href="/blog" className={styles.headerLink}>
              DevInsights
            </Link>
            <Button asChild variant="ghost" className={styles.headerButton}>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Link>
              </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <article className={styles.article}>
          {/* Post Header */}
          <div className={styles.articleHeader}>
            <div className="mb-3">
              <span className={styles.category}>{post.category}</span>
            </div>
            <h1 className={styles.articleTitle}>{post.title}</h1>
            <div className={styles.articleMeta}>
              <div className={styles.articleMetaItem}>
                <Calendar className="mr-1 h-4 w-4" />
                {post.date}
              </div>
              <div className={styles.articleMetaItem}>
                <Clock className="mr-1 h-4 w-4" />
                {post.readTime}
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className={styles.articleImage}>
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          </div>

          {/* Author */}
          <div className={styles.authorBox}>
            <div className={styles.authorImage}>
              <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
            </div>
            <div className={styles.authorInfo}>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="font-medium">{post.author}</span>
              </div>
              <p className="text-sm text-muted-foreground">Web Developer & Technical Writer</p>
            </div>
          </div>

          {/* Post Content */}
          <div
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className={styles.tags}>
            <h3 className="text-lg font-medium mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <span className={styles.tag}>Next.js</span>
              <span className={styles.tag}>React</span>
              <span className={styles.tag}>JavaScript</span>
              <span className={styles.tag}>Web Development</span>
            </div>
          </div>

          {/* Share */}
          <div className={styles.share}>
            <h3 className="text-lg font-medium mb-3">Share this post</h3>
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className={styles.shareButton}>
                Twitter
              </Button>
              <Button variant="outline" size="sm" className={styles.shareButton}>
                Facebook
              </Button>
              <Button variant="outline" size="sm" className={styles.shareButton}>
                LinkedIn
              </Button>
              <Button variant="outline" size="sm" className={styles.shareButton}>
                Copy Link
              </Button>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DevInsights. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
