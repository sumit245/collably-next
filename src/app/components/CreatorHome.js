'use client'

import { Bell, Headphones, Menu, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../CreatorHome/stylescreator.module.css'


export default function CreatorHome() {
  const steps = [
    {
      id: 1,
      title: 'Connect Social Media',
      description: 'Required to create Wishlinks',
      icon: '/clipboard-icon.svg',
      isActive: true
    },
    {
      id: 2,
      title: 'Create Your first Wishlink',
      description: 'Get your unique commissionable links.',
      isActive: false
    },
    {
      id: 3,
      title: 'Share Wishlinks & Earn',
      description: 'Share on your stories, chats & description box to earn',
      isActive: false
    },
    {
      id: 4,
      title: 'Activate Engage',
      description: 'Automated DMs for your IG content',
      isActive: false
    }
  ]

  return (
    <div >
      <header className={styles.header}>
        
        <div className={styles.userInfo}>
        <button className={styles.menuButton}>
          <Menu size={24} color="white" />
        </button>
        
          <Image
            src="/images/banavt1.png"
            alt="User avatar"
            width={40}
            height={40}
            className={styles.avatar}
          />
          <div className={styles.userText}>
            <span className={styles.greeting}>Hello</span>
            <span className={styles.username}>dheeraj861</span>
          </div>
        </div>

        <div className={styles.headerIcons}>
          <button className={styles.iconButton}>
            <Bell size={24} color="white" />
          </button>
          <button className={styles.iconButton}>
            <Headphones size={24} color="white" />
          </button>
        </div>
      </header>
      <div className={styles.heroContainer}>
        <div className={styles.stepsContainer}>
          {steps.map((step) => (
            <div key={step.id} className={`${styles.step} ${step.isActive ? styles.active : ''}`}>
              {step.icon && (
                <Image
                  src='/images/waitlist-icon.png'
                  alt=""
                  width={24}
                  height={24}
                  className={styles.stepIcon}
                />
              )}
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
              {step.isActive && (
                <div className={styles.activeIndicator}>
                                 <Image
                  src='/images/arrow-right-red-circle.svg'
                  alt=""
                  width={24}
                  height={24}
                  className={styles.stepIcon}
                />
                </div>
              )}
            </div>
          ))}
        </div>
        </div>
    </div>
  )
}

