import Image from 'next/image'
import styles from '../shop/StyleShop.module.css'
import {categories} from '../utils.faker'
export default function ProductCategories() {


  return (
    <section className={styles.productSection}>
      <div className={styles.creator1}>
        {categories.map((category, index) => (
          <div key={index} className={styles.fImg1}>
            <div className={styles.imgBorder1}>
              <Image src={category.image} alt={category.name} width={90} height={90} />
            </div>
            <span className={styles.imgText2}>{category.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

