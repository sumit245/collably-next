import React from 'react';
import Image from 'next/image';
import {categoryData} from '../utils.faker'



export default function CategoryGridComponent() {
  return (
    <section className="container">
      <div className="category-grid">
        {categoryData.map((category, index) => (
          <div className="category-card" key={index}>
            <Image src={category.src} alt={category.alt} width={250} height={400} />
            <div className="category-overlay">
              <h3 className="category-title">{category.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
