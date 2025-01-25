"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { login, loginWithGoogle, handleGoogleRedirect } from "../actions/auth";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const router = useRouter();
  
  // Store the previous URL before login
  const [redirectUrl, setRedirectUrl] = useState('/');

  useEffect(() => {
    // Capture the page the user is coming from
    const currentUrl = window.location.search;
    if (currentUrl) {
      setRedirectUrl(currentUrl.split('redirect=')[1] || '/');
    }

    const checkGoogleRedirect = async () => {
      const result = await dispatch(handleGoogleRedirect());
      if (result.success) {
        router.push(redirectUrl);
      }
    };

    if (window.location.search) {
      checkGoogleRedirect();
    }
  }, [dispatch, router, redirectUrl]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(email, password));
    if (result.success) {
      router.push(redirectUrl); // Redirect to the original page or homepage
    }
  };
  
  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
            onClick={() => router.push('/')}
            style={{ cursor: "pointer" }}
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>

        <div className="headings">
          <img 
            src="/images/c-official-logo.png" 
            alt="Collably Logo" 
            className="logo-form" 
          />
          <h2>Sign In to Continue</h2>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
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
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

        <button className="button-submit" type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        <p className="p">
          Don't have an account?{' '}
          <Link href="/registration">
            <span className="span" style={{ cursor: 'pointer' }}>Sign Up</span>
          </Link>
        </p>

        <div className="flex-row">
          <button className="btn google" type="button" onClick={handleGoogleLogin} disabled={isLoading}>
            {/* Google button */}
            {isLoading ? "Connecting..." : "Google"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
