'use client'

import styles from '../CreatorHome/stylescreator.module.css'
import { HelpCircle } from 'lucide-react'
import Image from 'next/image'

export default function PoweredByFooter() {
  return (
    <footer className={styles.footerCreatorBottom}>
      <div className={styles.poweredByCreatorBottom}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M13 19L22 12L13 5V19Z" fill="#FF6B2C"/>
        </svg>
        Made with ❤️ in  
        <Image
            src="/images/icons8-india-48.png"
            width={20}
            height={20}
        />
 
        {/* <span className={styles.CollablyCreatorBottom}>Collably</span> */}
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
