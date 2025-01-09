'use client'

import React, { useEffect, useRef } from 'react';

export default function ScrollerComponent({ text = "Why Choose Our App?" }) {
  const brandListRef = useRef(null);

  useEffect(() => {
    const brandList = brandListRef.current;
    if (!brandList) return;

    brandList.innerHTML += brandList.innerHTML;

    let scrollPosition = 0;
    let animationFrameId;

    function moveLogos() {
      scrollPosition -= 1;
      if (Math.abs(scrollPosition) >= brandList.scrollWidth / 2) {
        scrollPosition = 0;
      }
      brandList.style.transform = `translateX(${scrollPosition}px)`;
      animationFrameId = requestAnimationFrame(moveLogos);
    }

    moveLogos();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      <img
        className="star absolute top-0 left-1/2 transform -translate-x-1/2"
        src="/images/bigstar_dark.png"
        alt="Star"
      />
      <div className="scroller-heading">
        <span>{text}</span>
      </div>
      <div className="scroller section-wrapper">
        <div className="scroller">
          <ul className="brand-list" ref={brandListRef}>
            <li className="brand-logo">Multiple Campaigns</li>
            <li>●</li>
            <li className="brand-logo">Top Brands & Deals</li>
            <li>●</li>
            <li className="brand-logo">User-Friendly</li>
            <li>●</li>
            <li className="brand-logo">24/7 Support</li>
            <li>●</li>
            <li className="brand-logo">Real-time tracking</li>
            <li>●</li>
            <li className="brand-logo">Easy withdrawals</li>
            <li>●</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

