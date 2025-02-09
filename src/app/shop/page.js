"use client"

import { useEffect, useState } from "react"
import Header from "../components/HeaderShop"
import Footer from "../components/FooterShop"
import HeroCarousel from "../components/HeroCaraouselShop"
import TopCreators from "../components/TopCreatorShop"
import ProductCategories from "../components/ProductCategoriesShop"
import TopBrands from "../components/TopBrandShop"
import ReelsSection from "../components/ReelsSection"
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



  return (
    <LikeProvider>
      <div className={styles.bodyShop}>
        <div className={styles.smartphoneContainer}>
          <Header />
          <main>
            <HeroCarousel data={videoData1} />
            <TopCreators />
            <HeroCarousel data={videoData2} />
            <ProductCategories />
            <TopBrands />
            <ReelsSec2 sectionTitle="Electronics Products" category="Electronics" />
            <ReelsSec2 sectionTitle="Beauty Products" category="Beauty" />
       
            <ProductGrid />
            <FeaturedCreators />
            <TrendingBrands />
        
            <TrendingUsersLeaderBoard />
            <ChooseYouSection />
          </main>
          <Footer />
        </div>
      </div>
    </LikeProvider>
  )
}

