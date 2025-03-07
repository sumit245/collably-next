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
            <h2 className={styles.actionTitle}>YOUR TO DO LIST(1)</h2>
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
                <h3 className={styles.actionTitle}>Connect Social Media Accounts</h3>
                <p className={styles.actionDescription}>Its required to create shoppable content</p>
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
                <h3 className={styles.actionTitle}>Complete Your Profile</h3>
                <p className={styles.actionDescription}>Customize your feed and shopping profile.</p>
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
                <h3 className={styles.actionTitle}>Complete the KYC</h3>
                <p className={styles.actionDescription}>It is required to receive payouts.</p>
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
                <h3 className={styles.actionTitle}>Create Your First Link</h3>
                <p className={styles.actionDescription}>Create your first commissionablr link.</p>
              </div>
            </div>
            <ChevronRight size={20} className={styles.chevron} />
          </button>
        </div>
      </main>

  )
}