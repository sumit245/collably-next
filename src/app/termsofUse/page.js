"use client"

import styles from "../../app/termsCreator/page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterShop from "../components/FooterShop"
import Header from "../components/HeaderShop"

export default function TermsOfUse() {
  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <Header />

        <div className={styles.termsContainer}>
          <div className={styles.termsHeader}>
            <h1 className={styles.title}>Terms of Use - Collably Platform</h1>
            
          </div>

          <div className={styles.termsContent}>
            <section className={styles.section}>
              <div className={styles.introSection}>
                <p className={styles.content}>
                  NextMillion Technology Private Limited ("Company") operates the mobile and web application Collably
                  and the website {" "}  
                  <a
                  href="https://www.collably.in/"
                  className={styles.emailLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.collably.in
                </a>
                , collectively referred to as the "Platform". These Terms and
                  Conditions ("Terms") govern your access to and use of the Platform and the services offered through it
                  ("Services").
                </p>
                <p className={styles.content}>
                  This document is an electronic record under the Information Technology Act, 2000 and applicable rules.
                  These Terms form a binding legal agreement between you (the "User") and the Company.
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Agreement to Terms</h2>
              <p className={styles.content}>By using the Platform, you confirm that:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>You have the legal authority and capacity to agree to these Terms</li>
                <li className={styles.listItem}>You are at least 18 years old</li>
                <li className={styles.listItem}>You are a resident of India</li>
              </ul>
              <p className={styles.content}>
                If you are using the Platform on behalf of an organization or legal entity, you represent that you have
                the authority to bind that entity to these Terms.
              </p>
              <p className={styles.content}>
                These Terms also include our Privacy Policy and any other policies, guidelines, or notices issued by us
                from time to time. By accessing or using the Platform or any of its Services, you agree to be bound by
                these Terms.
              </p>
              <p className={styles.content}>
                We reserve the right to modify these Terms at any time by updating them on the Platform. Your continued
                use of the Platform after such updates constitutes your acceptance of the revised Terms. We encourage
                you to review the Terms regularly.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Our Services</h2>
              <p className={styles.content}>
                Collably, owned and operated by NextMillion Technology Private Limited, is a platform that connects
                creators, influencers, brands, and consumers. It enables users to discover and purchase products
                recommended by influencers via curated content.
              </p>
              <p className={styles.content}>As a registered user, you can:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  Explore and shop content from influencers across social media, blogs, websites, and other digital
                  platforms
                </li>
                <li className={styles.listItem}>
                  Receive curated content and product recommendations via emails or within the app
                </li>
                <li className={styles.listItem}>
                  Engage with content directly within the Platform and enjoy a personalized shopping experience
                </li>
              </ul>
              <p className={styles.content}>
                Collably facilitates relationships between influencers, merchants (brands and advertisers), and
                consumers by supporting the sale of third-party products and managing influencer commissions.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Updates to Terms</h2>
              <p className={styles.content}>
                These Terms, including our Privacy Policy and Cookie Policy, may be updated from time to time. We will
                notify you of changes via the Platform or other communication methods. You may be required to accept new
                terms to continue using our Services.
              </p>
              <p className={styles.content}>
                If you do not agree to the changes, you may discontinue use and close your account. Continued use of the
                Platform signifies your agreement to the updated Terms and Policies.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Termination of Services</h2>
              <p className={styles.content}>
                We reserve the right to change, suspend, or terminate your access to the Platform at any time, with or
                without notice, particularly if we believe you have violated these Terms.
              </p>
              <p className={styles.content}>Upon termination:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  Any obligations, warranties, or liabilities incurred prior to termination will survive
                </li>
                <li className={styles.listItem}>
                  Sections 14 to 20 (including dispute resolution and limitations) shall remain in effect
                </li>
                <li className={styles.listItem}>
                  We may, but are not obligated to, retain any content you have provided
                </li>
                <li className={styles.listItem}>
                  We are not liable for any loss or damage arising from the suspension or discontinuation of the
                  Services, including but not limited to lost data, revenue, or opportunities
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Eligibility to Use Our Services</h2>
              <p className={styles.content}>To use our Services, you must:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>Be at least 18 years old</li>
                <li className={styles.listItem}>Be capable of entering into a legally binding contract</li>
                <li className={styles.listItem}>
                  If under the age of majority in your jurisdiction, obtain agreement from a parent or legal guardian,
                  who must also accept responsibility for your use
                </li>
              </ul>
              <div className={styles.warningBox}>
                <p className={styles.content}>
                  <strong>Collably does not permit use of its Services by individuals under the age of 18.</strong>
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Registration and Account Responsibility</h2>
              <p className={styles.content}>
                To access certain features, you must register and create an account. During registration, you will be
                asked to provide personal details and create a username and password.
              </p>
              <p className={styles.content}>You agree to:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>Provide accurate and updated information</li>
                <li className={styles.listItem}>Keep your login credentials confidential</li>
                <li className={styles.listItem}>Be responsible for all activities under your account</li>
                <li className={styles.listItem}>Immediately notify us of any unauthorized use</li>
              </ul>
              <p className={styles.content}>
                You may not transfer, sell, or assign your account to anyone else. We reserve the right to change your
                credentials if required and assume that all activities under your account are authorized by you.
              </p>
              <p className={styles.content}>You confirm that:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>The information you provide is true and not confidential</li>
                <li className={styles.listItem}>You are not a competitor or acting on behalf of a competitor</li>
                <li className={styles.listItem}>You are not using the Services for investigation or legal action</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Software Updates</h2>
              <p className={styles.content}>
                From time to time, we may release updates, enhancements, or new features. You may be required to
                download the latest version to continue accessing the Platform. These updates are governed by these
                Terms unless otherwise stated.
              </p>
              <p className={styles.content}>
                Not all updates will include new features, and we are not obligated to provide future upgrades or
                improvements.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Support</h2>
              <p className={styles.content}>
                Collably may offer user support at its discretion. However, we reserve the right to modify, suspend, or
                discontinue technical support at any time, with or without notice.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Messages and Communications</h2>
              <p className={styles.content}>
                By using our Services, you consent to receive communications from us, including service notifications,
                updates, and promotional content. These communications may be sent via email, in-app messages, or
                through other contact details you've provided.
              </p>
              <div className={styles.noteBox}>
                <p className={styles.content}>
                  It is your responsibility to keep your contact information, particularly your email address, accurate
                  and up to date. Any message sent to your registered email will be considered delivered, read, and
                  received—regardless of whether you actually access or read it.
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Automated Recommendations</h2>
              <p className={styles.content}>
                Collably uses automated systems to personalize your experience. We may analyze your activity,
                preferences, and interactions (as well as data from other users) to suggest content, creators, or
                products that may interest you.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Disclaimers and Limitations of Responsibility</h2>
              <p className={styles.content}>
                Our Services may contain third-party content, including that from Influencers and Merchants. This
                content is not controlled by Collably, and we are not responsible for its accuracy, quality, or impact.
              </p>
              <p className={styles.content}>You understand and agree that:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  Collably makes no guarantees, warranties, or promises—express or implied—about the reliability,
                  quality, or performance of products or services offered by any Influencer or Merchant
                </li>
                <li className={styles.listItem}>
                  Statements or opinions shared on the Platform, whether by influencers, users, or third parties, are
                  their own and do not represent Collably
                </li>
                <li className={styles.listItem}>
                  We reserve the right to alter, remove, or discontinue any part of our Services at any time without
                  prior notice and without liability
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Prohibited Activities and Usage Restrictions</h2>
              <p className={styles.content}>By accessing and using our Platform, you agree not to:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  Copy, distribute, or create derivative works based on our content without permission
                </li>
                <li className={styles.listItem}>
                  Use bots, spiders, or any automated tools to access, scrape, or extract data from the Platform
                </li>
                <li className={styles.listItem}>
                  Engage in activities such as "screen scraping," "database scraping," or similar tactics for
                  unauthorized data gathering
                </li>
                <li className={styles.listItem}>Frame or mirror any part of our Platform without written consent</li>
                <li className={styles.listItem}>
                  Use Collably's trademarks, brand names, or proprietary materials in meta tags, hidden text, or other
                  deceptive formats
                </li>
                <li className={styles.listItem}>
                  Attempt to interfere with the Platform's functionality, compromise its security, or bypass any
                  protective measures
                </li>
                <li className={styles.listItem}>
                  Take actions that place an excessive load on our servers or hosting infrastructure
                </li>
                <li className={styles.listItem}>
                  Intentionally provide false information or engage in any activity intended to harm or disrupt the
                  Services
                </li>
                <li className={styles.listItem}>
                  Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code or internal
                  workings of Collably's software or systems
                </li>
                <li className={styles.listItem}>
                  Violate any specific rules or policies published on the Platform, including those related to features,
                  forums, or applications
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Your Representations and Warranties</h2>
              <p className={styles.content}>
                By using Collably, you confirm that you own the content you upload or have secured all necessary rights
                and permissions to share it through our platform. This includes the authority to grant us the rights
                outlined in this agreement, without creating legal obligations or liabilities for Collably.
              </p>
              <p className={styles.content}>
                You also affirm that your content does not infringe on anyone else's intellectual property, violate
                their privacy or publicity rights, or break any laws or regulations.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Your License to Collably</h2>
              <p className={styles.content}>
                When you upload content to Collably, you give us a non-exclusive, royalty-free, worldwide, and perpetual
                license to use that content in ways we believe are necessary for operating, improving, and promoting the
                platform.
              </p>
              <p className={styles.content}>
                This includes rights such as hosting, distributing, modifying, and publishing your content, as well as
                creating derivative works from it. We may also syndicate your content for broader distribution and use
                it for marketing purposes.
              </p>
              <p className={styles.content}>
                If our services require us to work with third-party platforms, you also grant us the rights needed to
                facilitate that use of your content.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Disclaimers on Shared Content</h2>
              <p className={styles.content}>
                If you choose to share content in public areas of our platform, you do so at your own discretion.
                Collably is not responsible for what others may do with content that is publicly visible, and we
                explicitly disclaim any liability related to the use or distribution of such content by third parties.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Inappropriate Content and Behavior</h2>
              <p className={styles.content}>
                We expect users to maintain a respectful and lawful presence on Collably. Any content or behavior we
                consider offensive, misleading, unlawful, harmful, or otherwise inappropriate may be removed at our sole
                discretion.
              </p>
              <p className={styles.content}>This includes:</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>Impersonation, promoting hate, harassment, or violence</li>
                <li className={styles.listItem}>Sharing obscene or sexually explicit material</li>
                <li className={styles.listItem}>Infringing intellectual property</li>
                <li className={styles.listItem}>Spreading misinformation</li>
                <li className={styles.listItem}>
                  Including sensitive personal information such as passwords or financial details
                </li>
                <li className={styles.listItem}>Mass unsolicited communications</li>
                <li className={styles.listItem}>Using automated tools to scrape, collect, or misuse data</li>
              </ul>
              <p className={styles.content}>
                Violating these expectations may result in immediate and permanent bans from the platform, and in
                serious cases, we may notify your internet service provider.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Child Safety Standards Policy</h2>
              <div className={styles.warningBox}>
                <p className={styles.content}>
                  <strong>Collably strictly prohibits any form of content that exploits or harms children.</strong> This
                  includes, but is not limited to, the creation, sharing, or promotion of child sexual abuse material
                  (CSAM), grooming, sexualization of minors, sextortion, and child trafficking.
                </p>
                <p className={styles.content}>
                  We have zero tolerance for such behavior. If any content related to child abuse is reported, our
                  moderation team investigates and removes it within 48 hours, as per applicable laws and our internal
                  standards.
                </p>
                <p className={styles.content}>
                  Repeat or severe violations may lead to account suspension or legal reporting. We also provide a
                  'Report' feature in the app for users to flag concerning content quickly and securely.
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>In-App Feedback and Reporting</h2>
              <p className={styles.content}>
                To make reporting simple and confidential, we've implemented an in-app feedback feature that allows
                users to report inappropriate content, behavior, or abuse. Users can report suspected child abuse
                directly by selecting the 'Child Abuse' category.
              </p>
              <p className={styles.content}>
                Our moderation team takes these reports seriously and takes action, including content removal, within 48
                hours if the reported material is found to be in violation of our policies.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>External Links and Third-Party Platforms</h2>
              <p className={styles.content}>
                When you follow links from Collably to third-party sites, platforms, or applications, you do so at your
                own risk. While these external platforms may be useful or advertised through our Services, we are not
                responsible for their content, terms of use, or privacy practices.
              </p>
              <p className={styles.content}>
                Collably does not endorse or guarantee the accuracy or quality of any services or information you
                encounter on external platforms. We recommend reviewing the terms and privacy policies of any
                third-party service you access independently, as our agreement applies solely to the use of Collably.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>YouTube Terms of Service</h2>
              <p className={styles.content}>
                Since Collably integrates with YouTube API Services, by using our platform, you also agree to comply
                with{" "}
                <a
                  href="https://www.youtube.com/t/terms"
                  className={styles.emailLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube's Terms of Service
                </a>
                .
              </p>
            </section>

            <section className={styles.footer}>
              <div className={styles.footerContent}>
                <p className={styles.content}>
                  Thank you for using Collably. These Terms of Use help ensure a safe and productive environment for all
                  users of our platform.
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