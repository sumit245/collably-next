import React from 'react'
import Link from 'next/link'

export default function BottomNavComponent() {
  return (
    <nav className="bottom-nav">
     <div className="footer-content">
            <div className="nav-text">Become a Collably Creator today</div>
            <Link className="footer-button" href="/creatorDashboardEntry">
              <span className="button-text">Get Started</span></Link>
          </div>
    </nav>
  )
}

