"use client"

import styles from "../termsCreator/page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterShop from "../components/FooterShop"
import Header from "../components/HeaderShop"

export default function PrivacyPolicy() {
  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <Header />

        <div className={styles.privacyContainer}>
          <div className={styles.privacyHeader}>
            <h1 className={styles.title}>Privacy Policy</h1>
          </div>

          <div className={styles.privacyContent}>
            <section className={styles.section}>
              <div className={styles.introSection}>
                <p className={styles.content}>
                  Welcome to <strong>Collably</strong>. Collably is a technology platform that brings together creators,
                  brands, and consumers through original, engaging content. It is owned and operated by NextMillion
                  Technology Private Limited.
                </p>
                <p className={styles.content}>
                  This Privacy Policy explains how we collect, use, share, and safeguard your personal information when
                  you use our websites, mobile applications, services, or any other feature operated by us, collectively
                  referred to as the "Services".
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>What Information We Collect</h2>

              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Information You Provide Directly</h3>
                <p className={styles.content}>
                  We collect personal information directly from you when you register for an account, create a profile,
                  apply to a campaign, or interact with any features on the platform:
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>Name, email address, and phone number</li>
                  <li className={styles.listItem}>Location and social media handles</li>
                  <li className={styles.listItem}>Payment details and transaction information</li>
                  <li className={styles.listItem}>
                    For creators: content style, audience insights, and areas of interest
                  </li>
                  <li className={styles.listItem}>For brands: company profile, campaigns, and marketing preferences</li>
                </ul>
              </div>

              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Information We Collect Automatically</h3>
                <p className={styles.content}>We automatically collect technical data when you access our Services:</p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>IP address, browser type, and device information</li>
                  <li className={styles.listItem}>Time spent on platform, pages viewed, and links clicked</li>
                  <li className={styles.listItem}>Interactions with creators, products, affiliate links, and ads</li>
                  <li className={styles.listItem}>Location information based on IP or device settings</li>
                  <li className={styles.listItem}>Cookies and similar tracking technologies</li>
                </ul>
              </div>

              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Information from Third Parties</h3>
                <p className={styles.content}>
                  We may receive personal data from third parties, including publicly available information, data from
                  linked social media accounts, or interactions through partner websites.
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
              <p className={styles.content}>We use your personal information to provide and improve our Services:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>Provide and improve the Services</li>
                <li className={styles.listItem}>Allow you to discover and monetize content</li>
                <li className={styles.listItem}>Facilitate brand collaborations</li>
                <li className={styles.listItem}>Personalize your experience on the platform</li>
                <li className={styles.listItem}>Security purposes and internal analytics</li>
                <li className={styles.listItem}>Customer support and platform updates</li>
                <li className={styles.listItem}>Send promotional messages (you can opt out anytime)</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>How We Share Your Information</h2>
              <div className={styles.highlightBox}>
                <p className={styles.content}>
                  <strong>We do not sell your personal data.</strong> However, we may share your information with:
                </p>
              </div>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  Trusted third-party service providers (payment processors, analytics providers, hosting companies)
                </li>
                <li className={styles.listItem}>
                  Collaboration partners for brand campaigns (limited relevant data only)
                </li>
                <li className={styles.listItem}>
                  All third parties comply with appropriate confidentiality and data protection obligations
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Data Storage and Security</h2>
              <p className={styles.content}>
                We store and process your data on servers located in <strong>India</strong>. We implement physical,
                administrative, and technical safeguards to protect your information against unauthorized access, loss,
                or misuse.
              </p>
              <div className={styles.noteBox}>
                <p className={styles.content}>
                  <em>
                    Note: No method of transmission over the internet is 100% secure, and we cannot guarantee absolute
                    security.
                  </em>
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Your Rights</h2>
              <p className={styles.content}>You have the right to:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>Access your personal information stored with us</li>
                <li className={styles.listItem}>Correct or update your personal information</li>
                <li className={styles.listItem}>Delete your personal information</li>
                <li className={styles.listItem}>Control cookie usage via your browser settings</li>
              </ul>
              <p className={styles.content}>
                You can exercise these rights by logging into your account or contacting our support team.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Age Restrictions</h2>
              <div className={styles.warningBox}>
                <p className={styles.content}>
                  <strong>Collably is not intended for users under the age of 13.</strong> If you are under 13 years of
                  age, please do not use our platform or submit any personal information to us. If we learn that we have
                  collected data from a minor without appropriate consent, we will take immediate steps to delete that
                  information.
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Changes to This Privacy Policy</h2>
              <p className={styles.content}>
                This Privacy Policy may be updated periodically. When we make significant changes, we will revise the
                "Effective Date" at the top of the policy and provide notice within the platform if necessary. Continued
                use of the Services after such changes means that you agree to the revised terms.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Contact Us</h2>
              <div className={styles.contactSection}>
                <p className={styles.content}>
                  If you have any questions or concerns regarding this policy or your data, you can contact our support
                  team:
                </p>
                <div className={styles.contactDetails}>
                  <p className={styles.content}>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:hello@collably.in" className={styles.emailLink}>
                      hello@collably.in
                    </a>
                  </p>
                  <p className={styles.content}>
                    <strong>Support:</strong>{" "}
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
                  Thank you for trusting Collably. We are committed to protecting your privacy and ensuring transparency
                  in how we use your information.
                </p>
              </div>
            </section>
          </div>
        </div>

        <FooterShop />
      </div>
    </div>
  )
}