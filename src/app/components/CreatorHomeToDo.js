'use client'

import { Bell, Headphones, Menu, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../CreatorHome/stylescreator.module.css'


export default function ToDo() {


  return (
    
     
      <main className={styles.main}>
        <div className={styles.suggestedActions}>
          <div className={styles.actionHeader}>
            <h2 className={styles.actionTitle}>ToDo's</h2>
            <Link href="#" className={styles.seeAll}>
              See All
            </Link>
          </div>

          <button className={styles.actionCardToDo}>
            <div className={styles.actionContent}>
              <Image
                src="/images/profile-completion-todo.svg"
                alt=""
                width={40}
                height={40}
                className={styles.actionIcon}
              />
              <div className={styles.actionText}>
                <p className={styles.actionDescription}>Add your gender, email and bank details for monthly payouts</p>
              </div>
            </div>
            <ChevronRight size={20} className={styles.chevron} />
          </button>
        </div>
      </main>

  )
}

