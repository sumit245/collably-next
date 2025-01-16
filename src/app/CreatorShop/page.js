import stylesShop from '../shop/StyleShop.module.css';
import FooterCreator from '../components/FooterCreator'
import CreatorShop from '../components/CreatorShop'
import ContentAnalytics from '../components/CreatorInsights'
import CommissionSplit from '../components/CommisionSplit'


export default function HomePage() {
  return (
    <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
    <>
   
      <main>
       <CreatorShop />
       <ContentAnalytics />
       <CommissionSplit />
      
      </main>
      <FooterCreator />
      
    </>
     </div>
     </div>
  )
}

