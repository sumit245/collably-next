'use client'

import { useState, useRef, useEffect } from 'react'
import Reel from '../components/Reel'
import styles from './stylesfeed.module.css'
import styleshop from '../shop/StyleShop.module.css'
import Footer from '../components/FooterShop'
import {reelsData} from '../utils.faker'



export default function ReelsPage() {
  const [activeReel, setActiveReel] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / window.innerHeight)
      setActiveReel(index)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={styleshop.bodyShop}>
    <div className={styleshop.smartphoneContainer}>
    <div ref={containerRef} className={styles.reelsContainer}>
      {reelsData.map((reel, index) => (
        <div key={reel.id} className={styles.reelWrapper}>
          <Reel {...reel} isActive={index === activeReel} />
        </div>
      ))}
    </div>
    <Footer />
    </div>
    </div>
    
  )
}

