import Image from 'next/image'
import styles from '../shop/StyleShop.module.css'

export default function TrendingBrands() {
  const creators = [
    { name: 'BareBasix', image: '/images/image21.webp' },
    { name: 'Printopia', image: '/images/image22.webp' },
    { name: 'Sukhbir', image: '/images/image23.webp' },
    { name: 'The makeup Co.', image: '/images/image24.webp' },
    { name: 'Starchild By Krissann Barretto', image: '/images/image25.jpeg' },
    { name: 'Shyamalihazarika', image: '/images/image26.webp' },
    { name: 'Urban Nommad', image: '/images/image27.webp' },
    { name: 'Mayavi Doodle', image: '/images/image28.webp' },
    { name: 'Neha Diwan', image: '/images/image29.webp' },
  ]

  return (
    <section className={styles.featuredCreators}>
      <div className={styles.fText}>
        <h3 className={styles.sectionTitleShop}>Trending Brands</h3>
        <a className={styles.viewLink} href="#">
          view all <span><Image src="/images/arrow.svg" alt="" width={24} height={24} /></span>
        </a>
      </div>
      <div className={styles.fImg}>
        {creators.map((creator, index) => (
          <div key={index} className={styles.fImg1}>
            <Image src={creator.image} alt={creator.name} width={100} height={100} />
            <span className={styles.imgText}>{creator.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

