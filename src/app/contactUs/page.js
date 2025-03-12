import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { SocialCard } from "../components/Cards/socialCard";
// import Link from "next/link";
import styles from "./ContactPage.module.css"; // Import CSS Module

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <div className={styles.decorativeElements}></div>
      <div className={styles.decorativeElementsBottom}></div>
      <div className={styles.decorativeElementsTop}></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className={styles.headingContainer}>
            <div className={styles.headingAccent}>
              <span className={styles.headingLine}></span>
              <h1 className={styles.headingTitle}>Let's Connect</h1>
            </div>
            <p className={styles.subHeading}>
              Reach out through your preferred channel and join our community
            </p>
          </div>

          <div className={styles.gridWrapper}>
            <div className={styles.socialSection}>
              <div className={styles.socialContent}>
                <div className={styles.socialHeader}>
                  <div className={styles.socialLine}></div>
                  <h2 className={styles.socialTitle}>Social Platforms</h2>
                </div>

                <div className={styles.socialGrid}>
                  <SocialCard
                    icon={<Facebook className="h-6 w-6" />}
                    platform="Facebook"
                    description="Join our community of 50K+ followers"
                    href="https://facebook.com/yourcompany"
                    color="bg-blue-500"
                  />
                  <SocialCard
                    icon={<Instagram className="h-6 w-6" />}
                    platform="Instagram"
                    description="See our latest visual stories"
                    href="https://instagram.com/yourcompany"
                    color="bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500"
                  />
                  <SocialCard
                    icon={<Twitter className="h-6 w-6" />}
                    platform="Twitter"
                    description="Get real-time updates and news"
                    href="https://twitter.com/yourcompany"
                    color="bg-blue-400"
                  />
                  <SocialCard
                    icon={<Linkedin className="h-6 w-6" />}
                    platform="LinkedIn"
                    description="Connect with our professional network"
                    href="https://linkedin.com/company/yourcompany"
                    color="bg-blue-700"
                  />
                  <SocialCard
                    icon={<Youtube className="h-6 w-6" />}
                    platform="YouTube"
                    description="Watch our latest video content"
                    href="https://youtube.com/c/yourcompany"
                    color="bg-red-600"
                  />
                </div>
              </div>
            </div>

            <div className={styles.contactMethodSection}>
              <div className={styles.contactSticky}>
                <div className={styles.contactHeader}></div>
                <div className={styles.contactContent}>
                  <div className={styles.contactIconWrapper}>
                    <Mail className="h-6 w-6 text-[#ff0055]" />
                  </div>
                  <h2 className={styles.contactTitle}>Direct Contact</h2>

                  <div className="space-y-6">
                    {/* <ContactMethod
                      icon={<Mail className="h-5 w-5" />}
                      title="Email Us"
                      value="hello@yourcompany.com"
                      href="mailto:hello@yourcompany.com"
                    /> */}

                    {/* <ContactMethod
                      icon={<Phone className="h-5 w-5" />}
                      title="Call Us"
                      value="+1 (234) 567-890"
                      href="tel:+1234567890"
                    /> */}

                    {/* <ContactMethod
                      icon={<MapPin className="h-5 w-5" />}
                      title="Visit Our Office"
                      value={
                        <>
                          123 Business Avenue
                          <br />
                          San Francisco, CA 94107
                        </>
                      }
                      href="https://maps.google.com/?q=San+Francisco+CA+94107"
                      isMap
                    /> */}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h3 className="font-medium text-gray-900 mb-3">Business Hours</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span>10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.ctaSection}>
            <div className={styles.ctaBackground}></div>
            <div className={styles.ctaContent}>
              <div className="md:flex items-center justify-between">
                <div className={styles.ctaHeaderText}>
                  <h2 className="text-2xl font-bold mb-2">Want to collaborate?</h2>
                  <p className="text-gray-600">
                    We're always open to discussing new projects and partnerships
                  </p>
                </div>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-xl bg-[#ff0055] px-6 py-4 text-white font-medium shadow-lg hover:bg-[#e0004b] transition-all duration-300 hover:shadow-xl hover:shadow-[#ff0055]/20 whitespace-nowrap"
                >
                  Learn more about us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

