import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function FooterComponent() {
  return (
    <footer>
      <div className="top-footer">
        <div className="container4">
          <div className="footer-item">
            <div className="f-1">
              <div className="footer-header-1">
                <h2>Subscribe to our newsletter</h2>
                <p>
                  Stay in the loop & Signup for the Collably newsletter
                </p>
                <p>
                  Or email us at{" "}
                  <a href="mailto:yourname@example.com">
                    hellocollably@gmail.com
                  </a>
                </p>
                <div className="logo-footer">
                  <Image
                    className="footer-logo-img"
                    src="/images/c-logo.png"
                    alt="Collably Logo"
                    width={150}
                    height={50}
                  />
                </div>
              </div>
              <div className="footer-top-1">
                <div className="footer-header-2">
                  <div className="links">
                    <h3>Help & Company</h3>
                    <ul className="ul-list">
                      <li>
                        <a href="#">Home</a>
                      </li>
                      <li>
                        <a href="/creatorDashboardEntry">Creators</a>
                      </li>
                      <li>
                        <a href="/brand">Brands</a>
                      </li>
                      <li>
                        <a href="/shop">Shop</a>
                      </li>
                      <li>
                        <a href="#">University</a>
                      </li>
                      <li>
                        <a href="/contact-us">Contact Us</a>
                      </li>
                    </ul>
                  </div>
                </div>

              <div className="footer-column">
                <h3>Legal</h3>
                <ul>
                  <li><Link href="/privacyShop">Privacy Policy</Link></li>
                  <li><Link href="/termsofUse">Terms of Use</Link></li>
                  <li><Link href="/cancelRefundPolicy">Cancellation & Refund Policy</Link></li>
                </ul>
              </div>

                <div className="right-text">
                  <h3>Social</h3>
                  <ul className="icon-btn">
                    <li>
                      <Link href="#">
                        <Image
                          src="/images/001-facebook.png"
                          alt="Facebook"
                          width={24}
                          height={24}
                          className="icon-img"
                        />
                        Facebook
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Image
                          src="/images/002-instagram.png"
                          alt="Twitter"
                          width={24}
                          height={24}
                          className="icon-img"
                        />
                        Instagram
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Image
                          src="/images/003-youtube.png"
                          alt="Instagram"
                          width={24}
                          height={24}
                          className="icon-img"
                        />
                        Youtube
                      </Link>
                    </li>
                    {/* <li>
                      <Link href="#">
                        <Image
                          src="/images/004-logos.png"
                          alt="LinkedIn"
                          width={24}
                          height={24}
                          className="icon-img"
                        />
                        Twitter
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-footer">
        <div className="container4">
          <div className="footer-item">
            <div className="fi-2">
              <div className="left-text">
                <p>Powered by NextMillion Technology Private Limited</p>
              </div>
              <div className="right-text">
                <p> Terms & Conditions </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}