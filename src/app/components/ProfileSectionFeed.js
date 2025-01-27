import Image from 'next/image'

export default function ProfileSection({ styles }) {
  return (
    <section className={styles.profileSection1}>
      <div className={styles.profileHeading}>
        <div className={styles.profileName1}>
          <div className={styles.imageBorder}>
            <Image src="/images/image31.jpg" alt="Profile" width={35} height={35} />
          </div>
          <span className={styles.name}>tmselvam_redesyn</span>
        </div>
        <button className={styles.followBtn}>
          <Image src="/images/add.svg" alt="Add" width={16} height={16} />
          Follow
        </button>
      </div>
      <div className={styles.profileContent}>
        <video
          className={styles.content}
          poster="/images/poster.jpeg"
          autoPlay
          muted
          loop
        >
          <source src="/images/main.mp4" type="video/mp4" />
        </video>
        <div className={styles.brandCardContainer}>
          <div className={styles.brandCardContainer1}>
            <div className={styles.brandCardContainer2}>
              <div className={styles.brandCardContainer3}>
                <div className={styles.brandCardImg}>
                  <Image src="/images/poster.jpg" alt="Brand" layout="fill" objectFit="cover" />
                </div>
                <div className={styles.brandCard}>
                  <div className={styles.brandHeading}>Nykaa Fashion</div>
                  <div className={styles.brandSubHeading}>
                    Twenty Dresses by Nykaa Fashion
                  </div>
                  <div className={styles.priceDetails}>
                    <div className={styles.brandPrice}>
                      <span className={styles.price}>₹ 4295.0,</span>
                      <span className={styles.realPrice}>₹ 4395.0</span>
                      <span className={styles.brandOffer}>2% OFF</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.cardContainer1}>
            <div className={styles.iconCircle}>
              <Image src="/images/shop-purple.svg" alt="shop" width={20} height={20} />
            </div>
            <div className={styles.cardText}>View all</div>
          </div>
        </div>
      </div>
      <div className={styles.icon1}>
        <div className={styles.icon1Container}>
          <div className={styles.icon1Img}>
            <Image src="/images/wishlist-pink.svg" alt="Wishlist" width={24} height={24} />
            <span>2</span>
          </div>
          <Image src="/images/arrow-purple.svg" alt="Arrow" width={24} height={24} />
        </div>
        <div className={styles.eleven}>
          <Image src="/images/save-inactive.svg" alt="Save" width={24} height={24} />
        </div>
      </div>
      <section className={styles.cardCaption}>
        <div className={styles.fourten}>
          <p>
            <span className={styles.name}>tmselvam_redesyn</span>
            This co-ord set is elegant and will create a
            <span>...</span>
            <span className={styles.captionTxt}>statement in the crowd. Try it out and share your feedback.</span>
            <span>more</span>
          </p>
        </div>
      </section>
    </section>
  )
}
