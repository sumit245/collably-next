"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Link from "next/link"
import Image from "next/image"
import { logout } from "../actions/auth"

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header>
      <div className="top-navbar">
        <div className="container1">
          <div className="nav-item-1">
            <span className="span-header">Follow Us :</span>
            <Link href="#">
              <i className="fa-brands fa-instagram"></i>
            </Link>
            <Link href="#">
              <i className="fab fa-youtube ms-2"></i>
            </Link>
            <Link href="#">
              <i className="fab fa-x ms-2"></i>
            </Link>
            <Link href="#">
              <i className="fab fa-facebook-f ms-2"></i>
            </Link>
            <Link href="#">
              <i className="fab fa-discord ms-2"></i>
            </Link>
          </div>
          <div className="nav-item-2">
            <div className="nav-link">
              {user ? (
                <Link href="#" onClick={handleLogout}>
                  Logout
                </Link>
              ) : (
                <Link href="/login">Login/SignUp</Link>
              )}
              <Link href="#" className="link">
                Careers
              </Link>
              <Link href="#" className="link">
                Faq
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr className="styled-line" />
      <div className="navbar container1 content">
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="brand-icon">
          <Link href="/">
            <Image src="/images/c-official-logo.png" alt="logo" width={220} height={100} />
          </Link>
        </div>
        {user ? (
          <div className="user-info">
            <Image
              src={user.avatar || "/images/banavt1.png"}
              alt="User Avatar"
              width={40}
              height={40}
              className="avatar-circle"
              style={{ borderRadius: "50%" }}
            />
            <span className="username">{user?.fullname }</span>

          </div>
        ) : (
          <div className="navbar-button">
            <Link href="/login" className="link">
              <span className="span-button">Sign Up For Free</span>
            </Link>
          </div>
        )}
      </div>
      <nav className={`nav-items ${isMenuOpen ? "active" : ""}`}>
        <Link href="/">Creators</Link>
        <Link href="/brand">Brands</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/contact-us">Contact</Link>
      </nav>
    </header>
  )
}

export default HeaderComponent

