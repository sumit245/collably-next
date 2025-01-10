'use client'

import styles from '../CreatorHome/stylescreator.module.css'
import { HelpCircle } from 'lucide-react'

export default function PoweredByFooter() {
  return (
    <footer className={styles.footerCreatorBottom}>
      <div className={styles.poweredByCreatorBottom}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M13 19L22 12L13 5V19Z" fill="#FF6B2C"/>
        </svg>
        Powered by <span className={styles.wishlinkCreatorBottom}>Collably</span>
      </div>
      
      <a href="#" className={styles.helpLinkCreatorBottom}>
        <span className={styles.helpIconCreatorBottom}>
          <HelpCircle size={14} />
        </span>
        Help & Support
      </a>
    </footer>
  )
}

