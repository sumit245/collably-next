"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../CreatorHome/Categories.module.css";

export default function FeaturedCategories() {
  const [categories, setCategories] = useState([
    { name: "Fashion", image: "/images/fashion.png" },
    { name: "Electronics", image: "/images/electronics.png" },
    { name: "Beauty", image: "/images/beauty.png" },
    { name: "Home", image: "/images/home.png" },
    { name: "Sports", image: "/images/sports.jpeg" },
    { name: "Food", image: "/images/food.jpeg" },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };
    fetchData();
  }, []);

  return (
    <section className={styles.featuredCreators}>
      <div>
        <div className={styles.fText}>
          <h3 className={styles.sectionTitleShop}>Categories</h3>

          {isLoading ? (
            <div className={styles.fImg}>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={styles.skeleton}>
                  <div className={styles.skeletonImage}></div>
                  <div className={styles.skeletonText}></div>
                </div>
              ))}
            </div>
          ) : (
            <Link className={styles.viewLink} href="/category">
            
            </Link>
          )}
        </div>
        <div className={styles.fImg}>
          {categories.map((category, index) => (
            <Link 
              key={index} 
              href={`/products/${category.name.toLowerCase()}`} 
              className={styles.fImg1}
            >
              <Image
                src={category.image}
                alt={category.name}
                width={100}
                height={100}
              />
              <span className={styles.imgText}>{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
