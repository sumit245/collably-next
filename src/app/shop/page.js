import Header from '../components/HeaderShop'
import Footer from '../components/FooterShop'
import HeroCarousel from '../components/HeroCaraouselShop'
import TopCreators from '../components/TopCreatorShop'
import ProductCategories from '../components/ProductCategoriesShop'
import TopBrands from '../components/TopBrandShop'
import ReelsSection from '../components/ReelsSection'
import ProductGrid from '../components/ProductGridShop'
import FeaturedCreators from '../components/FeaturedCreatorShop'
import TrendingBrands from '../components/TrendingBrandsShop'
import TrendingUsersLeaderBoard from '../components/CreatorLeaderboardShop'
import styles from '../shop/StyleShop.module.css'
import ChooseYouSection from '../components/ChooseYou'
import { LikeProvider } from '../actions/LikeContext'
import {videoData1} from '../utils.faker'
import {videoData2} from '../utils.faker'
import {creators1} from '../utils.faker'
import ReelsSec2 from '../components/reelSec2'

export default function ShopPage() {
  return (
    <LikeProvider>
    <div className={styles.bodyShop}>
    <div className={styles.smartphoneContainer}>
      <Header />
      <main>
        <HeroCarousel  data={videoData1}/>
        <TopCreators />
        <HeroCarousel  data={videoData2}/>
        <ProductCategories /> 
       <TopBrands />
       <ReelsSec2   creators={creators1} 
        sectionTitle="order Product testing" />
        <ReelsSection   creators={creators1} 
        sectionTitle="Shop the Look" />
         <ReelsSection   creators={creators1} 
        sectionTitle="Fashion Reels" />
         <ReelsSection   creators={creators1} 
        sectionTitle="Beauty Reels" />
         <ReelsSection   creators={creators1} 
        sectionTitle="Genz Style" />
        <ProductGrid /> 
       <FeaturedCreators />
         <TrendingBrands />
         <ReelsSection   creators={creators1} 
        sectionTitle="Trending Products" />
         <ReelsSection   creators={creators1} 
        sectionTitle="Most Loved" />
         <ReelsSection   creators={creators1} 
        sectionTitle="Latest from creators" />
         <ReelsSection   creators={creators1} 
        sectionTitle="Fresh Drops" />
        <TrendingUsersLeaderBoard />
        <ChooseYouSection />
      </main>
      <Footer />
    </div>
    </div>
    </LikeProvider>
  )
}

