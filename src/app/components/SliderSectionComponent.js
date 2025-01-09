'use client'

import React, { useState, useEffect, useRef } from 'react'

export default function SliderSectionComponent() {
  const [followers, setFollowers] = useState(430000)
  const [content, setContent] = useState(30)
  const [earnings, setEarnings] = useState('1L')

  const followersSliderRef = useRef(null)
  const contentSliderRef = useRef(null)
  const followersThumbRef = useRef(null)
  const contentThumbRef = useRef(null)
  const followersValueRef = useRef(null)
  const contentValueRef = useRef(null)
  const followersTrackRef = useRef(null)
  const contentTrackRef = useRef(null)

  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K'
    }
    return num.toString()
  }

  function calculateEarnings(followers, content) {
    const conversionRate = 0.001
    const averageEarning = 1000
    const monthlyCustomers = followers * conversionRate
    const monthlyEarnings = monthlyCustomers * averageEarning * (content / 30)
    
    if (monthlyEarnings >= 100000) {
      return Math.round(monthlyEarnings / 100000) + 'L'
    }
    return Math.round(monthlyEarnings / 1000) + 'K'
  }

  function updateSlider(slider, thumb, value, track, isFollowers) {
    const percent = ((slider.value - slider.min) / (slider.max - slider.min)) * 100
    thumb.style.left = `${percent}%`
    track.style.width = `${percent}%`
    
    if (isFollowers) {
      value.textContent = formatNumber(parseInt(slider.value))
      setFollowers(parseInt(slider.value))
    } else {
      value.textContent = slider.value
      setContent(parseInt(slider.value))
    }

    const newEarnings = calculateEarnings(
      followersSliderRef.current.value,
      contentSliderRef.current.value
    )
    setEarnings(newEarnings)
  }

  function handleSliderInput(event, isFollowers) {
    const slider = event.target
    const thumb = isFollowers ? followersThumbRef.current : contentThumbRef.current
    const value = isFollowers ? followersValueRef.current : contentValueRef.current
    const track = isFollowers ? followersTrackRef.current : contentTrackRef.current
    updateSlider(slider, thumb, value, track, isFollowers)
  }

  useEffect(() => {
    if (followersSliderRef.current && contentSliderRef.current) {
      updateSlider(
        followersSliderRef.current,
        followersThumbRef.current,
        followersValueRef.current,
        followersTrackRef.current,
        true
      )
      updateSlider(
        contentSliderRef.current,
        contentThumbRef.current,
        contentValueRef.current,
        contentTrackRef.current,
        false
      )
    }
  }, [])

  return (
    <section className="sliderSectionWrapper">
      <div className="earningsCalculator">
        <section className="header">
          <div className="title">and here's HOW MUCH you can EARN 🤑</div>
          <div className="subtitle">Let's do a quick math</div>
        </section>

        <section className="sliderSection">
          <div className="sliderLabel">Select your no. of followers (Instagram, YouTube, etc)</div>
          <div className="sliderContainer">
            <span className="rangeValue">{formatNumber(0)}</span>
            <div className="sliderWrapper">
              <div className="sliderTrack">
                <div className="sliderTicks">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="tick"></div>
                  ))}
                </div>
                <div className="sliderFill followersFill" ref={followersTrackRef}></div>
              </div>
              <input
                type="range"
                min="0"
                max="1000000"
                value={followers}
                className="slider"
                id="followersSlider"
                ref={followersSliderRef}
                onChange={(e) => handleSliderInput(e, true)}
              />
              <div className="sliderThumb" ref={followersThumbRef}>
                <div className="thumbGlow"></div>
                <div className="thumbValue" ref={followersValueRef}>{formatNumber(followers)}</div>
              </div>
            </div>
            <span className="rangeValue">{formatNumber(1000000)}</span>
          </div>
        </section>

        <section className="sliderSection">
          <div className="sliderLabel">Select the no. of content you do per month</div>
          <div className="sliderContainer">
            <span className="rangeValue">10</span>
            <div className="sliderWrapper">
              <div className="sliderTrack">
                <div className="sliderTicks">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="tick"></div>
                  ))}
                </div>
                <div className="sliderFill contentFill" ref={contentTrackRef}></div>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={content}
                className="slider"
                id="contentSlider"
                ref={contentSliderRef}
                onChange={(e) => handleSliderInput(e, false)}
              />
              <div className="sliderThumb" ref={contentThumbRef}>
                <div className="thumbGlow"></div>
                <div className="thumbValue" ref={contentValueRef}>{content}</div>
              </div>
            </div>
            <span className="rangeValue">50</span>
          </div>
        </section>

        <section className="resultSection">
          <div className="resultLabel">Your earnings per month will be</div>
          <div className="resultAmount">
            <span className="currency">₹</span>
            <span className="amount">{earnings}</span>
            <span className="asterisk"><sup>*</sup></span>
          </div>
          <div className="resultNote">*based on an estimate that 0.1% of your followers become your customers</div>
          <button className="button">
            Start Earning Now
          </button>
          <div className="amountBlur">
            {earnings}
          </div>
        </section>
      </div>
    </section>
  )
}

