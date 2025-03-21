'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../CreatorShop/styles.creatorShop.module.css'
import { Menu, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import PostsTab from './postsTab'
import ReelsTab from './ReelsTab'
import CollectionsTab from './collectionsTab'
import SingleProductLinksTab from './singleProductTab'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { fetchPosts } from "../store/postSlice"



export default function Shop() {
  const [activeTab, setActiveTab] = useState('posts')
  const [activeCount, setActiveCount] = useState(0)
  const user = useSelector((state) => state.auth.user)
  const { posts, status, error } = useSelector((state) => state.posts)
  const router = useRouter()
  const dispatch = useDispatch()
  const userId = user?._id || '';  // Default to an empty string if user is undefined/null

  useEffect(() => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent("/CreatorShop")}`)
    }
  }, [user, router])

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts())
    }
  }, [status, dispatch])

  if (!user) {
    return null
  }

  const tabs = [
    { id: 'posts', label: 'Posts', count: posts.filter(post => post.user?._id === userId && (!post.video || post.video?.length === 0)).length },
    { id: 'reels', label: 'Reels', count: posts.filter(post => post.user?._id === userId && post.video).length },
    { id: 'collections', label: 'Collections', count: 0 },
    { id: 'links', label: 'Single Product Links', count: 0 }
  ];


  useEffect(() => {
    const tab = tabs.find(t => t.id === activeTab)
    setActiveCount(tab?.count || 0)
  }, [activeTab, posts])

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
  }
  console.log("Posts:", posts);
  console.log("Is posts an array?", Array.isArray(posts));

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return <PostsTab posts={posts.filter(post => post.user?._id === user?._id && !post.video)} />;
      case 'reels':
        return <ReelsTab reels={posts.filter(post => post.user?._id === user?._id && post.video)} />;
      case 'collections':
        return <CollectionsTab />;
      case 'links':
        return <SingleProductLinksTab />;
      default:
        return null;
    }
  };


  return (
    <div className={styles.containerShop}>
      <header className={styles.header}>
        <button className={styles.menuButton}>
          <Menu size={24} />
        </button>

        <div className={styles.profileSection}>
          <Image
            src={user.avatar || "/images/banavt1.png"}
            alt="Shop profile"
            width={36}
            height={36}
            className={styles.profileImage}
          />

          <div className={styles.shopInfo}>
            <h1 className={styles.shopName}>My Shop</h1>
            <p className={styles.username}>
              {user?.username || user?.fullname}
            </p>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <Link href="/creatorDashboardVerify">
            <button className={styles.iconButton}>
              <Image
                src="/images/eye-v2.svg"
                alt="View"
                width={16}
                height={16}
                className={styles.iconImage}
              />
            </button>
          </Link>

          <Link href="/creatorDashboardVerify">
            <button className={styles.iconButton}>
              <Image
                src="/images/share-v2.svg"
                alt="Share"
                width={16}
                height={16}
                className={styles.iconImage}
              />
            </button>
          </Link>
        </div>
      </header>

      <div className={styles.filterBar}>
        <button className={styles.filterButton}>  Sort By: Newest first </button>
        <button className={styles.filterButton}> All Filters </button>
        <button className={styles.filterButton}> All Time <ChevronDown size={16} /> </button>
        <button className={styles.filterButton}> View All <ChevronDown size={16} /> </button>
      </div>

      <ul className={styles.tabList}>
        {tabs.map(tab => (
          <li key={tab.id}
            className={`${styles.tabItem}`}
            data-active={activeTab === tab.id}
            onClick={() => handleTabClick(tab.id)} >
            {tab.label}
            {tab.count > 0 && (
              <span className={styles.tabCounter}>({tab.count})</span>
            )}
          </li>
        ))}
      </ul>
      {renderTabContent()}
    </div>
  )
}