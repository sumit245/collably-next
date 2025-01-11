'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {items} from '../utils.faker'

export default function KeyFeaturesComponent() {
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWidth = 200;
 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= items.length) {
          return 0;
        }
        return nextIndex;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [items.length]);

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
          <span className="title_badge">Key Features</span>
          <h2>Empowering Creators with <span>Innovative Tools</span></h2>
        </div>
        <div className="feature_slider">
          <div className="feature_track" ref={trackRef}>
            {items.concat(items).map((item, index) => (
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
