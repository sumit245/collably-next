"use client";

import React, { useState, useEffect } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzTdXEp_VqvfmCbUrINKl-R_BXX-Ufk-E",
  authDomain: "authbyotp-99212.firebaseapp.com",
  projectId: "authbyotp-99212",
  storageBucket: "authbyotp-99212.firebaseapp.com",
  messagingSenderId: "267382277495",
  appId: "1:267382277495:web:23d06c38ea00722b4fcd72",
  measurementId: "G-T9LTBM6ZE0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState(""); 
  const [otp, setOtp] = useState(""); 
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      console.log("Initializing reCAPTCHA...");
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA solved");
          },
          "expired-callback": () => {
            console.error("reCAPTCHA expired. Please refresh.");
          },
        }
      );
      window.recaptchaVerifier.render();
    }
  }, []);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    let formattedPhoneNumber = phoneNumber.trim();
    if (!formattedPhoneNumber.startsWith("+")) {
      formattedPhoneNumber = "+91" + formattedPhoneNumber;
    }

    console.log("Sending OTP to:", formattedPhoneNumber);

    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setIsOtpSent(true);
      console.log("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error.message);
      setError("Failed to send OTP. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setError("");

    if (!confirmationResult) {
      setError("No OTP confirmation found. Please try again.");
      setIsVerifying(false);
      return;
    }

    try {
      await confirmationResult.confirm(otp);
      console.log("OTP verified successfully!");
      alert("Login successful!");
    } catch (error) {
      console.error("Error verifying OTP:", error.message);
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div>
      {!isOtpSent ? (
        <form onSubmit={handleSendOtp}>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            required
          />
          <div id="recaptcha-container"></div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <p>OTP Sent. Enter OTP to verify.</p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          <button type="submit" disabled={isVerifying}>
            {isVerifying ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginComponent;
