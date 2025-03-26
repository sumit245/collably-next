'use client'

import styles from './page.module.css';
import stylesShop from "../shop/StyleShop.module.css";
import FooterCreator from "../components/FooterCreator";
import CreatorHome from "../components/CreatorHome";

export default function TermsAndConditions() {
  return (
    <main className={styles.container}>
        <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
             <CreatorHome />
      <h1 className={styles.title}>Terms and Conditions</h1>
      
      <div>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Introduction</h2>
          <p className={styles.content}>
            Welcome to Collably. These Terms and Conditions govern your use of the Collably platform and services, including our website, mobile applications, and all related services (collectively, the "Platform"). By accessing or using Collably, you agree to be bound by these Terms.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Definitions</h2>
          <p className={styles.content}>
            "User," "you," and "your" refer to individuals who access or use the Platform.
            "Content" refers to any information, text, graphics, photos, videos, or other materials uploaded, downloaded, or appearing on the Platform.
            "Seller" refers to users who offer products or services for sale on the Platform.
            "Buyer" refers to users who purchase products or services on the Platform.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Account Registration</h2>
          <p className={styles.content}>
            To use certain features of the Platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. User Conduct</h2>
          <p className={styles.content}>
            You agree not to use the Platform to:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Violate any applicable law or regulation</li>
            <li className={styles.listItem}>Infringe the rights of any third party</li>
            <li className={styles.listItem}>Post or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
            <li className={styles.listItem}>Impersonate any person or entity</li>
            <li className={styles.listItem}>Engage in any activity that interferes with or disrupts the Platform</li>
            <li className={styles.listItem}>Attempt to gain unauthorized access to the Platform or its related systems</li>
          </ul>
        </section>

       

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Changes to Terms</h2>
          <p className={styles.content}>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact Us</h2>
          <p className={styles.content}>
            If you have any questions about these Terms, please contact us at legal@collably.com.
          </p>
        </section>

        <section className={styles.footer}>
          <p>
            Last updated: March 26, 2025
          </p>
        </section>
      </div>
      <FooterCreator />
      </div>
      </div>
    </main>
  );
}
