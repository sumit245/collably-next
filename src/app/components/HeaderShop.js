// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { useContext } from 'react';
// import styles from '../shop/StyleShop.module.css';
// import { LikeContext } from '../actions/LikeContext'; 

// export default function Header() {
//   const { likeCount, cartCount } = useContext(LikeContext); // Accessing like count

//   return (
//     <header className={styles.header}>
//       <button className={styles.menuBtn}>
//         <Link href="/">
//           <Image src="/images/hamburger.svg" alt="Menu" width={24} height={24} />
//         </Link>
//       </button>
//       <div className={styles.logo}>
//         <Link href="/shop">
//           <Image src="/images/c-official-logo.png" alt="logo" width={90} height={40} />
//         </Link>
//       </div>
//       <div className={styles.headerIconsShop}>
//         <button className={styles.iconBtnShop}>
//           <Image src="images/search-blue.svg" alt="Search" width={24} height={24} />
//         </button>
//         <button className={styles.iconBtnShop}>
//         <Link href="/product">
//           <Image src="images/wishlist-blue.svg" alt="Wishlist" width={24} height={24} />
//           </Link>
//           <span className={styles.counter}>{likeCount}</span>
//         </button>
//         <button className={styles.iconBtnShop}>
//           <Link href="/cart">
//             <Image src="images/cart-blue.svg" alt="Cart" width={24} height={24} />
//           </Link>
//           <span className={styles.counter}>{cartCount}</span>
//         </button>
//       </div>
//     </header>
//   );
// }


'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useContext, useState } from 'react';
import styles from '../shop/StyleShop.module.css';
import { LikeContext } from '../actions/LikeContext';
import { Users, GraduationCap, Bot, MessageSquareMore, Trophy, Users2, MessageCircle, HelpCircle, Instagram, Youtube, Phone, ArrowRight } from 'lucide-react';

export default function Header() {
  const { likeCount, cartCount } = useContext(LikeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { icon: Users, text: "Collab", link: "/collab" },
    { icon: GraduationCap, text: "Collably University", link: "/university" },
    { icon: Bot, text: "AI Tools", link: "/ai-tools" },
    { icon: MessageSquareMore, text: "Auto Reply+ (Coming Soon)", link: "#" },
    { icon: Trophy, text: "Leaderboard (Coming Soon)", link: "#" },
    { icon: Users2, text: "Community (Coming Soon)", link: "#" },
    { icon: MessageCircle, text: "Feedback", link: "/feedback" },
    { icon: HelpCircle, text: "Help", link: "/help" },
  ];

  return (
    <>
      <div className={`${styles.containerHamburger} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.menuOverlay} onClick={toggleMenu}></div>
        <div className={styles.menuContent}>
          <div className={styles.menuHeader}>
            <div className={styles.userGreeting}>Hello Creator !</div>
          </div>
          <nav className={styles.menuNav}>
            {menuItems.map((item, index) => (
              <Link href={item.link} key={index} className={styles.menuItem}>
                <item.icon size={24} />
                <span>{item.text}</span>
                
              </Link>
            ))}
          </nav>
          <div className={styles.socialLinks}>
            <h3>Follow us</h3>
            <div className={styles.socialIcons}>
              <Link href="#"><Instagram size={32} /></Link>
              <Link href="#"><Phone size={32} /></Link>
              <Link href="#"><Youtube size={32} /></Link>
            </div>
          </div>
          <button className={styles.logoutButton}>
            Logout
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <header className={styles.header}>
        <button className={styles.menuBtn} onClick={toggleMenu}>
          <Image src="/images/hamburger.svg" alt="Menu" width={24} height={24} />
        </button>
        <div className={styles.logo}>
          <Link href="/shop">
            <Image src="/images/c-official-logo.png" alt="logo" width={90} height={40} />
          </Link>
        </div>
        <div className={styles.headerIconsShop}>
          <button className={styles.iconBtnShop}>
            <Image src="/images/search-blue.svg" alt="Search" width={24} height={24} />
          </button>
          <button className={styles.iconBtnShop}>
            <Link href="/product">
              <Image src="/images/wishlist-blue.svg" alt="Wishlist" width={24} height={24} />
            </Link>
            <span className={styles.counter}>{likeCount}</span>
          </button>
          <button className={styles.iconBtnShop}>
            <Link href="/cart">
              <Image src="/images/cart-blue.svg" alt="Cart" width={24} height={24} />
            </Link>
            <span className={styles.counter}>{cartCount}</span>
          </button>
        </div>
      </header>
    </>
  );
}