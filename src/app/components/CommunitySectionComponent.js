import React from 'react'
import Link from 'next/link'

export default function CommunitySectionComponent() {
  return (
    <section className="community">
      <div className="container6">
        <div className="section-head">
          <span className="subtitle1">Join Our Community</span>
          <h2>Connect with <span className="gradient-text">Fellow Creators</span></h2>
        </div>
        <div className="cards">
          <Link href="#" className="card">
            <div className="icon3 whatsapp">
              <i className="fab fa-whatsapp"></i>
            </div>
            <div className="content1">
              <h3>WhatsApp Group</h3>
              <p>Join our active WhatsApp community</p>
            </div>
          </Link>
          <Link href="#" className="card">
            <div className="icon3 discord">
              <i className="fab fa-discord"></i>
            </div>
            <div className="content1">
              <h3>Discord Server</h3>
              <p>Engage in our Discord discussions</p>
            </div>
          </Link>
          <Link href="#" className="card">
            <div className="icon3 instagram">
              <i className="fab fa-instagram"></i>
            </div>
            <div className="content1">
              <h3>Instagram</h3>
              <p>Follow us for daily inspiration</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

