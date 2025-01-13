import Image from 'next/image'
import styles from '../shop/StyleShop.module.css'
import {brands} from '../utils.faker'
export default function TopBrands() {


  return (
    <section className={styles.topBrandsSection}>
      <h4 className={styles.sectionTitleShop}>Shop From Top Brands</h4>
      <div className={styles.creator}>
        {brands.map((brand, index) => (
          <div key={index} className={styles.fImg1}>
            <div className={styles.imgBorder}>
              <Image src={brand.image} alt={brand.name} width={85} height={85} />
            </div>
            <span className={styles.imgText2}>{brand.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

