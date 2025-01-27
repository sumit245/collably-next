import Image from 'next/image'
import {blogs} from '../utils.faker'

export default function BlogsCorner({ styles }) {
  
  return (
    <div className={styles.mx4}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>Blogs Corner</div>
        <div className={styles.viewAll}>
          <div className={styles.viewAllText}>View all</div>
          <Image src="/images/arrow.svg" width={16} height={16} alt="arrow" />
        </div>
      </div>
      
      <div className={styles.blogContainer}>
        {blogs.map((blog) => (
          <div key={blog.id} className={styles.blogCard}>
            <div className={styles.cardHeader}>
              <div className={styles.authorInfo}>
                <Image src="/images/creator.jpeg" className={styles.authorAvatar} alt="author" width={24} height={24} />
                <div className={styles.authorName}>{blog.author}</div>
              </div>
              <div className={styles.banner}>
                <Image src="/images/banner-blog-pink.svg" width={80} height={100} alt="banner" />
                <span className={styles.bannerText}>Hot topic</span>
              </div>
            </div>
            
            <Image src={blog.image} className={styles.blogImage} alt="blog" width={198} height={126} />
            
            <div className={styles.blogTitle}>{blog.title}</div>
            
            <div className={styles.blogMeta}>
              <div className={styles.metaText}>{blog.date}</div>
              <Image src="/icons/dot.svg" width={3} height={3} alt="dot" />
              <div className={styles.metaText}>{blog.readTime}</div>
            </div>
            
            <div className={styles.suggested}>Suggested for you</div>
            
            <div className={styles.cardFooter}>
              <div className={styles.likes}>
                <Image src="/images/wishlist-pink.svg" width={25} height={25} alt="like" />
                <div className={styles.likeCount}>{blog.likes}</div>
              </div>
              <svg className={styles.shareIcon} width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1A3365" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
