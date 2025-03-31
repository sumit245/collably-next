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

  const { isLoading, otpSent, error } = useSelector(({ auth }) => auth)
  const dispatch = useDispatch()
  const router = useRouter()
  const redirect = useSearchParams()?.get("redirect") || "/"

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

  const handleSendOTP = async (e) => {
    e.preventDefault()
    if (!sent) {
      const phoneNumber = contact.startsWith("+") ? contact : `${contact}`
      const result = await dispatch(generateOTP(phoneNumber))
      if (result.success) {
        setTimeLeft(60)
        setCanResend(false)
      }
    } else {
      const phoneNumber = contact.startsWith("+") ? contact : `${contact}`
      const result = await dispatch(verifyOTP(phoneNumber, otp))
      if (result.success) {
        router.push(redirect)
      }
    }
  }

  const handleResendOTP = async () => {
    if (canResend) {
      const phoneNumber = contact.startsWith("+") ? contact : `${contact}`
      const result = await dispatch(generateOTP(phoneNumber))
      if (result.success) {
        setTimeLeft(60)
        setCanResend(false)
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

        {error && <div className="error-message">{error}</div>}

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
            {isLoading ? (sent ? "Signing In..." : "Sending OTP...") : sent ? "Sign In" : "Send OTP"}
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

        {/* <div className="flex-row">
          <button className="btn google" type="button" onClick={() => dispatch(loginWithGoogle())} disabled={isLoading}>
            <svg viewBox="0 0 512 512" width="20">
              <path fill="#FBBB00" d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014l57.992 10.632 25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.1 18.792 3.406 36.797 9.651 53.408z"/>
              <path fill="#518EF8" d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h138.887l.001.001z"/>
              <path fill="#28B446" d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"/>
              <path fill="#F14336" d="m419.404 58.936-82.933 67.896c-23.335-14.586-50.919-23.012-80.471-23.012-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"/>
            </svg>
            {isLoading ? "Connecting..." : "Google"}
          </button>
          <button className="btn-insta" type="button" disabled={isLoading}>
            {" "}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="25px">
              <radialGradient
                id="yOrnnhliCrdS2gy~4tD8ma"
                cx="19.38"
                cy="42.035"
                r="44.899"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#fd5" />
                <stop offset=".328" stopColor="#ff543f" />
                <stop offset=".348" stopColor="#fc5245" />
                <stop offset=".504" stopColor="#e64771" />
                <stop offset=".643" stopColor="#d53e91" />
                <stop offset=".761" stopColor="#cc39a4" />
                <stop offset=".841" stopColor="#c837ab" />
              </radialGradient>
              <path
                fill="url(#yOrnnhliCrdS2gy~4tD8ma)"
                d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
              />
              <radialGradient
                id="yOrnnhliCrdS2gy~4tD8mb"
                cx="11.786"
                cy="5.54"
                r="29.813"
                gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#4168c9" />
                <stop offset=".999" stopColor="#4168c9" stopOpacity="0" />
              </radialGradient>
              <path
                fill="url(#yOrnnhliCrdS2gy~4tD8mb)"
                d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
              />
              <path
                fill="#fff"
                d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
              />
              <circle cx="31.5" cy="16.5" r="1.5" fill="#fff" />
              <path
                fill="#fff"
                d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
              />
            </svg>{" "}
            Instagram
          </button>
        </div> */}
      </form>
    </div>
  )
}

export default LoginComponent

