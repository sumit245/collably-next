import Header from '@/app/components/HeaderShop'
import Footer from '@/app/components/FooterShop'
import styles from './stylesfeed.module.css'
import StoryContainer from '../components/StoryContainer'
import BlogsCorner from '../components/BlogCorner'
import TrendingCreators from '../components/TrendingCreators'
import ProfileSection from '../components/ProfileSectionFeed'
import styleshop from '@/app/shop/StyleShop.module.css'
import { LikeProvider } from '../actions/LikeContext'

export default function ShopPage() {
  return (
    <LikeProvider>
    <div className={styleshop.bodyShop}>
    <div className={styleshop.smartphoneContainer}>
      <Header />
      <main>
      <StoryContainer styles={styles} />
        <ProfileSection styles={styles} />
        <BlogsCorner styles={styles} />
        <TrendingCreators styles={styles} />
      </main>
      <Footer />
    </div>
    </div>
    </LikeProvider>
  )
}

