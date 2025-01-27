import Header from '../components/HeaderShop'
import Footer from '../components/FooterShop'


import styles from '../shop/StyleShop.module.css'
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