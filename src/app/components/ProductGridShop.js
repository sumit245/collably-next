"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../shop/StyleShop.module.css";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setProducts([]);
        setIsLoading(false);
      }, 2000);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.productGrid}>
      {products.length < 1 ? (
        <div className={styles.fImg}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={styles}>
              <div className={styles.skeletonImage3}></div>
              <div className={styles.skeletonText3}></div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {products.map((product, index) => (
            <div key={index} className={`product-card ${product.color}`}>
              <Image
                className={styles.productCardImage}
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
