import Image from 'next/image'
import styles from '../../shop/StyleShop.module.css'

export default function CreatorCard({ videoSrc, posterSrc, name, followers }) {
  return (
    <div className={styles.creatorCard}>
      <div className={styles.videoContainer}>
        <video
          className={styles.creatorVideo}
          playsInline
          loop
          preload="none"
          poster={posterSrc}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className={styles.gradientOverlay}></div>
        <div className={styles.creatorInfo}>
          <div className={styles.creatorName}>{name}</div>
          <div className={styles.followerCount}>{followers} Followers</div>
        </div>
      </div>
      <button className={styles.shopButton}>
        <Image src="/images/shop-purple.svg" alt="shop-icon" width={30} height={30} />
        <span>Shop</span>
      </button>
    </div>
  )
}
