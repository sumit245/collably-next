'use client';

import React, { useEffect, useRef } from 'react';

export default function ScrollerComponent({ scrollerData }) {
  const brandListRef = useRef(null);

  useEffect(() => {
    const brandList = brandListRef.current;
    if (!brandList) return;

    // Clone the original brand list items
    const brandListItems = [...brandList.children];
    brandListItems.forEach((item) => {
      const clone = item.cloneNode(true);
      brandList.appendChild(clone);
    });

    let scrollPosition = 0;
    let animationFrameId;
    let scrollCount = 0;

    function moveLogos() {
      scrollPosition -= 1;

      // Define scroll steps
      const scrollSteps = [-200, -400, -600];

      // Check if scrollPosition matches any step
      const nextStep = scrollSteps.find(step => scrollPosition <= step);
      if (nextStep !== undefined) {
        brandList.style.transform = `translateX(${nextStep}px)`;
      }

      if (Math.abs(scrollPosition) >= brandList.scrollWidth / 2) {
        scrollPosition = 0;
        scrollCount += 1;
        if (scrollCount >= 4) {
          cancelAnimationFrame(animationFrameId);
          return;
        }
      }

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
        className={scrollerData.starImage.className}
        src={scrollerData.starImage.src}
        alt={scrollerData.starImage.alt}
      />
      <div className="scroller-heading">
        <span>{scrollerData.text}</span>
      </div>
      <div className="scroller section-wrapper">
        <div className="scroller">
          <ul className="brand-list" ref={brandListRef}>
            {scrollerData.brandList.map((item, index) => (
              <li
                key={index}
                className={item.isDot ? '' : 'brand-logo'}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
