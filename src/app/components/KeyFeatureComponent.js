'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function KeyFeaturesComponent({ items = {} }) {
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWidth = 200;

  const features = items.features || [];

  useEffect(() => {
    if (features.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [features.length]);

  useEffect(() => {
    if (trackRef.current) {
      const translateX = -currentIndex * itemWidth;
      trackRef.current.style.transition = 'transform 0.5s ease';
      trackRef.current.style.transform = `translateX(${translateX}px)`;
    }
  }, [currentIndex]);

  return (
    <section className="key_inner">
      <div className="container2">
        <div className="section_title">
          <span className="title_badge">{items?.titleBadge || 'Key Features'}</span>
          <h2>
            {items?.mainTitle || 'Empowering Creators with'}{' '}
            <span>{items?.highlightedText || 'Innovative Tools'}</span>
          </h2>
        </div>
        <div className="feature_slider">
          <div className="feature_track" ref={trackRef}>
            {features.concat(features).map((item, index) => (
              <div className="feature_item" key={index}>
                <div className="feature_box">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="img">
                    <Image src={item.image} alt={item.title} width={200} height={200} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}