'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {reviewData} from '../utils.faker'


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
            {reviewData.map((review, index) => (
              <div className="review_block" ref={el => reviewBlocks.current[index] = el} key={index}>
                <div className="coustomer_info">
                  <div className="avatar">
                    <Image src={review.avatar} alt={`Avatar ${index + 1}`} width={50} height={50} />
                    <div className="text">
                      <h3>{review.name}</h3>
                      <span>{review.role}</span>
                    </div>
                  </div>
                  <div className="star2">
                    {Array.from({ length: review.rating }).map((_, starIndex) => (
                      <span key={starIndex}>⭐</span>
                    ))}
                  </div>
                </div>
                <p>"{review.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
