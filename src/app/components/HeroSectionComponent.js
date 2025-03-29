'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Typed from 'typed.js'

export default function HeroSectionComponent({ heroData }) {
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
  }, [heroData.bannerTexts])

  return (
    <section className="hero-section">
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="banner_text">
            <div className="type-wrap">
              <span ref={typedRef}></span>
            </div>
            <h1>{heroData.title}</h1>
            <p>{heroData.description}</p>
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
            <h3>{heroData.appTagline}</h3>
            <pre>
              {heroData.appDescription}
            </pre>
          </div>

          <ul className="app_btn">
            <li>
              <Link href={heroData.primlink} className="btn btn-primary"> {heroData.primbutton}</Link>
            </li>
            <li>
              <Link href={heroData.seclink} className="btn btn-secondary">{heroData.secbutton}</Link>
            </li>
          </ul>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="banner-slider">
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