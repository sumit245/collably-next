'use client'

import Image from 'next/image'
import styles from '../CreatorHome/stylescreator.module.css'
import { Clock, ArrowRight } from 'lucide-react'

const FINDS_DATA = [
  {
    id: 1,
    title: 'Trendy Winter Wear on Sale',
    image: '/images/creator-product-1.jpg',
    imageIcon: '/images/myntra-logo-small.png',
    products: 60,
    uploadDate: '17 Dec'
  },
  {
    id: 2,
    title: 'End of Season Sale Finds',
    image: '/images/creator-product-2.webp',
    imageIcon: '/images/savana_icon.png',
    products: 59,
    uploadDate: '03 Mar'
  },
  {
    id: 3,
    title: 'Trendy Winter Wear on Sale',
    image: '/images/creator-product-3.webp',
    imageIcon: '/images/flipkart-icon.png',
    products: 60,
    uploadDate: '10 Feb'
  },
  {
    id: 4,
    title: 'End of Season Sale Finds',
    image: '/images/creator-product-4.avif',
    imageIcon: '/images/nykaa_icon.png',
    products: 59,
    uploadDate: '07 Jan'
  }
]

export default function FindsOfTheDay() {
  return (
    <div className={styles.containerFind}>
      <div className={styles.headerFind}>
        <h2 className={styles.titleFind}>FINDS OF THE DAY</h2>
        <a href="#" className={styles.seeMoreFind}>See More</a>
      </div>
      
      <div className={styles.gridFind}>
        {FINDS_DATA.map(find => (
          <div key={find.id} className={styles.cardFind}>
            <div className={styles.cardTopFind}>
              <div className={styles.timestampFind}>
                <Clock size={12} />
                <span>Uploaded on {find.uploadDate}</span>
              </div>
            </div>
            
            <div className={styles.imageContainerFind}>
              <Image
                src={find.image}
                alt={find.title}
                fill
                className={styles.imageFind}
              />
              
            </div>
            <div className={styles.imageContainerFindIcon}>
              <Image
                src={find.imageIcon}
                alt={find.title}
                fill
                className={styles.imageFindIcon}
              />
              
            </div>
            <div className={styles.contentFind}>
              <h3 className={styles.cardTitleFind}>{find.title}</h3>
              <p className={styles.productsFind}>{find.products} Products</p>
              <button className={styles.exploreButtonFind}>
                Explore
                <ArrowRight size={16} className={styles.arrowIconFind} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

