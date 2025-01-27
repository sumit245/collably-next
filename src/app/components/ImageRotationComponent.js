'use client';

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {images} from '../utils.faker'

export default function ImageRotationComponent() {
  const trackRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  useEffect(() => {
    const imageTrack = trackRef.current;
    const totalItems = images.length;
    let index = 0;
    
    const rotateImages = () => {
      const itemWidth = imageTrack?.offsetWidth / 5; 
      const translateX = -(index * itemWidth);
      imageTrack.style.transition = 'transform 0.5s ease';
      imageTrack.style.transform = `translateX(${translateX}px)`;

      index = (index + 1) % totalItems;

      if (index === 0) {
        setTimeout(() => {
          imageTrack.style.transition = 'none';
          imageTrack.style.transform = 'translateX(0)';
        }, 500);
      }
    };

    const startRotation = () => {
      rotateImages();
      setInterval(rotateImages, 3500);
    };

    setTimeout(startRotation, 1000);
  }, [images]);

  return (
    <section className="image-rotation-section">
      <div className="image-rotation-inner">
        <div className="image-container">
          <div className="image-track" ref={trackRef}>
            {images.concat(images).map((src, index) => (
              <div key={index} className="image-item">
                <Image src={src} alt={`Rotation ${index + 1}`} width={200} height={200} />
              </div>
            ))}
          </div>
        </div>
        <Image src="/images/hand.png" alt="Hand" className="hand-item" width={488} height={550} />
      </div>
    </section>
  )
}
