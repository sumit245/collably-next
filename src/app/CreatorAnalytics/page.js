import stylesShop from '../shop/StyleShop.module.css';
import FooterCreator from '../components/FooterCreator'
import InsightsDashboard from '../components/AnalyticsHead'
import PoweredByFooter from '../components/CreatorBottomFooter'


export default function HomePage() {
  return (
    <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
    <>
   
      <main>
      <InsightsDashboard />
      
      
      <PoweredByFooter />
      
      </main>
      <FooterCreator />
      
    </>
     </div>
     </div>
  )
}

