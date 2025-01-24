"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../shop/StyleShop.module.css";

export default function TopCreators() {
  const [creators, setCreators] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const fetchData = async () => {
      setTimeout(() => {
       
        setCreators([]);
        setIsLoading(false); 
      }, 2000); 
    };
    fetchData();
  }, []);

  return (
    <section className={styles.topCreatorSection}>
      <h4 className={styles.sectionTitleShop}>Shop From Top Creators</h4>
      {creators.length < 1 ? (
        
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
          {creators.map((creator, index) => (
            <div key={index} className={styles.fImg1}>
              <div className={styles.imgBorder}>
                <Image src={creator.image} alt={creator.name} width={85} height={85} />
              </div>
              <span className={styles.imgText2}>{creator.name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
