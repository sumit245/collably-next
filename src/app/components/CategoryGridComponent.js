import React from 'react'
import Image from 'next/image'

export default function CategoryGridComponent() {
  return (
    <section className="container">
      <div className="category-grid">
        <div className="category-card">
          <Image src="/images/animate1.webp" alt="Category 1" width={250} height={400} />
          <div className="category-overlay">
            <h3 className="category-title">Fashion</h3>
          </div>
        </div>
        <div className="category-card">
          <Image src="/images/animate2.webp" alt="Category 2" width={250} height={400} />
          <div className="category-overlay">
            <h3 className="category-title">Beauty</h3>
          </div>
        </div>
        <div className="category-card">
          <Image src="/images/animate1.webp" alt="Category 3" width={250} height={400} />
          <div className="category-overlay">
            <h3 className="category-title">Lifestyle</h3>
          </div>
        </div>
        <div className="category-card">
          <Image src="/images/animate2.webp" alt="Category 4" width={250} height={400} />
          <div className="category-overlay">
            <h3 className="category-title">Tech</h3>
          </div>
        </div>
      </div>
    </section>
  )
}

