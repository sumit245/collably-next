import React from 'react';
import Image from 'next/image';

export default function ClientSectionComponent({ images = [] }) {  // Defaulting to an empty array
  return (
    <section className="client-section">
      <div className="container5">
        <div className="section-title">
          <h2>Trusted by <span className="highlight">Top Brands</span></h2>
        </div>
        <div className="client-grid">
          {images.length > 0 ? (
            images.map((logo, index) => (
              <div className="client-logo" key={index}>
                <Image src={logo.src} alt={logo.alt} width={120} height={60} />
              </div>
            ))
          ) : (
            <p>No client logos available.</p>  // Optional: Message to display if no images
          )}
        </div>
      </div>
    </section>
  );
}
