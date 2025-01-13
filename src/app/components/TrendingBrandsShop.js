import Image from 'next/image'
import styles from '../shop/StyleShop.module.css'
import {TopBrands} from '../utils.faker'

export default function TrendingBrands() {


  return (
    <section className={styles.featuredCreators}>
      <div className={styles.fText}>
        <h3 className={styles.sectionTitleShop}>Trending Brands</h3>
        <a className={styles.viewLink} href="#">
          view all <span><Image src="/images/arrow.svg" alt="" width={24} height={24} /></span>
        </a>
      </div>
      <div className={styles.fImg}>
        {TopBrands.map((creator, index) => (
          <div key={index} className={styles.fImg1}>
            <Image src={creator.image} alt={creator.name} width={100} height={100} />
            <span className={styles.imgText}>{creator.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

