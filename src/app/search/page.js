"use client";

import { useState, useEffect, useCallback, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchPosts,
  fetchSavedPosts,
  searchPosts,
  clearSearchResults
} from "../store/postSlice"
import styles from "./SearchSection.module.css"
import Header from "../components/HeaderShop"
import Footer from "../components/FooterShop"
import { LikeProvider } from "../actions/LikeContext"
import Image from "next/image"
import { ChevronDown, Search, X } from 'lucide-react'
import Link from "next/link"
import debounce from 'lodash/debounce'

export default function SearchSection() {
  const dispatch = useDispatch()
  const {
    posts = [],
    savedPosts = [],
    searchResults = [],
    status,
    savedPostsStatus,
    searchStatus,
    error
  } = useSelector(s => s.posts)

  const [activeTab, setActiveTab] = useState("Reels")
  const [collectionSubTab, setCollectionSubTab] = useState("Videos")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedGender, setSelectedGender] = useState("All")
  const [sortOption, setSortOption] = useState("newest")
  const [showSortOptions, setShowSortOptions] = useState(false)
  
  // Refs for dropdown positioning
  const sortButtonRef = useRef(null)
  const sortOptionsRef = useRef(null)
  
  // Close sort options dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortButtonRef.current && !sortButtonRef.current.contains(event.target) &&
          sortOptionsRef.current && !sortOptionsRef.current.contains(event.target)) {
        setShowSortOptions(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Initial data fetch
  useEffect(() => {
    if (status === "idle") {
      // Initial fetch with default sort (newest)
      dispatch(fetchPosts({ sort: "newest" }))
    }
  }, [status, dispatch])

  useEffect(() => {
    if (activeTab === "Collections" && savedPostsStatus === "idle") {
      dispatch(fetchSavedPosts())
    }
  }, [activeTab, savedPostsStatus, dispatch])

  const performSearch = useCallback((query, category, gender, sort) => {
    const trimmedQuery = query.trim()
    const searchTerms = []
    
    // Add main search query if it exists
    if (trimmedQuery) {
      searchTerms.push(trimmedQuery)
    }
    
    // Add gender as a search term if it's not "All"
    if (gender && gender !== "All") {
      searchTerms.push(gender)
    }
    
    // Combine all search terms
    const combinedQuery = searchTerms.join(" ")

    if (combinedQuery === "" && category === "All Categories") {
      // If no search terms and no category filter, just fetch all posts with sort
      if (isSearching) {
        dispatch(clearSearchResults())
        setIsSearching(false)
      }
      
      // Fetch all posts with the selected sort option
      dispatch(fetchPosts({ sort }))
    } else {
      // Search with all parameters
      dispatch(searchPosts({
        q: combinedQuery,
        category,
        sort,
      }))
      setIsSearching(true)
    }
  }, [dispatch, isSearching])

  const debouncedSearch = useCallback(
    debounce((query, category, gender, sort) => {
      performSearch(query, category, gender, sort)
    }, 500),
    [performSearch]
  )

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    debouncedSearch(query, selectedCategory, selectedGender, sortOption)
  }

  const handleCategoryChange = (e) => {
    const category = e.target.value
    setSelectedCategory(category)
    performSearch(searchQuery, category, selectedGender, sortOption)
  }

  const handleGenderChange = (e) => {
    const gender = e.target.value
    setSelectedGender(gender)
    performSearch(searchQuery, selectedCategory, gender, sortOption)
  }

  const handleSortChange = (option) => {
    setSortOption(option)
    setShowSortOptions(false)
    
    // Apply sort to current view (search results or all posts)
    if (isSearching) {
      performSearch(searchQuery, selectedCategory, selectedGender, option)
    } else {
      dispatch(fetchPosts({ sort: option }))
    }
  }
  
  const clearSearch = () => {
    setSearchQuery("")
    performSearch("", selectedCategory, selectedGender, sortOption)
  }

  const getDisplayedPosts = () => {
    if (isSearching) {
      return searchResults
    } else {
      return activeTab === "Collections" ? savedPosts : posts
    }
  }

  const filteredContent = getDisplayedPosts().filter(post => {
    if (!post) return false

    if (activeTab === "Reels") return post.video
    if (activeTab === "Posts") return post.images?.length > 0
    if (activeTab === "Collections") {
      return collectionSubTab === "Videos" ? post.video : post.images?.length > 0
    }

    return false
  })

  const renderContent = () => {
    if (isSearching && searchStatus === "loading") {
      return <div className={styles.loadingState}>Searching...</div>
    }

    if (!isSearching && [status, savedPostsStatus].includes("loading")) {
      return <div className={styles.loadingState}>Loading...</div>
    }

    if ([status, savedPostsStatus, searchStatus].includes("failed")) {
      return <div className={styles.errorState}>Error: {error}</div>
    }

    if (filteredContent.length === 0) {
      return <div className={styles.emptyState}>
        {isSearching
          ? `No results found for "${searchQuery}"`
          : "Oops! There are no posts currently"}
      </div>
    }

    return (
      <div className={styles.gridContainer}>
        {filteredContent.map(post => {
          const isVideo = activeTab === "Reels" || (activeTab === "Collections" && collectionSubTab === "Videos")
          const link = `/${isVideo ? "feed" : "post"}/${post._id}`

          return (
            <Link key={post._id} href={link} className={styles.gridItem}>
              {isVideo ? (
                <video
                  src={post.video}
                  className={styles.gridVideo}
                  width={300}
                  height={300}
                  muted
                  preload="metadata"
                />
              ) : (
                <Image
                  src={post.images?.[0] || "/placeholder.svg"}
                  alt={`Post by ${post.user?.username || "unknown"}`}
                  className={styles.gridImage}
                  width={300}
                  height={300}
                />
              )}
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <LikeProvider>
      <div className={styles.container}>
        <Header />
        <div className={styles.searchBar}>
          <div className={styles.searchInputWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for products, reels & creators"
              className={styles.searchInput}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button className={styles.clearButton} onClick={clearSearch}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className={styles.filtersContainer}>
          <div className={styles.sortByContainer} ref={sortButtonRef}>
            <button
              className={styles.filterButton}
              onClick={() => setShowSortOptions(!showSortOptions)}
            >
              Sort By: {sortOption === 'newest' ? 'Newest' : 'Oldest'}
              <ChevronDown className={styles.buttonIcon} />
            </button>
            {showSortOptions && (
              <div className={styles.sortOptions} ref={sortOptionsRef}>
                <div
                  className={`${styles.sortOption} ${sortOption === 'newest' ? styles.activeSort : ''}`}
                  onClick={() => handleSortChange('newest')}
                >
                  Newest
                </div>
                <div
                  className={`${styles.sortOption} ${sortOption === 'oldest' ? styles.activeSort : ''}`}
                  onClick={() => handleSortChange('oldest')}
                >
                  Oldest
                </div>
              </div>
            )}
          </div>

          {/* <button className={styles.filterButton}>All Filters</button> */}

          <div className={styles.customSelect}>
            <select
              className={styles.filterSelect}
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="All Categories">All Categories</option>
              <option value="Fashion">Fashion</option>
              <option value="Electronics">Electronics</option>
              <option value="Home">Home</option>
              <option value="Beauty">Beauty</option>
            </select>
            <ChevronDown className={styles.selectIcon} />
          </div>


          <div className={styles.customSelect}>
            <select
              className={styles.filterSelect}
              value={selectedGender}
              onChange={handleGenderChange}
            >
              <option value="All">All</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
            <ChevronDown className={styles.selectIcon} />
          </div>
        </div>

        <div className={styles.activeFilters}>
          {selectedCategory !== "All Categories" && (
            <div className={styles.filterTag}>
              Category: {selectedCategory}
              <button 
                className={styles.removeFilter} 
                onClick={() => {
                  setSelectedCategory("All Categories")
                  performSearch(searchQuery, "All Categories", selectedGender, sortOption)
                }}
              >
                <X size={12} />
              </button>
            </div>
          )}
          {selectedGender !== "All" && (
            <div className={styles.filterTag}>
              Gender: {selectedGender}
              <button 
                className={styles.removeFilter}
                onClick={() => {
                  setSelectedGender("All")
                  performSearch(searchQuery, selectedCategory, "All", sortOption)
                }}
              >
                <X size={12} />
              </button>
            </div>
          )}
          {sortOption !== "newest" && (
            <div className={styles.filterTag}>
              Sort: {sortOption === "oldest" ? "Oldest First" : "Newest First"}
              <button 
                className={styles.removeFilter}
                onClick={() => {
                  setSortOption("newest")
                  if (isSearching) {
                    performSearch(searchQuery, selectedCategory, selectedGender, "newest")
                  } else {
                    dispatch(fetchPosts({ sort: "newest" }))
                  }
                }}
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>

        <div className={styles.tabsContainer}>
          {["Reels", "Posts", "Collections"].map(id => (
            <div
              key={id}
              className={`${styles.tab} ${activeTab === id ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(id)}
            >
              {id}
            </div>
          ))}
        </div>

        {activeTab === "Collections" && (
          <div className={styles.subTabs}>
            {["Videos", "Images"].map(id => (
              <button
                key={id}
                className={`${styles.subTab} ${collectionSubTab === id ? styles.activeSubTab : ""}`}
                onClick={() => setCollectionSubTab(id)}
              >
                {id}
              </button>
            ))}
          </div>
        )}

        <div className={styles.contentGrid}>{renderContent()}</div>
        <Footer />
      </div>
    </LikeProvider>
  );
}