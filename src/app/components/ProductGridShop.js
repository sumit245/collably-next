import Image from 'next/image'
import styles from '../shop/StyleShop.module.css'
import {products} from '../utils.faker'

export default function ProductGrid() {
  
 

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

