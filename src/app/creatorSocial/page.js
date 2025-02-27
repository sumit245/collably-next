'use client'

import { useState } from 'react'
import { ArrowLeft, Instagram, Youtube } from 'lucide-react'
import styles from './styles.module.css'
import Link from "next/link";
import Image from "next/image";
import stylesShop from '../shop/StyleShop.module.css';


export default function Page() {
  const [formData, setFormData] = useState({
    name: '',
    instagram: '',
    youtube: '',
    telegram: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const filledFieldsCount = Object.values(formData)
    .filter(value => value.trim() !== '')
    .length

  const isButtonActive = filledFieldsCount >= 2

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isButtonActive) {
    }
  }

  return (
    <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <button className={styles.backButton}>
          <Link href="/"> <ArrowLeft /></Link>
          </button>
          <Link href="/">
            <Image className={styles.logo} src="/images/c-official-logo.png" alt="logo" width={220} height={100} />
          </Link>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Enter your social media account</h2>
          <p className={styles.subtitle}>
            Select your primary social media channel that you want to connect with Collably
          </p>

          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name here *"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.socialSection}>
            <h3 className={styles.sectionTitle}>Social Media<span className={styles.required}>*</span></h3>
            <p className={styles.sectionSubtitle}>Enter at least one social media channel</p>

            <div className={styles.inputGroup}>
              <div className={styles.inputWithIcon}>
                <Instagram className={styles.inputIcon} />
                <input
                  type="text"
                  name="instagram"
                  placeholder="Add your Insta handle here"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputWithIcon}>
                <Youtube className={styles.inputIcon} />
                <input
                  type="text"
                  name="youtube"
                  placeholder="Add your Youtube channel here"
                  value={formData.youtube}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputWithIcon}>
               
                <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={styles.inputIcon}
      >
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.43 7.13l-1.84 8.67c-.14.64-.5.8-1.02.5l-2.82-2.08-1.36 1.31c-.15.15-.28.28-.57.28l.2-2.86 5.21-4.71c.23-.2-.05-.31-.35-.12L8.54 12.3 5.77 11.4c-.62-.2-.63-.62.13-.92l11.7-4.51c.52-.19.97.12.83 1.16z" />
      </svg>
                <input
                  type="text"
                  name="telegram"
                  placeholder="Add your Telegram channel here"
                  value={formData.telegram}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
            </div>
          </div>
          <Link href="/CreatorHome" className={styles.verifyLater}>
          <button 
            type="submit" 
            className={`${styles.submitButton} ${isButtonActive ? styles.active : ''}`}
            disabled={!isButtonActive}
          >
            
            Save & Continue
          </button>
          </Link>
        </form>
      </div>
    </main>
    </div>
    </div>
  )
}

