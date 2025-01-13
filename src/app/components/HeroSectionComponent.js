'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Typed from 'typed.js'
import { heroData } from '../utils.faker'

export default function HeroSectionComponent() {
  const typedRef = useRef(null)

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: heroData.bannerTexts,
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
              {heroData.appImages.map((img, index) => (
                <li key={index}>
                  {img.isLink ? (
                    <Link {...img.linkProps}>
                      <Image src={img.src} alt={img.alt} width={img.width} height={img.height} />
                    </Link>
                  ) : (
                    <Image src={img.src} alt={img.alt} width={img.width} height={img.height} />
                  )}
                </li>
              ))}
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
              {heroData.heroImages.map((img, index) => (
                <Image
                  key={index}
                  className={img.className}
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
