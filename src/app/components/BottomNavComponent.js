import React from 'react'
import Link from 'next/link'

export default function BottomNavComponent() {
  return (
    <nav className="bottom-nav">
     <div className="footer-content">
            <div className="nav-text">Become a Collably Creator today</div>
            <a href="shopper.html" target="_blank" className="footer-button">
              <span className="button-text">Get Started</span>
            </a>
          </div>
    </nav>
  )
}

