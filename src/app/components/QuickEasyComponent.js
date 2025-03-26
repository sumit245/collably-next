import Link from "next/link"
import { FaPlus, FaLink, FaStore } from "react-icons/fa6"

// Icon mapping to use with dynamic data
const iconMap = {
  FaPlus: FaPlus,
  FaLink: FaLink,
  FaStore: FaStore,
  // Add more icons as needed
}

export default function QuickEasyComponent({ quickEasyData }) {
  return (
    <section className="quick-easy-section">
      <div className="container">
        <div className="header">
          <span className="badge">{quickEasyData.badge}</span>
          <h2 className="title-quick">{quickEasyData.title}</h2>
        </div>
        <div className="steps-grid">
          {quickEasyData.steps.map((step, index) => {
            // Get the icon component from the mapping
            const IconComponent = iconMap[step.iconName]

            return (
              <div key={index} className="step-card">
                <div className="icon">{IconComponent && <IconComponent />}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                <span className="step-number">{step.step}</span>
              </div>
            )
          })}
        </div>
        <div className="cta">
          <Link href={quickEasyData.cta.href} className="cta-button">
            {quickEasyData.cta.text}
          </Link>
        </div>
      </div>
    </section>
  )
}

