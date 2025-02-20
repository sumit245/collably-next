"use client"
import stylesShop from '../shop/StyleShop.module.css';
import { useState } from "react";
import Image from "next/image";
import FooterCreator from '../components/FooterCreator'
import styles from "../CreatorHome/Categories.module.css";
import Link from 'next/link'; // Import Link from next/link

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    { name: "Fashion", image: "/images/fashion.jpg", slug: "fashion" },
    { name: "Electronics", image: "/images/electronics.jpg", slug: "electronics" },
    { name: "Beauty", image: "/images/beauty.jpg", slug: "beauty" },
    { name: "Home", image: "/images/home.jpg", slug: "home" },
    { name: "Sports", image: "/images/sports.jpg", slug: "sports" },
    { name: "Food", image: "/images/food.jpg", slug: "food" },
  ]);

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <section className={styles.featuredCreators}>
          <div>
            <h3 className={styles.sectionTitleShop}>All Categories</h3>
            <div className={styles.fImg}>
              {categories.map((category, index) => (
                <Link key={index} href={`/category/${category.slug}`} passHref>
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
        <FooterCreator />
      </div>
    </div>
  );
}
