"use client"

import styles from "../../app/termsCreator/page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterShop from "../components/FooterShop"
import Header from "../components/HeaderShop"

export default function CancellationRefundPolicy() {
  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <Header />

        <div className={styles.policyContainer}>
          <div className={styles.policyHeader}>
            <h1 className={styles.title}>Cancellation & Refund Policy</h1>
          </div>

          <div className={styles.policyContent}>
            <section className={styles.section}>
              <div className={styles.introSection}>
                <p className={styles.content}>
                  At Collably, we aim to build trust through transparency. Please read this Cancellation and Refund
                  Policy carefully before using our Services. By using Collably, you agree to the terms outlined below.
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Subscription Plans & Services</h2>
              <div className={styles.highlightBox}>
                <p className={styles.content}>
                  <strong>
                    If you have purchased a subscription plan or any premium service from Collably, please note that all
                    payments made are non-refundable unless explicitly stated otherwise in a separate agreement or
                    offer.
                  </strong>
                </p>
              </div>
              <p className={styles.content}>
                Once a plan is activated, we do not offer partial or full refunds for unused periods or features.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Cancellation of Subscription</h2>
              <p className={styles.content}>
                You may cancel your subscription at any time through your account settings. Upon cancellation, your
                subscription will remain active until the end of your current billing cycle. After that, your account
                will automatically revert to the free version with limited access.
              </p>
              <div className={styles.noteBox}>
                <p className={styles.content}>
                  <strong>Please note:</strong> Cancelling your subscription does not automatically initiate a refund.
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Exceptional Circumstances</h2>
              <p className={styles.content}>Refunds may be considered only in the following exceptional situations:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>You were charged more than once for the same service</li>
                <li className={styles.listItem}>You were charged after cancellation and can provide proof</li>
                <li className={styles.listItem}>
                  There was a verified technical issue on our platform that prevented you from accessing the paid
                  service
                </li>
              </ul>

              <div className={styles.contactBox}>
                <p className={styles.content}>
                  <strong>
                    If you believe you qualify for an exception, please reach out to us within 7 days of the transaction
                    at:
                  </strong>
                </p>
                <div className={styles.contactDetails}>
                  <p className={styles.content}>
                    📩{" "}
                    <a href="mailto:hello@collably.in" className={styles.emailLink}>
                      hello@collably.in
                    </a>
                  </p>
                  <p className={styles.content}>
                    Include your account details, payment reference, and a brief explanation of the issue.
                  </p>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Brand & Creator Collaborations</h2>
              <p className={styles.content}>
                Payments made for influencer collaborations, campaigns, or digital product purchases are governed by
                specific terms between the brand and the creator. Collably acts only as a facilitator and holds no
                liability for refunds in such arrangements.
              </p>
              <p className={styles.content}>
                Any disputes or refund requests must be resolved directly between the involved parties.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Chargebacks & Disputes</h2>
              <div className={styles.warningBox}>
                <p className={styles.content}>
                  <strong>
                    Initiating a chargeback without contacting us first may lead to suspension or permanent deactivation
                    of your account.
                  </strong>
                </p>
                <p className={styles.content}>
                  We're here to help — if something's gone wrong, please contact our support team and we'll work to make
                  it right.
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Contact Us</h2>
              <div className={styles.contactSection}>
                <p className={styles.content}>
                  For any questions related to your billing, subscription, or account, please reach out to:
                </p>
                <div className={styles.contactDetails}>
                  <p className={styles.content}>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:hello@collably.in" className={styles.emailLink}>
                      hello@collably.in
                    </a>
                  </p>
                </div>
              </div>
            </section>

            <section className={styles.footer}>
              <div className={styles.footerContent}>
                <p className={styles.content}>
                  Thank you for choosing Collably. We are committed to providing transparent and fair policies for all
                  our users.
                </p>
                <p></p>
              </div>
            </section>
          </div>
        </div>

        <FooterShop />
      </div>
    </div>
  )
}
