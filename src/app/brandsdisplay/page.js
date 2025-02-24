// app/brands/page.js
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from 'lucide-react';
import { fetchBrands } from "../store/brandSlice";
import Header from "../components/HeaderShop";
import Footer from "../components/FooterShop";
import styles from "./page.module.css";
import styleshop from "../shop/StyleShop.module.css";
import Image from "next/image";
import Link from "next/link";

export default function AllBrands() {

    const changeEscapeChar = (path) => {
        if (!path) return ""
        return path.replace(/\\/g, "/")
      }
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/"
  const dispatch = useDispatch();
  const allBrands = useSelector((state) => state.brands.items);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const filteredBrands = allBrands.filter((brand) =>
    brand.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styleshop.bodyShop}>
      <div className={styleshop.smartphoneContainer}>
        <Header />
        <div className={styles.brandsPage}>
          <div className={styles.brandsHeader}>
            <h1 className={styles.brandsTitle}>All Brands</h1>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>
          {filteredBrands.length === 0 ? (
            <div className={styles.noBrandsCard}>
              <p className={styles.noBrands}>No brands found</p>
            </div>
          ) : (
            <div className={styles.brandsGrid}>
              {filteredBrands.map((brand) => (
                <Link href={brand.brandWebsite} key={brand._id} className={styles.brandCard}>
                  <div className={styles.brandLogo}>
                    <Image 
                      src={`${BASE_URL}${changeEscapeChar(brand.brandLogo)}`} 
                      alt={brand.brandName} 
                      width={100} 
                      height={100} 
                    />
                  </div>
                  <h2 className={styles.brandName}>{brand.brandName}</h2>
                </Link>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}