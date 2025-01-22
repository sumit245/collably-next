
'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Megaphone, GraduationCap, Bot, MessageSquare, Trophy, Users, Star, HelpCircle, Instagram, Youtube, Phone, LogOut } from 'lucide-react'
import styles from '../shop/StyleShop.module.css'

export function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const menuRef = useRef(null)

  const menuItems = [
    { icon: <Megaphone className={styles.menuItemIcon} />, label: "Collab" },
    { icon: <GraduationCap className={styles.menuItemIcon} />, label: "Collably University" },
    { icon: <Bot className={styles.menuItemIcon} />, label: "AI Tools" },
    { icon: <MessageSquare className={styles.menuItemIcon} />, label: "Auto Reply+", comingSoon: true },
    { icon: <Trophy className={styles.menuItemIcon} />, label: "Leaderboard", comingSoon: true },
    { icon: <Users className={styles.menuItemIcon} />, label: "Community", comingSoon: true },
    { icon: <Star className={styles.menuItemIcon} />, label: "Feedback" },
    { icon: <HelpCircle className={styles.menuItemIcon} />, label: "Help" }
  ]

  const handleClick = (e) => {
    e.stopPropagation() // Prevent event from bubbling up
    const rect = e.currentTarget.getBoundingClientRect()
    setPosition({ x: rect.left, y: rect.bottom })
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest(`.${styles.menuTrigger}`)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={styles.dropdownContainer}>
      <button
        onClick={handleClick}
        className={styles.menuTrigger}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        ☰
        <span className="sr-only">Open menu</span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={`${styles.menuContent} ${isOpen ? styles.open : ''}`}
          role="menu"
        >
          <div className={styles.menuHeader}>
            <h2 className={styles.greeting}>Hello Creator!</h2>
          </div>

          <nav className={styles.menuNav}>
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={styles.menuItem}
                role="menuitem"
              >
                <div className={styles.menuItemContent}>
                  {item.icon}
                  <span className={styles.menuItemLabel}>
                    {item.label}
                    {item.comingSoon && (
                      <span className={styles.comingSoon}>(Coming Soon)</span>
                    )}
                  </span>
                </div>
                <ChevronRight className={styles.menuItemArrow} />
              </a>
            ))}
          </nav>

          <div className={styles.menuFooter}>
            <div className={styles.socialSection}>
              <h3>Follow us</h3>
              <div className={styles.socialIcons}>
                <a href="#" aria-label="Instagram"><Instagram className={styles.socialIcon} /></a>
                <a href="#" aria-label="WhatsApp"><Phone className={styles.socialIcon} /></a>
                <a href="#" aria-label="YouTube"><Youtube className={styles.socialIcon} /></a>
              </div>
            </div>

            <button className={styles.logoutButton}>
              <span>Logout</span>
              <LogOut className={styles.logoutIcon} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}



