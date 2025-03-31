"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useRouter, useSearchParams } from "next/navigation"
import { handleGoogleRedirect, generateOTP, verifyOTP } from "../actions/auth"

const LoginComponent = () => {
  const [contact, setContact] = useState("")
  const [otp, setOtp] = useState("")
  const [sent, setSent] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const { isLoading, otpSent, error } = useSelector(({ auth }) => auth)
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams?.get("redirect") || "/"

  useEffect(() => {
    if (location.search.includes("code=")) {
      dispatch(handleGoogleRedirect()).then(({ success }) => success && router.push(redirect))
    }
  }, [dispatch, router, redirect])

  // Set sent state based on Redux state
  useEffect(() => {
    setSent(otpSent)
  }, [otpSent])

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer
    if (sent && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setCanResend(true)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [sent, timeLeft])

  // Clear error message after 5 seconds
  useEffect(() => {
    let timer
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("")
      }, 5000)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [errorMessage])

  const handleSendOTP = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    
    if (!sent) {
      // Send OTP
      const phoneNumber = contact.startsWith("+") ? contact : `${contact}`
      const result = await dispatch(generateOTP(phoneNumber))
      if (result.success) {
        setTimeLeft(60)
        setCanResend(false)
      } else if (result.error) {
        setErrorMessage(result.error)
      }
    } else {
      // Verify OTP
      const phoneNumber = contact.startsWith("+") ? contact : `${contact}`
      const result = await dispatch(verifyOTP(phoneNumber, otp))
      
      if (result.success) {
        // User exists and is logged in
        router.push(redirect)
      } else if (result.otpVerified) {
        // User verified OTP but is not registered
        // Store the verified number in localStorage instead of URL
        localStorage.setItem("verifiedPhoneNumber", result.verifiedNumber || phoneNumber)
        router.push("/registration")
      } else if (result.error) {
        // Display the error message from the API
        setErrorMessage(result.error)
      }
    }
  }

  const handleResendOTP = async () => {
    if (canResend) {
      setErrorMessage("")
      const phoneNumber = contact.startsWith("+") ? contact : `${contact}`
      const result = await dispatch(generateOTP(phoneNumber))
      if (result.success) {
        setTimeLeft(60)
        setCanResend(false)
      } else if (result.error) {
        setErrorMessage(result.error)
      }
    }
  }

  return (
    <div className="login-container">
      <form className="form" onSubmit={handleSendOTP}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          onClick={() => router.back()}
          style={{ cursor: "pointer", position: "relative", left: 20, top: 20 }}
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>

        <div className="headings">
          <img src="/images/c-official-logo.png" alt="Collably Logo" className="logo-form" />
          <h2>Login with WhatsApp</h2>
        </div>

        {(error || errorMessage) && (
          <div className="error-message">{errorMessage || error}</div>
        )}

        <div className="inputForm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <input
            placeholder="Enter your Phone Number"
            className="input"
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            disabled={sent && !canResend}
            required
          />
        </div>

        {sent && (
          <>
            <div className="inputForm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                placeholder="Enter OTP"
                className="input"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            {!canResend && <div className="resend-timer">Resend OTP in {timeLeft} seconds</div>}
          </>
        )}

        <div className="button-container">
          <button className="button-submit" type="submit" disabled={isLoading}>
            {isLoading ? (sent ? "Verifying..." : "Sending OTP...") : sent ? "Verify OTP" : "Send OTP"}
          </button>

          {sent && (
            <button
              type="button"
              className={`button-resend ${canResend ? "active" : "disabled"}`}
              onClick={handleResendOTP}
              disabled={!canResend || isLoading}
            >
              {isLoading && canResend ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>

        <p className="p">
          Don't have an account?{" "}
          <Link href="/registration" className="span" style={{ cursor: "pointer" }}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  )
}

export default LoginComponent