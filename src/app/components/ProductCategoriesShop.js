import Image from 'next/image'
import styles from '../shop/StyleShop.module.css'
export default function ProductCategories() {
  const categories = [
    { name: 'Dresses', image: '/images/dress.jpeg' },
    { name: 'Dupatta', image: '/images/dupatta.jpeg' },
    { name: 'Shirts', image: '/images/shirt.jpeg' },
    { name: 'Sarees', image: '/images/saree.jpeg' },
    { name: 'Earrings', image: '/images/earing.jpeg' },
    { name: 'Bracelet', image: '/images/bracelet.jpeg' },
    { name: 'Rings', image: '/images/ring.jpeg' },
    { name: 'Necklace', image: '/images/necklace.jpeg' },
  ]

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

