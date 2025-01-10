import Image from 'next/image'
import styles from '../shop/StyleShop.module.css'

export default function ProductGrid() {
  
  const products = [
    { name: 'Kurta Collection', image: '/images/image9.webp', color: 'pink' },
    { name: 'Dresses Collection', image: '/images/image10.webp', color: 'purple' },
    { name: 'T-Shirt Collection', image: '/images/image11.webp', color: 'blue' },
    { name: 'Bottom Wear Collection', image: '/images/image12.webp', color: 'cyan' },
  ]

  return (
    <div className={styles.productGrid}>
      {products.map((product, index) => (
        <div key={index} className={`product-card ${product.color}`}>
          <Image className={styles.productCardImage} src={product.image} alt={product.name} width={200} height={200} />
        </div>
      ))}
    </div>
  )
}

