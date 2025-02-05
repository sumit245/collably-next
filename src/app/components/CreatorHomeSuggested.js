'use client'

import { Bell, Headphones, Menu, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../CreatorHome/stylescreator.module.css'


export default function SuggestedActions() {


  return (
    
     
      <main className={styles.main}>
        <div className={styles.suggestedActions}>
          <div className={styles.actionHeader}>
            <h2 className={styles.actionTitle}>SUGGESTED ACTIONS (1)</h2>
            <Link href="#" className={styles.seeAll}>
              See All
            </Link>
          </div>

          <button className={styles.actionCard}>
            <div className={styles.actionContent}>
              <Image
                src="/images/profile_v1.svg"
                alt=""
                width={40}
                height={40}
                className={styles.actionIcon}
              />
              <div className={styles.actionText}>
                <h3 className={styles.actionTitle}>Complete your profile</h3>
                <p className={styles.actionDescription}>Get your feed and shop personalised.</p>
              </div>
            </div>
            <ChevronRight size={20} className={styles.chevron} />
          </button>
          <button className={styles.actionCard}>
            <div className={styles.actionContent}>
              <Image
                src="/images/profile_v1.svg"
                alt=""
                width={40}
                height={40}
                className={styles.actionIcon}
              />
              <div className={styles.actionText}>
                <h3 className={styles.actionTitle}>Connect Social Media</h3>
                <p className={styles.actionDescription}>Required to create Collablys</p>
              </div>
            </div>
            <ChevronRight size={20} className={styles.chevron} />
          </button>

          <button className={styles.actionCard}>
            <div className={styles.actionContent}>
              <Image
                src="/images/profile_v1.svg"
                alt=""
                width={40}
                height={40}
                className={styles.actionIcon}
              />
              <div className={styles.actionText}>
                <h3 className={styles.actionTitle}>Create Your first Collably</h3>
                <p className={styles.actionDescription}>Get your unique commissionable links.</p>
              </div>
            </div>
            <ChevronRight size={20} className={styles.chevron} />
          </button>

          <button className={styles.actionCard}>
            <div className={styles.actionContent}>
              <Image
                src="/images/profile_v1.svg"
                alt=""
                width={40}
                height={40}
                className={styles.actionIcon}
              />
              <div className={styles.actionText}>
                <h3 className={styles.actionTitle}>Share Collablys & Earn</h3>
                <p className={styles.actionDescription}>Share on your stories, chats & description box to earn</p>
              </div>
            </div>
            <ChevronRight size={20} className={styles.chevron} />
          </button>
        </div>
      </main>

  )
}

