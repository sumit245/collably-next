import Header from '@/app/components/HeaderShop'
import Footer from '@/app/components/FooterShop'


import styles from '@/app/shop/StyleShop.module.css'
import { ViewLikedProduct } from '../components/ViewLikedProduct'
import { LikeProvider } from '../actions/LikeContext'

export default function ShopPage() {
  return (
    <LikeProvider>
    <div className={styles.bodyShop}>
    <div className={styles.smartphoneContainer}>
   
      <Header />
      <main>
        <ViewLikedProduct/>
      
      </main>
      <Footer />
    </div>
    </div>
    </LikeProvider>
  )
}