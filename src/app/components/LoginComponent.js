// "use client";

// import React, { useState, useEffect } from "react";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { initializeApp } from "firebase/app";

// // Firebase Configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAzTdXEp_VqvfmCbUrINKl-R_BXX-Ufk-E",
//   authDomain: "authbyotp-99212.firebaseapp.com",
//   projectId: "authbyotp-99212",
//   storageBucket: "authbyotp-99212.firebaseapp.com",
//   messagingSenderId: "267382277495",
//   appId: "1:267382277495:web:23d06c38ea00722b4fcd72",
//   measurementId: "G-T9LTBM6ZE0",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const LoginComponent = () => {
//   const [phoneNumber, setPhoneNumber] = useState(""); 
//   const [otp, setOtp] = useState(""); 
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!window.recaptchaVerifier) {
//       console.log("Initializing reCAPTCHA...");
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         auth,
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: () => {
//             console.log("reCAPTCHA solved");
//           },
//           "expired-callback": () => {
//             console.error("reCAPTCHA expired. Please refresh.");
//           },
//         }
//       );
//       window.recaptchaVerifier.render();
//     }
//   }, []);

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     let formattedPhoneNumber = phoneNumber.trim();
//     if (!formattedPhoneNumber.startsWith("+")) {
//       formattedPhoneNumber = "+91" + formattedPhoneNumber;
//     }

//     console.log("Sending OTP to:", formattedPhoneNumber);

//     try {
//       const appVerifier = window.recaptchaVerifier;
//       const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier);
//       setConfirmationResult(confirmation);
//       setIsOtpSent(true);
//       console.log("OTP sent successfully!");
//     } catch (error) {
//       console.error("Error sending OTP:", error.message);
//       setError("Failed to send OTP. Try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setIsVerifying(true);
//     setError("");

//     if (!confirmationResult) {
//       setError("No OTP confirmation found. Please try again.");
//       setIsVerifying(false);
//       return;
//     }

//     try {
//       await confirmationResult.confirm(otp);
//       console.log("OTP verified successfully!");
//       alert("Login successful!");
//     } catch (error) {
//       console.error("Error verifying OTP:", error.message);
//       setError("Invalid OTP. Please try again.");
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   return (
//     <div>
//       {!isOtpSent ? (
//         <form onSubmit={handleSendOtp}>
//           <input
//             type="text"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             placeholder="Enter phone number"
//             required
//           />
//           <div id="recaptcha-container"></div>
//           <button type="submit" disabled={isLoading}>
//             {isLoading ? "Sending OTP..." : "Send OTP"}
//           </button>
//         </form>
//       ) : (
//         <form onSubmit={handleVerifyOtp}>
//           <p>OTP Sent. Enter OTP to verify.</p>
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             placeholder="Enter OTP"
//             required
//           />
//           <button type="submit" disabled={isVerifying}>
//             {isVerifying ? "Verifying..." : "Verify OTP"}
//           </button>
//         </form>
//       )}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// export default LoginComponent;






"use client"

import { useState, useEffect } from "react"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { initializeApp } from "firebase/app"
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react"
import Link from "next/link"
import styles from '../login/LoginForm.module.css'  // Import the CSS module
import Image from "next/image"

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

export default function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
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
  }, [])

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

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
      setError("Failed to send OTP. Try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setIsVerifying(true)
    setError("")

    if (!confirmationResult) {
      setError("No OTP confirmation found. Please try again.")
      setIsVerifying(false)
      return
    }

    try {
      await confirmationResult.confirm(otp)
      alert("Login successful!")
    } catch (error) {
      setError("Invalid OTP. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.logoContainer}>
          <button className={styles.arrowBtn}>
            <ArrowLeft className={styles.arrowBtn}/>
          </button>
          <img
            src="images/c-official-logo.png"
            alt="Logo"
            className={styles.logo}
          />
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        <h2 className={styles.title}>Sign In to Continue</h2>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={!isOtpSent ? handleSendOtp : handleVerifyOtp}>
          <div className={styles.formGroup}>
            {!isOtpSent ? (
              <div className={styles.inputField}>
                <label htmlFor="phone" className={styles.label}>
                  Phone Number
                </label>
                <div className={styles.inputWrapper}>
                  <div className={styles.icon}>
                    <span className="h-5 w-5 text-black">+91</span>
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={styles.input}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
            ) : (
              <div className={styles.inputField}>
                <label htmlFor="otp" className={styles.label}>
                  OTP
                </label>
                <div className={styles.inputWrapper}>
                  <div className={styles.icon}>
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="otp"
                    type={showPassword ? "text" : "password"}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className={styles.input}
                    placeholder="Enter OTP"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.eyeIcon}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className={styles.rememberMeContainer}>
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className={styles.checkbox}
              />
              <label htmlFor="remember-me" className={styles.label}>
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link href="/forgot-password" className={styles.forgotPasswordLink}>
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || isVerifying}
              className={styles.button}
            >
              {isLoading ? "Sending OTP..." : isVerifying ? "Verifying..." : isOtpSent ? "Verify OTP" : "Send OTP"}
            </button>
          </div>

          <div className={styles.bottomLink}>
            <p className={styles.linkText}>
              Don't have an account?{" "}
              <Link href="/sign-up" className={styles.forgotPasswordLink}>
                Sign Up
              </Link>
            </p>
          </div>

          <div className={styles.socialButtonsContainer}>
            <button
              type="button"
              className={styles.socialButton}
            >
               <svg className={styles.svg} viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              className={styles.socialButton}
            >
               <svg className={styles.svg} fill="url(#instagram-gradient)" viewBox="0 0 24 24">
                <defs>
                  <radialGradient
                    id="instagram-gradient"
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
                </defs>
                <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" />
              </svg>
              Instagram
            </button>
          </div>
        </form>

        <div id="recaptcha-container"></div>
      </div>
    </div>
  )
}

