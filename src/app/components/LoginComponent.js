"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useRouter, useSearchParams } from "next/navigation"
import { loginWithPhone, loginWithGoogle, handleGoogleRedirect } from "../actions/auth"
import { initializeApp } from "firebase/app"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAzTdXEp_VqvfmCbUrINKl-R_BXX-Ufk-E",
  authDomain: "authbyotp-99212.firebaseapp.com",
  projectId: "authbyotp-99212",
  storageBucket: "authbyotp-99212.appspot.com",
  messagingSenderId: "267382277495",
  appId: "1:267382277495:web:23d06c38ea00722b4fcd72",
  measurementId: "G-T9LTBM6ZE0",
}

const auth = getAuth(initializeApp(firebaseConfig))

const LoginComponent = () => {
  const [contactNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [confirmationResult, setConfirmationResult] = useState(null)
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state) => state.auth)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [redirectUrl, setRedirectUrl] = useState("/")

  useEffect(() => {
    const redirect = searchParams.get("redirect")
    if (redirect) setRedirectUrl(redirect)
  
    if (location.search.includes("code=")) (async () => {
      const result = await dispatch(handleGoogleRedirect())
      if (result.success) router.push(redirectUrl)
    })()
  
    // Ensure reCAPTCHA is properly initialized
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => console.log("reCAPTCHA solved"),
        "expired-callback": () => console.error("reCAPTCHA expired. Please refresh."),
      })
    }
  }, [dispatch, router, redirectUrl, searchParams])
  

  const handleGoogleLogin = () => dispatch(loginWithGoogle())

  const handleSendOtp = async (e) => {
    e.preventDefault()

   
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear()
      window.recaptchaVerifier = null
    }

    
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => console.log("reCAPTCHA solved"),
    })

    const formatted = contactNumber.trim().startsWith("+") ? contactNumber.trim() : `+91${contactNumber.trim()}`
    
    try {
      const confirmation = await signInWithPhoneNumber(auth, formatted, window.recaptchaVerifier)
      setConfirmationResult(confirmation)
      setIsOtpSent(true)
    } catch (err) {
      console.error("Error sending OTP:", err.message)
      dispatch({ type: "SET_ERROR", payload: "Failed to send OTP. Try again." })
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    if (!confirmationResult) return dispatch({ type: "SET_ERROR", payload: "No OTP confirmation found. Please try again." })
    
    try {
      await confirmationResult.confirm(otp)
      const result = await dispatch(loginWithPhone(contactNumber))
      if (result.success) router.push(redirectUrl)
    } catch (err) {
      console.error("Error verifying OTP:", err.message)
      dispatch({ type: "SET_ERROR", payload: "Invalid OTP. Please try again." })
    }
  }

  return (
    <div className="login-container">
      <form className="form" onSubmit={handleVerifyOtp}>
        <div className="back-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={() => router.back()} style={{ cursor: "pointer" }}>
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </div>

        <div className="headings">
          <img src="/images/c-official-logo.png" alt="Collably Logo" className="logo-form"/>
          <h2>Sign In to Continue</h2>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="flex-column"><label>Phone Number</label></div>
        <div className="inputForm">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <input placeholder="Enter your Phone Number" className="input" type="tel" value={contactNumber} onChange={e => setPhoneNumber(e.target.value)} required/>
        </div>

        {!isOtpSent ? (
          <button className="button-submit" type="button" onClick={handleSendOtp} disabled={isLoading}>
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </button>
        ) : (
          <>
            <div className="flex-column"><label>OTP</label></div>
            <div className="inputForm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input placeholder="Enter OTP" className="input" type="text" value={otp} onChange={e => setOtp(e.target.value)} required/>
            </div>
          </>
        )}

        <button className="button-submit" type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        <p className="p">
          Don't have an account?{" "}
          <Link href="/registration"><span className="span" style={{ cursor: "pointer" }}>Sign Up</span></Link>
        </p>

        <div className="flex-row">
          <button className="btn google" type="button" onClick={handleGoogleLogin} disabled={isLoading}>
            <svg xmlSpace="preserve" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width="20">
              <path fill="#FBBB00" d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014l57.992 10.632 25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.1 18.792 3.406 36.797 9.651 53.408z"/>
              <path fill="#518EF8" d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h138.887l.001.001z"/>
              <path fill="#28B446" d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"/>
              <path fill="#F14336" d="m419.404 58.936-82.933 67.896c-23.335-14.586-50.919-23.012-80.471-23.012-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"/>
            </svg>
            {isLoading ? "Connecting..." : "Google"}
          </button>
          <button className="btn-insta" type="button" disabled={isLoading}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="25px">
              <radialGradient id="yOrnnhliCrdS2gy~4tD8ma" cx="19.38" cy="42.035" r="44.899"><stop offset="0" stopColor="#fd5"/><stop offset=".328" stopColor="#ff543f"/><stop offset=".348" stopColor="#fc5245"/><stop offset=".504" stopColor="#e64771"/><stop offset=".643" stopColor="#d53e91"/><stop offset=".761" stopColor="#cc39a4"/><stop offset=".841" stopColor="#c837ab"/></radialGradient>
              <path fill="url(#yOrnnhliCrdS2gy~4tD8ma)" d="M34.017 41.99l-20 .019c-4.4.004-8.003-3.592-8.008-7.992l-.019-20c-.004-4.4 3.592-8.003 7.992-8.008l20-.019c4.4-.004 8.003 3.592 8.008 7.992l.019 20C42.014 38.383 38.417 41.986 34.017 41.99z"/>
              <radialGradient id="yOrnnhliCrdS2gy~4tD8mb" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)"><stop offset="0" stopColor="#4168c9"/><stop offset=".999" stopColor="#4168c9" stopOpacity="0"/></radialGradient>
              <path fill="url(#yOrnnhliCrdS2gy~4tD8mb)" d="M34.017 41.99l-20 .019c-4.4.004-8.003-3.592-8.008-7.992l-.019-20c-.004-4.4 3.592-8.003 7.992-8.008l20-.019c4.4-.004 8.003 3.592 8.008 7.992l.019 20C42.014 38.383 38.417 41.986 34.017 41.99z"/>
              <path fill="#fff" d="M24 31c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"/>
              <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"/>
              <path fill="#fff" d="M30 37H18c-3.859 0-7-3.14-7-7V18c0-3.86 3.141-7 7-7h12c3.859 0 7 3.14 7 7v12c0 3.86-3.141 7-7 7zM18 13c-2.757 0-5 2.243-5 5v12c0 2.757 2.243 5 5 5h12c2.757 0 5-2.243 5-5V18c0-2.757-2.243-5-5-5H18z"/>
            </svg>
            Instagram
          </button>
        </div>
      </form>
      <div id="recaptcha-container"></div>
    </div>
  )
}

export default LoginComponent