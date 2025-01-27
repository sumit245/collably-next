import Image from "next/image"
import styles from "./page.module.css"

const ProductDetails = ({ product }) => {
  return (
    <div className={styles.productDetails}>
        <div className={styles.prodimageandnames}>
            <div>
      <h2 className={styles.productName}>{product.productname}</h2>
      <p className={styles.productDescription}>Description : {product.description}</p>
      <div className={styles.productInfo}>
        <p className={styles.productPrice}>Price: ${product.price}</p>
        {product.quantity && <p className={styles.productPrice}>In Stock: {product.quantity}</p>}
      </div>
      </div>
     
        <Image
          src={product.image || "/images/banavt1.png"}
          alt={product.productname}
          width={200}
          height={200}
          className={styles.productImage}
        />
      </div>
      
    </div>
  )
}

export default ProductDetails

