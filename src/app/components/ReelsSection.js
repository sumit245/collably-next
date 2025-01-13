import CreatorCard from './Cards/CreatorCard';
import styles from '../shop/StyleShop.module.css';

export default function ReelsSection({ creators, sectionTitle }) {
  return (
    <section className={styles.creatorSection}>
      <h4 className={styles.sectionTitleShop}>{sectionTitle}</h4>
      <div className={styles.creatorScroll}>
        {creators.map((creator) => (
          <CreatorCard key={creator.id} {...creator} />
        ))}
      </div>
    </section>
  );
}
