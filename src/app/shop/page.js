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
import { shopBanners, videoData1, videoData2 } from "../utils.faker"
import ReelsSec2 from "../components/reelSec2"
import BannerCarousel from "../components/creatorherohome";
import ReelsSec2Shopify from "../components/reelSec2Shopify"
export default function ShopPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [creators, setCreators] = useState([])
  const searchQuery = useSelector((state) => state.search.query)


  return (
    <LikeProvider>
      <div className={styles.bodyShop}>
        <div className={styles.smartphoneContainer}>
          <Header />
          <main>
            <HeroCarousel data={videoData1} />
            <TopCreators />
            <HeroCarousel data={videoData2} />
            <FeaturedCategories />
            {/* <BeautyReels /> */}
            <TopBrands />
            <ReelsSec2 sectionTitle="Electronics Products" category="Electronics" />
            <BannerCarousel banners={shopBanners} />
<ReelsSec2Shopify sectionTitle="Shopify Products" />
            <ReelsSec2 sectionTitle="Beauty Products" category="Beauty" />
            <ReelsSec2 sectionTitle="Fashion Products" category="Fashion" />
            <ReelsSec2 sectionTitle="Home Products" category="Home" />
            <ReelsSec2 sectionTitle="Sports Products" category="Sports" />
            <ReelsSec2 sectionTitle="Food Products" category="Food" />
            {/* <ProductGrid /> */}
            {/* <FeaturedCreators /> */}
            <TopCreators />
            {/* <TrendingBrands /> */}
            <TopBrands />
            {/* <TrendingUsersLeaderBoard /> */}
            <ChooseYouSection />
          </main>
          <Footer />
        </div>
      </div>
    </LikeProvider>
  )
}

