"use client"

import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { updateUser } from "../actions/auth"
import styles from "../registration/RegistrationForm.module.css"

const UpdateUserForm = () => {
  const [fullname, setFullname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [isPasswordUpdate, setIsPasswordUpdate] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  const dispatch = useDispatch()
  const router = useRouter()
  const { user, isLoading, error: stateError } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      setFullname(user.fullname || "")
      setUsername(user.username || "")
      setEmail(user.email || "")
      setContactNumber(user.contactNumber || "")

      // Set avatar preview if user has an avatar
      if (user.avatar) {
        setAvatarPreview(user.avatar)
      }
    }
  }, [user])

  useEffect(() => {
    if (stateError) {
      setError(stateError)
    }
  }, [stateError])

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
    setError("")
    setIsSubmitting(true)

    const userData = {}

    if (fullname !== user.fullname) userData.fullname = fullname
    if (username !== user.username) userData.username = username
    if (email !== user.email) userData.email = email
    if (contactNumber !== user.contactNumber) userData.contactNumber = contactNumber
    if (isPasswordUpdate && password) userData.password = password
    if (avatar) userData.avatar = avatar

    console.log("Update user data:", userData)

    if (Object.keys(userData).length > 0) {
      try {
        const result = await dispatch(updateUser(userData))
        if (result.success) {
          router.back()
        } else {
          setError(result.error || "Failed to update user")
        }
      } catch (err) {
        setError(err.message || "Failed to update user")
        console.error("Failed to update user:", err)
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setIsSubmitting(false)
      router.back()
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
            onClick={() => router.back()}
            style={{ cursor: "pointer" }}
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>

        <div className="headings">
          <img src="/images/c-official-logo.png" alt="Collably Logo" className={styles.image} />
        </div>
      </div>
      <h2 className={styles.rHeading}>Update Your Profile</h2>

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
              <span>Update Profile Photo</span>
             
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
        <div className={styles.plusIcon}>+</div>
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
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.textLabel}>
        <div className={styles.passwordHeader}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isPasswordUpdate}
              onChange={(e) => setIsPasswordUpdate(e.target.checked)}
              className={styles.checkbox}
            />
            Update Password
          </label>
        </div>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={!isPasswordUpdate}
          className={styles.input}
          placeholder={isPasswordUpdate ? "Enter new password" : "Password will not be updated"}
        />
      </div>

      <button type="submit" className={styles.button} disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update Profile"}
      </button>
    </form>
  )
}

export default UpdateUserForm
