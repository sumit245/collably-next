'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  Megaphone,
  GraduationCap,
  Bot,
  MessageSquare,
  Trophy,
  Users,
  Star,
  HelpCircle,
  Instagram,
  Youtube,
  Phone,
  LogOut,
} from 'lucide-react';
import { logout } from '../actions/auth';
import styles from '../shop/StyleShop.module.css';

export function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const menuItems = [
    { icon: <Megaphone className={styles.menuItemIcon} />, label: 'Women\'s Fashion', comingSoon: false  },
    { icon: <GraduationCap className={styles.menuItemIcon} />, label: 'Men\'s Fashion', comingSoon: false  },
    { icon: <Bot className={styles.menuItemIcon} />, label: 'Beauty Products', comingSoon: false  },
    { icon: <MessageSquare className={styles.menuItemIcon} />, label: 'Exclusive Deals', comingSoon: false },
    { icon: <Trophy className={styles.menuItemIcon} />, label: 'Best Sellers', comingSoon: false},
    { icon: <Users className={styles.menuItemIcon} />, label: 'Trending Products', comingSoon: false },
    { icon: <Star className={styles.menuItemIcon} />, label: 'My Orders' , comingSoon: false  },
    { icon: <HelpCircle className={styles.menuItemIcon} />, label: 'Creators',  comingSoon: false, link: '/creators' },
  ];

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: rect.left, y: rect.bottom });
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false); // Close the menu after logout
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.menuTrigger}`)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdownContainer}>
      <button
        onClick={handleClick}
        className={styles.menuTrigger}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        ☰
        <span className="sr-only">Open menu</span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={`${styles.menuContent} ${isOpen ? styles.open : ''}`}
          role="menu"
        >
          <div className={styles.menuHeader}>
            <h2 className={styles.greeting}>
              {/* {user ? Hello , ${user?.fullname}! : 'Hello User!'} */}
              {user ? `Welcome to Collably ${user?.fullname}!` : 'Hello User!'}
            </h2>
          </div>

          <nav className={styles.menuNav}>
            {menuItems.map((item, index) => (
              <a key={index} href={item.link}  className={styles.menuItem} role="menuitem" >
                <div className={styles.menuItemContent}>
                  {item.icon}
                  <span className={styles.menuItemLabel}>
                    {item.label}
                    {item.comingSoon && (
                      <span className={styles.comingSoon}>(Coming Soon)</span>
                    )}
                  </span>
                </div>
                <ChevronRight className={styles.menuItemArrow} />
              </a>
            ))}
          </nav>

          <div className={styles.menuFooter}>
            <div className={styles.socialSection}>
              <h3>Follow us</h3>
              <div className={styles.socialIcons}>
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

            {user ? (
              <button className={styles.logoutButton}  onClick={handleLogout} >
                <span>Logout</span>
                <LogOut className={styles.logoutIcon} />
              </button>
            ) : (
              <button className={styles.logoutButton}  onClick={() => router.push('/login')} >
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}