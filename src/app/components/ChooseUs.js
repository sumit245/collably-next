import React from 'react';
import styles from '../brand/choose.module.css';

const MoreReasons = () => {
  return (
    <section className={styles.moreReasons}>
      <div className={styles.container}>
        <h2>Why Choose Us?</h2>
        <div className={styles.reasons}>
          <div className={styles.reason}>
            <div className={styles.icon}>🎨</div>
            <h3>Find the Best Creators</h3>
            <p>We connect you with top talent to create impactful content that resonates with your audience.</p>
          </div>
          <div className={styles.reason}>
            <div className={styles.icon}>📈</div>
            <h3>More Visibility</h3>
            <p>Boost your brand's presence with our proven strategies, reaching the right audience at the right time.</p>
          </div>
          <div className={styles.reason}>
            <div className={styles.icon}>⚡</div>
            <h3>Higher Conversions</h3>
            <p>Our platform is designed to maximize engagement and conversion, helping you achieve your business goals faster.</p>
          </div>
          <div className={styles.reason}>
            <div className={styles.icon}>💰</div>
            <h3>No High Ad Spend</h3>
            <p>Save on advertising costs while increasing your returns by leveraging organic and authentic marketing strategies.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoreReasons;
