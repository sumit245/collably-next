import Image from "next/image"
import styles from "../brand/page.module.css"

const AffiliateFeatures = () => {
  return (
    <section className={styles.brand_features_section}>
      <div className={styles.brand_container}>
        <h2 className={styles.brand_heading}>Empowering Brands with Custom solutions</h2>

        <div className={styles.brand_features_grid}>
          {/* Custom Affiliate Program Feature */}
          <div className={styles.brand_feature_card}>
            <div className={styles.brand_feature_content}>
              <h3 className={styles.brand_feature_title}>Custom affiliate program</h3>
              <p className={styles.brand_feature_description}>Create your own custom affiliate programs for creators</p>
            </div>
            <div className={styles.brand_feature_image_container}>
              <Image
                src="/images/bannerScreen2.png"
                alt="Brand dashboard affiliate program setup screen"
                width={400}
                height={300}
                className={styles.brand_feature_image}
              />
              {/* <div className={styles.brand_image_caption}>Brand dashboard affiliate program setup screen</div> */}
            </div>
          </div>

          {/* Performance-Based Model Feature */}
          <div className={styles.brand_feature_card}>
            <div className={styles.brand_feature_content}>
              <h3 className={styles.brand_feature_title}>Performance-Based Model</h3>
              <p className={styles.brand_feature_description}>Pay only when creators drive sales!</p>
            </div>
            <div className={styles.brand_feature_image_container}>
              <Image
                src="/images/bannerScreen2.png"
                alt="Commission screen"
                width={400}
                height={300}
                className={styles.brand_feature_image}
              />
              {/* <div className={styles.brand_image_caption}>Commission screen</div> */}
            </div>
          </div>

          {/* Shoppable Content Feature */}
          <div className={styles.brand_feature_card}>
            <div className={styles.brand_feature_content}>
              <h3 className={styles.brand_feature_title}>Shoppable Content Feature</h3>
              <p className={styles.brand_feature_description}>Turn influencer posts into direct sales channels</p>
            </div>
            <div className={styles.brand_feature_image_container}>
              <Image
                src="/images/bannerScreen2.png"
                alt="Reel layout with tagged products screen"
                width={400}
                height={300}
                className={styles.brand_feature_image}
              />
              {/* <div className={styles.brand_image_caption}>Reel layout with tagged products screen</div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AffiliateFeatures

