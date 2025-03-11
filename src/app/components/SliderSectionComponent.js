'use client'

import { useState, useEffect, useRef } from 'react'

export default function SliderSectionComponent() {
  const [followers, setFollowers] = useState(430000)
  const [content, setContent] = useState(30)
  const [earnings, setEarnings] = useState('1L')
  const refs = {
    followers: { slider: useRef(), thumb: useRef(), value: useRef(), track: useRef() },
    content: { slider: useRef(), thumb: useRef(), value: useRef(), track: useRef() }
  }

  const formatNumber = num => num >= 1e6 ? (num/1e6).toFixed(1)+'M' : num >= 1e3 ? (num/1e3).toFixed(0)+'K' : num

  const calculateEarnings = (f, c) => {
    const monthly = f * 0.001 * 1000 * (c/30)
    return monthly >= 1e5 ? Math.round(monthly/1e5)+'L' : Math.round(monthly/1e3)+'K'
  }

  const updateSlider = (type, value) => {
    const { slider, thumb, value: val, track } = refs[type]
    const percent = ((value - slider.current.min) / (slider.current.max - slider.current.min)) * 100
    thumb.current.style.left = `${percent}%`
    track.current.style.width = `${percent}%`
    val.current.textContent = type === 'followers' ? formatNumber(value) : value
    
    type === 'followers' ? setFollowers(value) : setContent(value)
    setEarnings(calculateEarnings(refs.followers.slider.current.value, refs.content.slider.current.value))
  }

  useEffect(() => {
    Object.entries(refs).forEach(([type]) => updateSlider(type, type === 'followers' ? 430000 : 30))
  }, [])

  return (
    <section className="sliderSectionWrapper">
      <div className="earningsCalculator">
        <section className="header">
          <div className="title">and here's HOW MUCH you can EARN 🤑</div>
          <div className="subtitle">Let's do a quick math</div>
        </section>

        {['followers', 'content'].map((type) => (
          <section key={type} className="sliderSection">
            <div className="sliderLabel">
              Select {type === 'followers' ? 'your no. of followers' : 'the no. of content you do'} per month
            </div>
            <div className="sliderContainer">
              <span className="rangeValue">{type === 'followers' ? formatNumber(0) : 10}</span>
              <div className="sliderWrapper">
                <div className="sliderTrack">
                  <div className="sliderTicks">{[...Array(12)].map((_, i) => <div key={i} className="tick" />)}</div>
                  <div className={`sliderFill ${type}Fill`} ref={refs[type].track} />
                </div>
                <input
                  type="range"
                  min={type === 'followers' ? 0 : 10}
                  max={type === 'followers' ? 1e6 : 50}
                  defaultValue={type === 'followers' ? 430000 : 30}
                  className="slider"
                  ref={refs[type].slider}
                  onChange={e => updateSlider(type, +e.target.value)}
                />
                <div className="sliderThumb" ref={refs[type].thumb}>
                  <div className="thumbGlow" />
                  <div className="thumbValue" ref={refs[type].value}>
                    {type === 'followers' ? formatNumber(followers) : content}
                  </div>
                </div>
              </div>
              <span className="rangeValue">{type === 'followers' ? formatNumber(1e6) : 50}</span>
            </div>
          </section>
        ))}

        <section className="resultSection">
          <div className="resultLabel">Your earnings per month will be</div>
          <div className="resultAmount">
            ₹<span className="amount">{earnings}</span><sup>*</sup>
          </div>
          <div className="resultNote">*based on 0.1% followers becoming customers</div>
          <button className="button">Start Earning Now</button>
          <div className="amountBlur">{earnings}</div>
        </section>
      </div>
    </section>
  )
}