"use client"

import Link from "next/link"
import Image from "next/image"
import { useContext } from "react"
import { useSelector } from "react-redux"
import styles from "../shop/StyleShop.module.css"
import { LikeContext } from "../actions/LikeContext"
import { DropdownMenu } from "../components/DropdownMenu"

export default function Header() {
  const { likeCount, cartCount } = useContext(LikeContext)
  const user = useSelector((state) => state.auth.user)

  return (
    <header className={styles.header}>
      <DropdownMenu />
      <div className={styles.logo}>
        <Link href="/shop">
          <Image src="/images/c-official-logo.png" alt="logo" width={90} height={40} />
        </Link>
      </div>
      <div className={styles.headerIconsShop}>
        <button className={styles.iconBtnShop}>
          <Image src="images/search-blue.svg" alt="Search" width={24} height={24} />
        </button>
        <button className={styles.iconBtnShop}>
          <Link href="/product">
            <Image src="images/wishlist-blue.svg" alt="Wishlist" width={24} height={24} />
          </Link>
          <span className={styles.counter}>{likeCount}</span>
        </button>
        <button className={styles.iconBtnShop}>
          <Link href="/cart">
            <Image src="images/cart-blue.svg" alt="Cart" width={24} height={24} />
          </Link>
          <span className={styles.counter}>{cartCount}</span>
        </button>
        {user ? (
          <div className={styles.userInfo}>
            <Image
              src={user.avatar || "/images/banavt1.png"}
              alt="User Avatar"
              width={30}
              height={30}
              className={styles.avatarCircle}
            />
            <span className={styles.username}>{user.username}</span>
          </div>
        ) : (
          <Link href="/login" className={styles.loginButton}>
            Login
          </Link>
        )}
      </div>
    </header>
  )
}

