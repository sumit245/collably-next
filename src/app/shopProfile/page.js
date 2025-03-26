
"use client";

import { useState } from "react";
import stylesShop from "../shop/StyleShop.module.css";
import FooterShop from "../components/FooterShop";
import CreatorHome from "../components/CreatorHome";
import {useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from "next/link";

import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  IndianRupee,
  LinkIcon,
  Instagram,
  Youtube,
  Phone,
  Settings, 
  UserRoundCog,
  Store,
  FileText,
  Share2,
  Users,
  UserRound,
  LogOut,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import styles from "../creatorFeedProfile/profile.module.css";
import Footer from "../components/FooterShop"
import Header from "../components/HeaderShop"
import { LikeProvider } from "../actions/LikeContext"
import { logout } from '../actions/auth';


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const menuRef = useRef(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const referrals = useSelector((state) => state.brands?.referrals || [])
  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false); // Close the menu after logout
  };

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <div className={styles.container}>
          {/* <CreatorHome /> */}

          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerText}>
              <Link href="#" className={styles.backButton}>
                <ChevronLeft size={24} />
              </Link>
              <h1>Profile</h1>
            </div>
            <div className={styles.profileCard}>
              <div className={styles.avatar}>
                <div className={styles.circle}>
                  <Image
                    src={user?.avatar || "/images/banavt1.png"}
                    alt="User avatar"
                    width={40}
                    height={40}
                    className={styles.avatar}
                  />
                </div>
                <div className={styles.name}>
                  <h2 className={styles.userName}>{user?.fullname}</h2>
                </div>
              </div>
            </div>
            <div className={styles.userInfo}>
              <div className={styles.card}>
                <p className={styles.label}>No of MyLinks:</p>
                <p className={styles.value}>{referrals?.length || 0} </p>
              </div>
              <div className={styles.card}>
                <p className={styles.label}>Total Profit:</p>
                <p className={styles.value}>₹100</p>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className={styles.moneySection}>
            <h3>Profile</h3>
            <div className={styles.container}>
            <Link href="/userProfileShop">
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <UserRound size={18} />
                  </div>
                  <span>My Profile</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
              </Link>
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <IndianRupee size={18} />
                  </div>
                  <span>My Earnings</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>

              <Link href="/CreatorShop">
                <div className={styles.item}>
                  <div className={styles.itemData}>
                    <div className={styles.iconContainer}>
                      <Store size={18} />
                    </div>
                    <span>My Shop</span>
                  </div>
                  <ChevronRight className={styles.chevron} />
                </div>
              </Link>

              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <UserRoundCog size={18} />
                  </div>
                  <span>My User ID</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className={styles.reportsSection}>
            <h3>Analytics</h3>
            <div className={styles.container}>
              <Link href="/myLinks">
                <div className={styles.item}>
                  <div className={styles.itemData}>
                    <div className={styles.iconContainer}>
                      <LinkIcon size={18} />
                    </div>
                    <div className="ml-4 flex items-center">
                      <span>My Links</span>
                    </div>
                    {/* <span className={styles.subText}>
                    New
                  </span> */}
                  </div>
                  <ChevronRight className={styles.chevron} />
                </div>
              </Link>
              <Link href="/CreatorAnalytics">
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <FileText size={18} />
                  </div>
                  <div>
                    <span>My Reports</span>
                  </div>
                  {/* <span className={styles.subText}>
                    New
                  </span> */}
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
</Link>
     </div>
          </div>

          {/* Exclusive Deals Section */}
          <div className={styles.exclusiveToolsSection}>
            <h3>Exclusive Deals</h3>
            <div className={styles.container}>
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <FaWhatsapp size={18} />
                  </div>
                  <span>Join our Whatsapp Channel</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <Users size={18} />
                  </div>
                  <span>Join our Creators Group</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
            </div>
          </div>

          {/* Earn Extra Section */}
          <div className={styles.exclusiveToolsSection}>
            <h3>Earn Extra Profit</h3>
            <div className={styles.container}>
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <Share2 size={18} />
                  </div>
                  <span>Refer & Earn</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <Users size={18} />
                  </div>
                  <span>Referral Network</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
            </div>
          </div>

          {/* Collaby University Section */}
          <div className={styles.exclusiveToolsSection}>
            <h3>Collaby University</h3>
            <div className={styles.container}>
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <Share2 size={18} />
                  </div>
                  <span>Learn How Collably Works</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <Users size={18} />
                  </div>
                  <span>Latest Blogs & Articles</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <Users size={18} />
                  </div>
                  <span>Quick Tips</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
            </div>
          </div>

          {/* Get Help Section */}
          <div className={styles.exclusiveToolsSection}>
            <h3>Get Help</h3>
            <div className={styles.container}>
           
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <Share2 size={18} />
                  </div>
                  <span>FAQ's</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
            
             <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <Users size={18} />
                  </div>
                  <span>Raise a Ticket</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
              <Link href="/contact-us">
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <Users size={18} />
                  </div>
                  <span>Chat with us</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
              </Link>
              <Link href="/contact-us">
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <Users size={18} />
                  </div>
                  <span>Email us</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
              </Link>
              <Link href="/contact-us">
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <Users size={18} />
                  </div>
                  <span>Call us</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
              </Link>
            </div>
          </div>

          {/* More Section */}
          <div className={styles.exclusiveToolsSection}>
            <h3>More</h3>
            <div className={styles.container}>
            <Link href="/updateUser">
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <Settings  size={18} />
                  </div>
                  <span>Account Settings</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
              </Link>
              <Link href="/termsCreator">
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <Users size={18} />
                  </div>
                  <span>Terms & Conditions</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
              </Link>
              <Link href="/privacyCreator">
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <Users size={18} />
                  </div>
                  <span>Privacy Policy</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
              </Link>
            </div>
          </div>

          {/* Exclusive Tools Section */}
          <div className={styles.exclusiveToolsSection}>
            <h3>Exclusive Tools</h3>
            <div className={styles.container}>
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <Share2 size={18} />
                  </div>
                  <span>Coming soon</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
            </div>
          </div>

          {/* Leaderboard Section */}
          <div className={styles.exclusiveToolsSection}>
            <h3>Leaderboard</h3>
            <div className={styles.container}>
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <Share2 size={18} />
                  </div>
                  <span>Coming soon</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
            </div>
          </div>

          {/* My Bookings Section */}
          <div className={styles.exclusiveToolsSection}>
            <h3>My Bookings</h3>
            <div className={styles.container}>
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <div className={styles.iconContainer}>
                    <Share2 size={18} />
                  </div>
                  <span>Coming soon</span>
                </div>
                <ChevronRight className={styles.chevron} />
              </div>
            </div>
          </div>

          {/* Follow Section */}
          <div className={styles.exclusiveToolsSection}>
            <h3>Follow us</h3>
            <div className={styles.followContainer}>
              <div className={styles.item}>
                <div className={styles.itemData}>
                  <a href="#" aria-label="Instagram">
                    <Instagram className={styles.socialIcon} />
                  </a>
                  <a href="#" aria-label="WhatsApp">
                    <Phone className={styles.socialIcon} />
                  </a>
                  <a href="#" aria-label="YouTube">
                    <Youtube className={styles.socialIcon} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className={styles.logoutButtonContainerShop}>
            {user ? (
              <button className={styles.logoutButton} onClick={handleLogout}>
                <span>Logout</span>
                <LogOut className={styles.logoutIcon} />
              </button>
            ) : (
              <button
                className={styles.logoutButton}
                onClick={() =>
                  router.push(`/login?redirect=${encodeURIComponent("/shop")}`)
                }
              >
                <span>Login</span>
                <LogOut className={styles.logoutIcon} />
              </button>
            )}
          </div>
        </div>
        <FooterShop />
      </div>
    </div>
  );
}