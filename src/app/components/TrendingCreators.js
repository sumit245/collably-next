import Image from 'next/image'

export default function TrendingCreators({ styles }) {
  const creators = [
    {
      id: 1,
      name: 'badalmusic',
      tag: 'Singer',
      avatar: '/images/profile-trending.webp',
      products: 22,
      followers: '13.8K',
      following: 151,
      productImages: [
        '/images/trending-product1.webp',
        '/images/trending-product2.webp',
        '/images/trending-product3.webp'
      ]
    },
    {
      id: 2,
      name: 'mayavi_doodle',
      tag: 'Singer',
      avatar: '/images/image28.webp',
      products: 11,
      followers: '145K',
      following: 680,
      productImages: [
        '/images/trending-product4.webp',
        '/images/trending-product5.webp',
        '/images/trending-product6.webp'
      ]
    }
  ]

  return (
    <section className={styles.trendCreatorSection}>
      <div className={styles.mx4}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>Trending Creators</div>
          <div className={styles.viewAll}>
            <div className={styles.viewAllText}>View all</div>
            <Image src="/images/arrow.svg" width={16} height={16} alt="arrow" />
          </div>
        </div>
        <div className={styles.blogContainer}>
          {creators.map((creator) => (
            <div key={creator.id} className={styles.creatorCard}>
              <section className={styles.profileSection}>
                <div className={styles.profileImage}>
                  <Image src={creator.avatar} alt="avatar" width={75} height={75} />
                </div>
                <div className={styles.profileInfo}>
                  <h2 className={styles.profileName}>{creator.name}</h2>
                  <span className={styles.profileTag}>{creator.tag}</span>
                </div>
              </section>

              <section className={styles.statsSection}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{creator.products}</span>
                  <span className={styles.statLabel}>products</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{creator.followers}</span>
                  <span className={styles.statLabel}>followers</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{creator.following}</span>
                  <span className={styles.statLabel}>following</span>
                </div>
              </section>

              <div className={styles.productsSection}>
                {creator.productImages.map((image, index) => (
                  <Image key={index} src={image} alt={`Product ${index + 1}`} className={styles.productImage} width={75} height={110} />
                ))}
              </div>

              <section className={styles.buttonsSection}>
                <button className={`${styles.btn} ${styles.btnView}`}>
                  <Image src="/images/curate-purple.svg" alt="curate-icon" width={20} height={20} />
                  <span>View Store</span>
                </button>
                <button className={`${styles.btn} ${styles.btnFollow}`}>
                  <Image src="/images/plus-white.svg" alt="follow-icon" width={20} height={20} />
                  <span>Follow</span>
                </button>
              </section>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

