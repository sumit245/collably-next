"use client"

import { useState, useEffect } from "react";
import Image from 'next/image'
import styles from '../shop/StyleShop.module.css'

export default function ProductCategories() {
   const [categories, setCategories] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    
      const fetchData = async () => {
        setTimeout(() => {
         
          setCategories([]);
          setIsLoading(false); 
        }, 2000); 
      };
      fetchData();
    }, []);


  return (
    <section className={styles.productSection}>
        {categories.length < 1 ? (
        
        <div className={styles.creator}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className={styles.skeleton}>
              <div className={styles.skeletonImage}></div>
              <div className={styles.skeletonText}></div>
            </div>
          ))}
        </div>
      ) : (
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
    )}
    </section>
  )
}