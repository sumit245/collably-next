import Header from '@/app/components/HeaderShop'
import Footer from '@/app/components/FooterShop'
import HeroCarousel from '@/app/components/HeroCaraouselShop'
import TopCreators from '@/app/components/TopCreatorShop'
import TrendingCarousel from '@/app/components/TrendingcarouselShop'
import ProductCategories from '@/app/components/ProductCategoriesShop'
import TopBrands from '@/app/components/TopBrandShop'
import ShopTheLook from '@/app/components/ShopTheLookShop'
import FashionReels from '@/app/components/FashionReelsShop'
import BeautyReels from '@/app/components/BeautyReelsShop'
import GenZStyle from '@/app/components/GenZStyleShop'
import ProductGrid from '@/app/components/ProductGridShop'
import FeaturedCreators from '@/app/components/FeaturedCreatorShop'
import TrendingBrands from '@/app/components/TrendingBrandsShop'
 import TrendingProducts from '@/app/components/TrendingProductShop'
import MostLoved from '@/app/components/MostLovedShop'
import LatestCreators from '@/app/components/LatestCreatorsShop'
import FreshDrops from '@/app/components/FreshDropsShop'
import CreatorLeaderboard from '@/app/components/CreatorLeaderboardShop'
import styles from '@/app/shop/StyleShop.module.css'
export default function ShopPage() {
  return (
    <div className={styles.bodyShop}>
    <div className={styles.smartphoneContainer}>
      <Header />
      <main>
        <HeroCarousel />
        <TopCreators />
        <TrendingCarousel />
        <ProductCategories /> 
       <TopBrands />
        <ShopTheLook />
        <FashionReels />
        <BeautyReels />
        <GenZStyle />
        <ProductGrid /> 
       <FeaturedCreators />
         <TrendingBrands />
        <TrendingProducts />
        <MostLoved />
        <LatestCreators />
        <FreshDrops />
        <CreatorLeaderboard />
      </main>
      <Footer />
    </div>
    </div>
  )
}

