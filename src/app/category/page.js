"use client"
import stylesShop from '../shop/StyleShop.module.css';
import { useState, useEffect } from "react";
import Image from "next/image";
import FooterCreator from '../components/FooterCreator'
import styles from "../CreatorHome/Categories.module.css";


export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    { name: "Fashion", image: "/images/fashion.jpg" },
    { name: "Electronics", image: "/images/electronics.jpg" },
    { name: "Beauty", image: "/images/beauty.jpg" },
    { name: "Home", image: "/images/home.jpg" },
    { name: "Sports", image: "/images/sports.jpg" },
    { name: "Food", image: "/images/food.jpg" },
  ]);

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}> {/* Fixing the missing bracket */}
        <section className={styles.featuredCreators}>
          <div>
            <h3 className={styles.sectionTitleShop}>All Categories</h3>
            <div className={styles.fImg}>
              {categories.map((category, index) => (
                <div key={index} className={styles.fImg1}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={100}
                    height={100}
                  />
                  <span className={styles.imgText}>{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <FooterCreator />
      </div>
    </div>
  );
}
