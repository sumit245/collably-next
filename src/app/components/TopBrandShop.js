
"use client"

import { useState, useEffect } from "react";
import Image from 'next/image'
import styles from '../shop/StyleShop.module.css'

export default function TopBrands() {
  const [brands, setbrands] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const fetchData = async () => {
      setTimeout(() => {
       
        setbrands([]);
        setIsLoading(false); 
      }, 2000); 
    };
    fetchData();
  }, []);


  return (
    <section className={styles.topBrandsSection}>
      <h4 className={styles.sectionTitleShop}>Shop From Top Brands</h4>

      {brands.length < 1 ? (
        
        <div className={styles.creator}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={styles.skeleton}>
              <div className={styles.skeletonImage}></div>
              <div className={styles.skeletonText}></div>
            </div>
          ))}
        </div>
      ) : (
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
      )}
    </section>
  )
}

