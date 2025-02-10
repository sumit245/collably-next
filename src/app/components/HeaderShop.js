"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import styles from "../shop/StyleShop.module.css"
import { DropdownMenu } from "./DropdownMenu"
import { setSearchQuery } from "../store/searchSlice" // We'll create this slice

export default function Header() {
  const likeCount = useSelector((state) => state.likedProducts.count)
  const cartCount = useSelector((state) => state.cart.count)
  const user = useSelector((state) => state.auth.user)
  const router = useRouter()
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const handleLoginRedirect = () => {
    router.push(`/login?redirect=${encodeURIComponent("/shop")}`)
  }

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded)
    if (!isSearchExpanded) {
      setTimeout(() => document.getElementById("search-input").focus(), 100)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    dispatch(setSearchQuery(searchInput))
    setIsSearchExpanded(false)
  }

  return (
    <header className={`${styles.header} ${isSearchExpanded ? styles.expandedHeader : ""}`}>
      <DropdownMenu />
      <div className={styles.logo}>
        <Link href="/shop">
          <Image src="/images/c-official-logo.png" alt="logo" width={90} height={40} />
        </Link>
      </div>
      <div className={styles.headerIconsShop}>
        <button className={styles.iconBtnShop} onClick={handleSearchToggle}>
          <Image src="/images/search-blue.svg" alt="Search" width={24} height={24} />
        </button>
        {isSearchExpanded && (
          <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
            <input
              id="search-input"
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchSubmit}>
              Search
            </button>
          </form>
        )}
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
          <button className={styles.loginButton} onClick={handleLoginRedirect}>
            Login
          </button>
        )}
      </div>
    </header>
  )
}

