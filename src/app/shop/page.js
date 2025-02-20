"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import Header from "../components/HeaderShop"
import Footer from "../components/FooterShop"
import HeroCarousel from "../components/HeroCaraouselShop"
import TopCreators from "../components/TopCreatorShop"
import FeaturedCategories from "../components/shopCategories"
import TopBrands from "../components/TopBrandShop"
import ProductGrid from "../components/ProductGridShop"
import FeaturedCreators from "../components/FeaturedCreatorShop"
import TrendingBrands from "../components/TrendingBrandsShop"
import TrendingUsersLeaderBoard from "../components/CreatorLeaderboardShop"
import styles from "../shop/StyleShop.module.css"
import ChooseYouSection from "../components/ChooseYou"
import { LikeProvider } from "../actions/LikeContext"
import { videoData1, videoData2 } from "../utils.faker"
import ReelsSec2 from "../components/reelSec2"

export default function ShopPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [creators, setCreators] = useState([])
  const searchQuery = useSelector((state) => state.search.query)

  const filterComponentsBySearch = (Component) => {
    return (props) => {
      if (!searchQuery) return <Component {...props} />

      const searchableContent = Component.searchableProps ? Component.searchableProps(props) : []

      if (searchableContent.some((content) => content.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return <Component {...props} />
      }
      return null
    }
  }

  const FilteredTopCreators = filterComponentsBySearch(TopCreators)
  const FilteredProductCategories = filterComponentsBySearch(FeaturedCategories)
  const FilteredTopBrands = filterComponentsBySearch(TopBrands)
  const FilteredProductGrid = filterComponentsBySearch(ProductGrid)
  const FilteredFeaturedCreators = filterComponentsBySearch(FeaturedCreators)
  const FilteredTrendingBrands = filterComponentsBySearch(TrendingBrands)
  const FilteredTrendingUsersLeaderBoard = filterComponentsBySearch(TrendingUsersLeaderBoard)

  return (
    <LikeProvider>
      <div className={styles.bodyShop}>
        <div className={styles.smartphoneContainer}>
          <Header />
          <main>
            <HeroCarousel data={videoData1} />
            <FilteredTopCreators />
            <HeroCarousel data={videoData2} />
            <FilteredProductCategories />
            <FilteredTopBrands />
            <ReelsSec2 sectionTitle="Electronics Products" category="Electronics" />
            <ReelsSec2 sectionTitle="Beauty Products" category="Beauty" />
            {/* <FilteredProductGrid /> */}
            <FilteredFeaturedCreators />
            {/* <FilteredTrendingBrands /> */}
            <FilteredTopBrands />
            <FilteredTrendingUsersLeaderBoard />
            <ChooseYouSection />
          </main>
          <Footer />
        </div>
      </div>
    </LikeProvider>
  )
}

