import Link from 'next/link'
import { FaPlus, FaLink, FaStore } from 'react-icons/fa6'

export default function QuickEasyComponent() {
  const steps = [
    { icon: FaPlus, title: "Sign up on Collably", description: "Complete OTP process & Create your collably account", step: "01" },
    { icon: FaLink, title: "Link your Social Media", description: "Connect your social media accounts to maximize your reach", step: "02" },
    { icon: FaStore, title: "Start Earning", description: "Create content, share links, and watch your earnings grow", step: "03" },
  ]

  return (
    <section className="quick-easy-section">
      <div className="container">
        <div className="header">
          <span className="badge">Quick & Easy</span>
          <h2 className="title-quick">Start Earnings in 3 Steps</h2>
        </div>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="icon">
                <step.icon />
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              <span className="step-number">{step.step}</span>
            </div>
          ))}
        </div>
        <div className="cta">
          <Link href="#" className="cta-button">
            Get started now
          </Link>
        </div>
      </div>
    </section>
  )
}
