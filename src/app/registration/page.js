"use client"

import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { register } from "../actions/auth"
import styles from "./RegistrationForm.module.css"

const RegistrationForm = () => {
  const [fullname, setFullname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [isVerifiedNumber, setIsVerifiedNumber] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef(null)

  const dispatch = useDispatch()
  const router = useRouter()

  // Get phone number from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const verifiedNumber = localStorage.getItem("verifiedPhoneNumber")
      if (verifiedNumber) {
        setContactNumber(verifiedNumber)
        setIsVerifiedNumber(true)
        // Clear the stored number after using it
        // This prevents it from being used again if the user navigates away and comes back
        localStorage.removeItem("verifiedPhoneNumber")
      }
    }
  }, [])

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatar(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current.click()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      console.log("Submitting with avatar:", avatar)
      const result = await dispatch(register(fullname, username, email, password, contactNumber, avatar))
      if (result.success) {
        router.push("/login")
      } else {
        setError(result.error || "Registration failed")
        console.error("Registration failed" ,result.error)
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
      <div className={styles.header}>
        <div className="back-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => router.push("/")}
            style={{ cursor: "pointer" }}
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>

        <div className="headings">
          <img src="/images/c-official-logo.png" alt="Collably Logo" className={styles.image} />
        </div>
      </div>
      <h2 className={styles.rHeading}>Sign In to Continue</h2>

      {error && <div className={styles.error}>{error}</div>}

      {/* Avatar upload section */}
      <div className={styles.avatarContainer}>
        <div className={styles.avatarUpload} onClick={handleAvatarClick}>
          {avatarPreview ? (
            <img src={avatarPreview || "/placeholder.svg"} alt="Avatar Preview" className={styles.avatarPreview} />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Add Profile Photo</span>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className={styles.fileInput}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.textLabel}>
          <label htmlFor="fullname" className={styles.label}>
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.textLabel}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.textLabel}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.textLabel}>
          <label htmlFor="contactNumber" className={styles.label}>
            Contact Number
          </label>
          <input
            type="tel"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
            className={styles.input}
            readOnly={isVerifiedNumber}
            style={isVerifiedNumber ? { backgroundColor: "#f0f0f0" } : {}}
          />
          {isVerifiedNumber && <small className={styles.verifiedText}>Verified number</small>}
        </div>
      </div>

      {/* <div className={styles.password}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className={styles.input}
        />
      </div> */}

      <button type="submit" className={styles.button} disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </button>

      <div className={styles.container}>
        Already have an account?{" "}
        <a href="/login" className={styles.link}>
          Log in
        </a>
      </div>
    </form>
  )
}

export default RegistrationForm
