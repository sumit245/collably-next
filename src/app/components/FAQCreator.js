'use client'

import { useState } from 'react'
import styles from '../CreatorAnalytics/stylesanalytics.module.css'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqData = [
    {
      question: "What are Pending Commissions and Confirmed Commissions?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      question: "How is my payout calculated?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      question: "When will my pending orders be confirmed for payout?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      question: "What are potential returns and actual returns?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      question: "What happens to payouts for copied content?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ]

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={styles.containerFaq}>
      <h2 className={styles.titleFaq}>FAQs</h2>
      <div className={styles.faqList}>
        {faqData.map((item, index) => (
          <div 
            key={index} 
            className={styles.faqItem}
            onClick={() => toggleQuestion(index)}
          >
            <div className={styles.questionRow}>
              <h3 className={styles.question}>{item.question}</h3>
              <button 
                className={`${styles.toggleButton} ${openIndex === index ? styles.open : ''}`}
                aria-expanded={openIndex === index}
                aria-controls={`answer-${index}`}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M6 9L12 15L18 9" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div 
              id={`answer-${index}`}
              className={`${styles.answer} ${openIndex === index ? styles.open : ''}`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
