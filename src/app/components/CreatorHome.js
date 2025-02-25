"use client"

import { useEffect } from "react"
import { Bell, Headphones, Menu } from "lucide-react"
import Image from "next/image"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import styles from "../CreatorHome/stylescreator.module.css"
import { stepsCreatorHome } from "../utils.faker"

export default function CreatorHome() {
  const user = useSelector((state) => state.auth.user)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      
      router.push(`/login?redirect=${encodeURIComponent("/CreatorHome")}`)
    }
  }, [user, router])

  if (!user) {
    return null 
  }

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <button className={styles.menuButton}>
            <Menu size={24} color="white" />
          </button>

          <Image
            src={user.avatar || "/images/banavt1.png"}
            alt="User avatar"
            width={40}
            height={40}
            className={styles.avatar}
          />
          <div className={styles.userText}>
            <span className={styles.greeting}>Hello</span>
            <span className={styles.username}>{user?.fullname }</span>
            {/* <span className="username">{user?.username }</span> */}
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
      {/* <div className={styles.heroContainer}>
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
      </div> */}
    </div>
  )
}

