"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import styles from "../feed/modal.module.css"

export default function LoginModal({ onClose }) {
  const modalRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    // Cleanup
    return () => {
      document.body.style.overflow = "auto"
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  return (
    <div className={styles.modalOverlay}>
      <div ref={modalRef} className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className={styles.modalBody}>
          <h2>Login Required</h2>
          <p>Please login to like, comment, and save posts.</p>

          <Link href="/login" className={styles.loginButton}>
            Login
          </Link>

          <button className={styles.continueButton} onClick={onClose}>
            Continue Watching
          </button>
        </div>
      </div>
    </div>
  )
}

