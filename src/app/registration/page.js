"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { register } from "../actions/auth";
import styles from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(register(fullname, username, email, password, contactNumber));
    if (result.success) {
      router.push("/login");
    } else {
      console.error(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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
          className={styles.image}
        />
       
      </div>
      </div>
       <h2 className={styles.rHeading}>Sign In to Continue</h2>
      <div className={styles.row}>
        <div>
          <label htmlFor="fullname" className={styles.label}>Full Name</label>
          <input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="username" className={styles.label}>Username</label>
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
        <div>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="contactNumber" className={styles.label}>Contact Number</label>
          <input
            type="tel"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.password}>
        <label htmlFor="password" className={styles.label}>Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
      </div>

      <button type="submit" className={styles.button}>Register</button>

      <div className={styles.container}>
        Already have an account?{" "}
        <a href="/login" className={styles.link}>Log in</a>
      </div>
    </form>
  );
};

export default RegistrationForm;
