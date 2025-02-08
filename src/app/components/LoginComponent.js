"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useRouter, useSearchParams } from "next/navigation"
import { login, loginWithGoogle, handleGoogleRedirect } from "../actions/auth"
import { initializeApp } from "firebase/app"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzTdXEp_VqvfmCbUrINKl-R_BXX-Ufk-E",
  authDomain: "authbyotp-99212.firebaseapp.com",
  projectId: "authbyotp-99212",
  storageBucket: "authbyotp-99212.firebaseapp.com",
  messagingSenderId: "267382277495",
  appId: "1:267382277495:web:23d06c38ea00722b4fcd72",
  measurementId: "G-T9LTBM6ZE0",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const LoginComponent = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState("email") // 'email' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState("")
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
    if (redirect) {
      setRedirectUrl(redirect)
    }

    const checkGoogleRedirect = async () => {
      const result = await dispatch(handleGoogleRedirect())
      if (result.success) {
        router.push(redirectUrl)
      }
    }

    if (window.location.search.includes("code=")) {
      checkGoogleRedirect()
    }

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA solved")
        },
        "expired-callback": () => {
          console.error("reCAPTCHA expired. Please refresh.")
        },
      })
      window.recaptchaVerifier.render()
    }
  }, [dispatch, router, redirectUrl, searchParams])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (loginMethod === "email") {
      const result = await dispatch(login(email, password))
      if (result.success) {
        router.push(redirectUrl)
      }
    } else {
      handleVerifyOtp(e)
    }
  }

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle())
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    let formattedPhoneNumber = phoneNumber.trim()
    if (!formattedPhoneNumber.startsWith("+")) {
      formattedPhoneNumber = "+91" + formattedPhoneNumber
    }

    try {
      const appVerifier = window.recaptchaVerifier
      const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
      setConfirmationResult(confirmation)
      setIsOtpSent(true)
    } catch (error) {
      console.error("Error sending OTP:", error.message)
      dispatch({ type: "SET_ERROR", payload: "Failed to send OTP. Try again." })
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    if (!confirmationResult) {
      dispatch({ type: "SET_ERROR", payload: "No OTP confirmation found. Please try again." })
      return
    }

    try {
      await confirmationResult.confirm(otp)
      router.push(redirectUrl)
    } catch (error) {
      console.error("Error verifying OTP:", error.message)
      dispatch({ type: "SET_ERROR", payload: "Invalid OTP. Please try again." })
    }
  }

  return (
    <div className="login-container">
      <form className="form" onSubmit={handleLogin}>
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
          <img src="/images/c-official-logo.png" alt="Collably Logo" className="logo-form" />
          <h2>Sign In to Continue</h2>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="login-method-toggle">
          <button
            type="button"
            className={`toggle-btn ${loginMethod === "email" ? "active" : ""}`}
            onClick={() => setLoginMethod("email")}
          >
            Email Login
          </button>
          <button
            type="button"
            className={`toggle-btn ${loginMethod === "otp" ? "active" : ""}`}
            onClick={() => setLoginMethod("otp")}
          >
            OTP Login
          </button>
        </div>

        {loginMethod === "email" ? (
          <>
            <div className="flex-column">
              <label>Email</label>
            </div>
            <div className="inputForm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                <g data-name="Layer 3" id="Layer_3">
                  <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                </g>
              </svg>
              <input
                placeholder="Enter your Email"
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex-column">
              <label>Password</label>
            </div>
            <div className="inputForm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="-64 0 512 512">
                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
              </svg>
              <input
                placeholder="Enter your Password"
                className="input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>

            <div className="flex-row">
              <div>
                <input type="radio" />
                <label>Remember me</label>
              </div>
              <span className="span">Forgot password?</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex-column">
              <label>Phone Number</label>
            </div>
            <div className="inputForm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <input
                placeholder="Enter your Phone Number"
                className="input"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            {!isOtpSent ? (
              <button className="button-submit" type="button" onClick={handleSendOtp} disabled={isLoading}>
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            ) : (
              <>
                <div className="flex-column">
                  <label>OTP</label>
                </div>
                <div className="inputForm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
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
              </>
            )}
          </>
        )}

        <button className="button-submit" type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        <p className="p">
          Don't have an account?{" "}
          <Link href="/registration">
            <span className="span" style={{ cursor: "pointer" }}>
              Sign Up
            </span>
          </Link>
        </p>

        <div className="flex-row">
          <button className="btn google" type="button" onClick={handleGoogleLogin} disabled={isLoading}>
            <svg
              xmlSpace="preserve"
              style={{ enableBackground: "new 0 0 512 512" }}
              viewBox="0 0 512 512"
              y="0px"
              x="0px"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              width="20"
              version="1.1"
            >
              <path
                d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256 c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456 C103.821,274.792,107.225,292.797,113.47,309.408z"
                style={{ fill: "#FBBB00" }}
              ></path>
              <path
                d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451 c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535 c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
                style={{ fill: "#518EF8" }}
              ></path>
              <path
                d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512 c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771 c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                style={{ fill: "#28B446" }}
              ></path>
              <path
                d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012 c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0 C318.115,0,375.068,22.126,419.404,58.936z"
                style={{ fill: "#F14336" }}
              ></path>
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
        </div>
      </form>
      <div id="recaptcha-container"></div>
    </div>
  )
}

export default LoginComponent

