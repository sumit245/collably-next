
"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../store/brandSlice';
import styles from '../shop/StyleShop.module.css';
import { ArrowRight } from 'lucide-react';

export default function TopBrands() {
  const changeEscapeChar = (path) => {
    if (!path) return ""
    return path.replace(/\\/g, "/")
  }
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/"
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brands.items);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const displayBrands = brands.slice(0, 4);

  return (
    <section className={styles.topBrandsSection}>
      <div className={styles.sectionHeader}>
        <h4 className={styles.sectionTitleShop}>Shop From Top Brands</h4>
        <Link href="/brandsdisplay" className={styles.viewAllLink}>
          View All <ArrowRight className={styles.arrowIcon} />
        </Link>
      </div>
      <div className={styles.creator}>
        {displayBrands.map((brand) => (
          <Link href={brand.brandWebsite} key={brand._id} className={styles.brandLink}>
            <div className={styles.fImg1}>
              <div className={styles.imgBorder}>
                <Image 
                src={`${BASE_URL}${changeEscapeChar(brand.brandLogo)}`}
                  // src={brand.brandLogo || '/placeholder.svg'} 
                  alt={brand.brandName} 
                  width={85} 
                  height={85} 
                />
              </div>
              <span className={styles.imgText2}>{brand.brandName}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}