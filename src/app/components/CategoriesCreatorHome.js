"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link from next/link
import styles from "../CreatorHome/Categories.module.css";

export default function FeaturedCategories() {
  const [categories, setCategories] = useState([
    { name: "Fashion", image: "/images/Fashion.jpg", slug: "fashion" },
    { name: "Electronics", image: "/images/Electronics.jpg", slug: "electronics" },
    { name: "Beauty", image: "/images/Beauty.jpg", slug: "beauty" },
    { name: "Home", image: "/images/Home.jpg", slug: "home" },
    { name: "Sports", image: "/images/Sports.jpg", slug: "sports" },
    { name: "Food", image: "/images/Food.jpg", slug: "food" },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setIsLoading(false); // Simulate loading time
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
              <a className={styles.viewLink} href="/category">
                View All → 
              </a>
            )}
          </div>
        <div className={styles.fImg}>
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}> {/* Wrap in Link */}
              <div className={styles.fImg1}>
                <Image
                  src={category.image}
                  alt={category.name}
                  width={100}
                  height={100}
                />
                <span className={styles.imgText}>{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
