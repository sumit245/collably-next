"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { fetchBrands, createReferralLink } from "../store/brandSlice"
import styles from "./page.module.css"
import stylesShop from '../shop/StyleShop.module.css';
import ShareModal from "../linkCreate/modalLink"
import { toast } from "react-hot-toast"
import FooterCreator from '../components/FooterCreator'

export default function BrandsSection() {
  const [activeTab, setActiveTab] = useState("Popular")
  const [filteredBrands, setFilteredBrands] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentBrand, setCurrentBrand] = useState(null)

  const dispatch = useDispatch()
  const brands = useSelector((state) => state.brands.items)
  const userId = useSelector((state) => state.auth.user?._id)
  const { referralLink } = useSelector((state) => state.brands)
  const isLoading = useSelector((state) => state.brands.loading)

  useEffect(() => {
    dispatch(fetchBrands())
  }, [dispatch])

  useEffect(() => {
    if (brands.length) {
      filterBrands()
    }
  }, [brands, activeTab, selectedCategory])

  const filterBrands = () => {
    let result = [...brands]
    
    // Apply category filter if selected
    if (selectedCategory) {
      result = result.filter(brand => brand.brandCategory === selectedCategory)
    }
    
    // Apply sorting based on active tab
    switch (activeTab) {
      case "A-Z":
        result.sort((a, b) => a.brandName.localeCompare(b.brandName))
        break
      case "Popular":
      default:
        // Assuming popularity is determined by some field, or just use the default order
        break
    }
    
    setFilteredBrands(result)
  }

  const handleBrandClick = async (e, brand) => {
    e.preventDefault()
    
    if (!userId) {
      toast.error("Please login to create a link")
      return
    }

    try {
      setCurrentBrand(brand)
      await dispatch(createReferralLink({ 
        userId, 
        productUrl: brand.brandWebsite 
      })).unwrap()
      setIsModalOpen(true)
    } catch (error) {
      toast.error("Failed to create link")
    }
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const tabs = ["Popular", "A-Z"]

  if (isLoading) {
    return <div className={styles.loadingContainer}>Loading brands...</div>
  }

  return (
    <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
    <div className={styles.brandsContainer}>
      <div className={styles.header}>
        <button className={styles.backButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className={styles.headerTitle}>Brands</h1>
      </div>

      <div className={styles.content}>
        <h2 className={styles.contentTitle}>Brands</h2>
        
        <div className={styles.filterContainer}>
          <div className={styles.tabsWrapper}>
            {tabs.map(tab => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
            
            <select 
              value={selectedCategory} 
              onChange={handleCategoryChange}
              className={styles.categorySelect}
            >
              <option value="">All Categories</option>
              <option value="fashion">Fashion</option>
              <option value="electronics">Electronics</option>
              <option value="home">Home</option>
              <option value="beauty">Beauty</option>
              <option value="sports">Sports</option>
              <option value="food">Food</option>
            </select>
          </div>
        </div>

        <div className={styles.brandsList}>
          {filteredBrands.length > 0 ? (
            filteredBrands.map((brand) => (
              <div 
                key={brand._id} 
                className={styles.brandItem}
                onClick={(e) => handleBrandClick(e, brand)}
              >
                <div className={styles.brandInfo}>
                  <div className={styles.logoContainer}>
                    <Image
                      src={brand.brandLogo || "/placeholder.svg"}
                      alt={brand.brandName}
                      width={40}
                      height={40}
                      className={styles.brandLogo}
                    />
                  </div>
                  <div className={styles.brandDetails}>
                    <h3 className={styles.brandName}>{brand.brandName}</h3>
                    <p className={styles.profitInfo}>
                      Upto {brand.profitPercentage || 8}% Profit
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noBrands}>
              No brands found for the selected category.
            </div>
          )}
        </div>
      </div>
      
      <ShareModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        productName={currentBrand?.brandName || "Brand"} 
        productLink={referralLink} 
      />
    </div>
    <FooterCreator />
    </div>
     </div>
  )
}