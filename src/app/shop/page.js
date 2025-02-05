"use client";

import { useEffect, useState } from "react";
import Header from "../components/HeaderShop";
import Footer from "../components/FooterShop";
import HeroCarousel from "../components/HeroCaraouselShop";
import TopCreators from "../components/TopCreatorShop";
import ProductCategories from "../components/ProductCategoriesShop";
import TopBrands from "../components/TopBrandShop";
import ReelsSection from "../components/ReelsSection";
import ProductGrid from "../components/ProductGridShop";
import FeaturedCreators from "../components/FeaturedCreatorShop";
import TrendingBrands from "../components/TrendingBrandsShop";
import TrendingUsersLeaderBoard from "../components/CreatorLeaderboardShop";
import styles from "../shop/StyleShop.module.css";
import ChooseYouSection from "../components/ChooseYou";
import { LikeProvider } from "../actions/LikeContext";
import { videoData1, videoData2, creators1 } from "../utils.faker";
import ReelsSec2 from "../components/reelSec2";

const fetchCreators = async () => {
  try {
    const response = await fetch("/api/creators");
    if (!response.ok) throw new Error("Failed to fetch creators");
    return await response.json();
  } catch (error) {
    console.error("Error fetching creators:", error);
    return [];
  }
};

export default function ShopPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const getCreators = async () => {
      try {
        const data = await fetchCreators();
        setCreators(data);
      } catch (error) {
        console.error("Error fetching creators", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCreators();
  }, []);

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
            <ReelsSec2 creators={creators1} sectionTitle="Order Product Testing" />
            <ReelsSection creators={creators} sectionTitle="Shop the Look" isLoading={isLoading} />
            <ReelsSection creators={creators} sectionTitle="Fashion Reels" />
            <ReelsSection creators={creators} sectionTitle="Beauty Reels" />
            <ReelsSection creators={creators} sectionTitle="Genz Style" />
            <ProductGrid />
            <FeaturedCreators />
            <TrendingBrands />
            <ReelsSection creators={creators} sectionTitle="Trending Products" />
            <ReelsSection creators={creators} sectionTitle="Most Loved" />
            <ReelsSection creators={creators} sectionTitle="Latest from creators" />
            <ReelsSection creators={creators} sectionTitle="Fresh Drops" />
            <TrendingUsersLeaderBoard />
            <ChooseYouSection />
          </main>
          <Footer />
        </div>
      </div>
    </LikeProvider>
  );
}
