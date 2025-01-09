import React from 'react'
import Image from 'next/image'

export default function ClientSectionComponent() {
  return (
    <section className="client-section">
      <div className="container5">
        <div className="section-title">
          <h2>Trusted by <span className="highlight">Top Brands</span></h2>
        </div>
        <div className="client-grid">
          <div className="client-logo">
            <Image src="/images/paypal.png" alt="Client 1" width={120} height={60} />
          </div>
          <div className="client-logo">
            <Image src="/images/spoty.png" alt="Client 2" width={120} height={60} />
          </div>
          <div className="client-logo">
            <Image src="/images/slack.png" alt="Client 3" width={120} height={60} />
          </div>
          <div className="client-logo">
            <Image src="/images/envato.png" alt="Client 4" width={120} height={60} />
          </div>
          <div className="client-logo">
            <Image src="/images/jquery.png" alt="Client 5" width={120} height={60} />
          </div>
          <div className="client-logo">
            <Image src="/images/woocommerce.png" alt="Client 6" width={120} height={60} />
          </div>
          <div className="client-logo">
            <Image src="/images/themeforest.png" alt="Client 7" width={120} height={60} />
          </div>
          <div className="client-logo">
            <Image src="/images/shopboat.png" alt="Client 8" width={120} height={60} />
          </div>
        </div>
      </div>
    </section>
  )
}

