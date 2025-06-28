"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from 'lucide-react';
import { fetchCreators } from "../store/creatorSlice";
import Header from "../components/HeaderShop";
import Footer from "../components/FooterShop";
import styles from "./page.module.css";
import styleshop from "../shop/StyleShop.module.css";
import Image from "next/image";
import Link from "next/link";

export default function AllCreators() {
  const dispatch = useDispatch();
  const allCreators = useSelector((state) =>  state.creators?.items);
  
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCreators());
  }, [dispatch]);

  const filteredCreators = (allCreators || []).filter((creator) =>
    creator.fullname?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className={styleshop.bodyShop}>
      <div className={styleshop.smartphoneContainer}>
        <Header />
        <div className={styles.creatorsPage}>
          <div className={styles.creatorsHeader}>
            <h1 className={styles.creatorsTitle}>All Creators</h1>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search creators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>
          {filteredCreators.length === 0 ? (
            <div className={styles.noCreatorsCard}>
              <p className={styles.noCreators}>No creators found</p>
            </div>
          ) : (
            <div className={styles.creatorsGrid}>
              {filteredCreators.map((creator) => (
                <Link href={`/creator/${creator._id}`} key={creator._id} className={styles.creatorCard}>
                  <div className={styles.creatorAvatar}>
                    {creator.avatar ? (
  <Image
    src={creator.avatar}
    alt={creator.fullname}
    width={85}
    height={85}
    className={styles.creatorImage}
  />
) : (
  <div className={styleshop.initialsPlaceholder}>
    {creator.fullname
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()}
  </div>
)}

                  </div>
                  <h2 className={styles.creatorName}>{creator.fullname}</h2>
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