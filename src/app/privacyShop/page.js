"use client"

import styles from "../termsCreator/page.module.css"
import stylesShop from "../shop/StyleShop.module.css";
import FooterShop from "../components/FooterShop";
import Header from "../components/HeaderShop"

export default function PrivacyPolicy() {
  return (
    
        <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
             <Header />
      <h1 className={styles.title}>Privacy Policy</h1>

      <div>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Introduction</h2>
          <p className={styles.content}>
            At Collably, we respect your privacy and are committed to protecting your personal data. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you use our social commerce
            platform. Please read this Privacy Policy carefully to understand our practices regarding your personal
            data.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Information We Collect</h2>
          <p className={styles.content}>
            We collect several types of information from and about users of our Platform, including:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bold}>Personal Data:</span> Name, email address, postal address, phone number,
              payment information, and other identifiers by which you may be contacted online or offline.
            </li>
            <li className={styles.listItem}>
              <span className={styles.bold}>Profile Data:</span> Your username, password, purchases, interests,
              preferences, feedback, and survey responses.
            </li>
            <li className={styles.listItem}>
              <span className={styles.bold}>Usage Data:</span> Information about how you use our Platform, products, and
              services.
            </li>
            <li className={styles.listItem}>
              <span className={styles.bold}>Technical Data:</span> Internet protocol (IP) address, browser type and
              version, time zone setting, browser plug-in types and versions, operating system and platform, and other
              technology on the devices you use to access the Platform.
            </li>
            <li className={styles.listItem}>
              <span className={styles.bold}>Marketing and Communications Data:</span> Your preferences in receiving
              marketing from us and our third parties and your communication preferences.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. How We Collect Your Information</h2>
          <p className={styles.content}>
            We use different methods to collect data from and about you including through:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bold}>Direct interactions:</span> You may give us your information by filling in
              forms, creating an account, making purchases, or corresponding with us.
            </li>
            <li className={styles.listItem}>
              <span className={styles.bold}>Automated technologies:</span> As you interact with our Platform, we may
              automatically collect Technical Data about your equipment, browsing actions, and patterns using cookies,
              server logs, and other similar technologies.
            </li>
            <li className={styles.listItem}>
              <span className={styles.bold}>Third parties:</span> We may receive information about you from various
              third parties such as analytics providers, advertising networks, and search information providers.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. How We Use Your Information</h2>
          <p className={styles.content}>We use your information for the following purposes:</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>To create and manage your account</li>
            <li className={styles.listItem}>To process and deliver your orders</li>
            <li className={styles.listItem}>To manage our relationship with you</li>
            <li className={styles.listItem}>To personalize your experience on our Platform</li>
            <li className={styles.listItem}>To improve our Platform, products, and services</li>
            <li className={styles.listItem}>To recommend products or services that may interest you</li>
            <li className={styles.listItem}>To administer and protect our business and the Platform</li>
            <li className={styles.listItem}>To deliver relevant content and advertisements to you</li>
            <li className={styles.listItem}>
              To measure or understand the effectiveness of the advertising we serve to you
            </li>
          </ul>
        </section>


        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Changes to This Privacy Policy</h2>
          <p className={styles.content}>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy
            Policy periodically for any changes.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}> Contact Us</h2>
          <p className={styles.content}>
            If you have any questions about this Privacy Policy, please contact us at privacy@collably.com.
          </p>
        </section>

        <section className={styles.footer}>
          <p>Last updated: March 26, 2025</p>
        </section>
      </div>
       <FooterShop />
            </div>
            </div>
   
  )
}

