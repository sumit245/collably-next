import Image from 'next/image'
import styles from '../shop/StyleShop.module.css'
export default function TopCreators() {
  const creators = [
    { name: 'Navita', image: '/images/image29.webp' },
    { name: 'Komal', image: '/images/image25.jpeg' },
    { name: 'Dua', image: '/images/image24.webp' },
    { name: 'Arya', image: '/images/image26.webp' },
  ]

  return (
    <section className={styles.topCreatorSection}>
      <h4 className={styles.sectionTitleShop}>Shop From Top Creators</h4>
      <div className={styles.creator}>
        {creators.map((creator, index) => (
          <div key={index} className={styles.fImg1}>
            <div className={styles.imgBorder}>
              <Image src={creator.image} alt={creator.name} width={85} height={85} />
            </div>
            <span className={styles.imgText2}>{creator.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
