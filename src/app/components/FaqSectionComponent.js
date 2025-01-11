'use client'

import React, { useState } from 'react'
import {faqs} from '../utils.faker'

export default function FAQSectionComponent() {
  const [activeIndex, setActiveIndex] = useState(null)

  

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="faq-section">
      <div className="container3">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div className="dropdown" key={index}>
            <button className="flx" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="arrow">{activeIndex === index ? '▲' : '▼'}</span>
            </button>
            <div 
              className="dropdown-content" 
              style={{ 
                maxHeight: activeIndex === index ? '1000px' : '0',
                opacity: activeIndex === index ? '1' : '0'
              }}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

