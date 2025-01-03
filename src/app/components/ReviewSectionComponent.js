'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ReviewSectionComponent() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const reviewBlocks = React.useRef([]);

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  function activateNextReview() {
    if (currentReviewIndex < reviewBlocks.current.length - 1) {
      setCurrentReviewIndex(prevIndex => prevIndex + 1); 
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          reviewBlocks.current.forEach((review, index) => {
            if (isInViewport(review) && index === currentReviewIndex) {
              review.classList.add('active');
              activateNextReview(); 
            }
          });
          setIsScrolling(false);
        });
        setIsScrolling(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentReviewIndex, isScrolling]);

  return (
    <section className="review_section">
      <div className="container7">
        <div className="row2">
          <div className="col-left">
            <div className="title_badge">Testimonials</div>
            <div className="section_title2">
              <h2>What Our <span>Creators</span> Say</h2>
            </div>
            <div className="google_rating">
              <div className="star2">
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
              </div>
              <p>
                <strong>4.9</strong> out of 5 based on <strong>3,000+</strong> reviews
              </p>
            </div>
            <div className="user_review">
              <Link href="#" className="review-link">Read all reviews</Link>
            </div>
            <div className="smiley_icon">
              <Image src="/images/smily (1).png" alt="Smiley" width={100} height={100} />
            </div>
          </div>

          <div className="col-right">
           
            <div className="review_block" ref={el => reviewBlocks.current[0] = el}>
              <div className="coustomer_info">
                <div className="avatar">
                  <Image src="/images/banavt1.png" alt="Avatar 1" width={50} height={50} />
                  <div className="text">
                    <h3>John Doe</h3>
                    <span>Fashion Influencer</span>
                  </div>
                </div>
                <div className="star2">
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                </div>
              </div>
              <p>"Collably has revolutionized the way I collaborate with brands. It's user-friendly and efficient!"</p>
            </div>

            <div className="review_block" ref={el => reviewBlocks.current[1] = el}>
              <div className="coustomer_info">
                <div className="avatar">
                  <Image src="/images/banavt2.png" alt="Avatar 2" width={50} height={50} />
                  <div className="text">
                    <h3>Jane Smith</h3>
                    <span>Beauty Vlogger</span>
                  </div>
                </div>
                <div className="star2">
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                </div>
              </div>
              <p>"The affiliate link feature has significantly boosted my earnings. Highly recommended for all creators!"</p>
            </div>

            <div className="review_block" ref={el => reviewBlocks.current[2] = el}>
              <div className="coustomer_info">
                <div className="avatar">
                  <Image src="/images/banavt3.png" alt="Avatar 3" width={50} height={50} />
                  <div className="text">
                    <h3>Maria</h3>
                    <span>Company Inc</span>
                  </div>
                </div>
                <div className="star2">
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                </div>
              </div>
              <p>"The affiliate link feature has significantly boosted my earnings. Highly recommended for all creators!"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
