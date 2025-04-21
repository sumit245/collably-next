"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreators } from '../store/creatorSlice';
import styles from '../shop/StyleShop.module.css';
import { ArrowRight } from 'lucide-react';

export default function TopCreators() {
  const dispatch = useDispatch();
  const allCreators = useSelector((state) =>  state.creators?.items);
  useEffect(() => {
    dispatch(fetchCreators());
  }, [dispatch]);
  const shuffledCreators = [...(allCreators || [])].sort(() => 0.5 - Math.random());
  const displayCreators = shuffledCreators.slice(0, 4);
  
  return (
    <section className={styles.topCreatorSection}>
      <div className={styles.sectionHeader}>
        <h4 className={styles.sectionTitleShop}>Shop From Top Creators</h4>
        <Link href="/creatorDisplay" className={styles.viewAllLink}>
          View All <ArrowRight className={styles.arrowIcon} />
        </Link>
      </div>
      <div className={styles.creator}>
        {displayCreators.map((creator) => (
          <Link href={`/creator/${creator._id}`} key={creator._id} className={styles.creatorLink}>
            <div className={styles.fImg1}>
              <div className={styles.imgBorder}>
                <Image 
                  src={creator.avatar || "/placeholder.svg"}
                  alt={creator.fullname} 
                  width={85} 
                  height={85} 
                />
              </div>
              <span className={styles.imgText2}>{creator.fullname.split(" ")[0]}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}