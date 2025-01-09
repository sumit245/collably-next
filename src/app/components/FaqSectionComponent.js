'use client'

import React, { useState } from 'react'

export default function FAQSectionComponent() {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      question: "How does Collably work?",
      answer: "Collably is a platform that connects creators with brands for collaborations, provides tools for affiliate marketing, and offers studio booking services. Simply sign up, complete your profile, and start exploring opportunities."
    },
    {
      question: "Is Collably free to use?",
      answer: "Collably offers both free and premium plans. The basic features are free, while advanced tools and priority access to opportunities are available in our premium plans."
    },
    {
      question: "How do I get paid for collaborations?",
      answer: "Payments for collaborations are handled securely through our platform. Once a collaboration is completed and approved, the agreed amount is transferred to your linked bank account."
    },
    {
      question: "Can I use Collably if I'm just starting as a creator?",
      answer: "Collably is designed for creators at all levels. We have resources and opportunities suitable for beginners as well as established creators."
    }
  ]

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

