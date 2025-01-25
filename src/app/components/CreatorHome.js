"use client"

import { Bell, Headphones, Menu, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"
import styles from "../CreatorHome/stylescreator.module.css"
import { stepsCreatorHome } from "../utils.faker"

export default function CreatorHome() {
  const user = useSelector((state) => state.auth.user)

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <button className={styles.menuButton}>
            <Menu size={24} color="white" />
          </button>

          <Image
            src={user ? user.avatar || "/images/banavt1.png" : "/images/banavt1.png"}
            alt="User avatar"
            width={40}
            height={40}
            className={styles.avatar}
          />
          <div className={styles.userText}>
            <span className={styles.greeting}>Hello</span>
            {user ? (
              <span className={styles.username}>{user.user.username}</span>
            ) : (
              <Link href="/login" className={styles.username}>
                Login
              </Link>
            )}
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
          {stepsCreatorHome.map((step) => (
            <div key={step.id} className={`${styles.step} ${step.isActive ? styles.active : ""}`}>
              {step.icon && (
                <Image src="/images/waitlist-icon.png" alt="" width={24} height={24} className={styles.stepIcon} />
              )}
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
              {step.isActive && (
                <div className={styles.activeIndicator}>
                  <Image
                    src="/images/arrow-right-red-circle.svg"
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

