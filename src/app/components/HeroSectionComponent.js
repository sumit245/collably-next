'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Typed from 'typed.js'

export default function HeroSectionComponent() {
  const typedRef = useRef(null)

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Explore Brand Collaborations",
        "Shop from your Favourite Creator",
        "Create Smart Affiliate Links",
      ],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <section className="hero-section">
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="banner_text">
            <div className="type-wrap">
              <span ref={typedRef}></span>
            </div>
            <h1>Power Up Your Creator Game</h1>
            <p>
              Discover collaborations, create affiliate links, and book studios or
              services—all in one place.
            </p>
          </div>

          <div className="used_app">
            <ul>
              <li><Image src="/images/banavt1.png" alt="image" width={80} height={80} /></li>
              <li><Image src="/images/banavt2.png" alt="image" width={80} height={80} /></li>
              <li><Image src="/images/banavt3.png" alt="image" width={80} height={80} /></li>
              <li>
                <Link
                  href="#"
                  className="popup-youtube play-button"
                  data-url="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&amp;mute=1"
                  data-toggle="modal"
                  data-target="#myModal"
                  title="XJj2PbenIsU"
                >
                  <Image src="/images/play.png" alt="img" width={80} height={80} />
                </Link>
              </li>
            </ul>
            <h3>That &apos;One App&apos; for Creator Economy</h3>
            <pre>
              Collably makes the creator<br/>
              life simpler, smarter,<br/>
              and more rewarding.
            </pre>
          </div>

          <ul className="app_btn">
            <li>
              <Link href="#" className="btn btn-primary">Join Now for Free</Link>
            </li>
            <li>
              <Link href="#" className="btn btn-secondary">Special Message</Link>
            </li>
          </ul>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="banner_slider">
            <div className="slider_frame">
              <Image className="mobile-hero" src="/images/iphonescren.png" alt="iPhone screen" width={300} height={600} />
              <Image className="hero-bg-image" src="/images/bannerScreen2.png" alt="" width={600} height={583} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

