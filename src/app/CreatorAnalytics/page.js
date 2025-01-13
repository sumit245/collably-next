import stylesShop from '../shop/StyleShop.module.css';
import FooterCreator from '../components/FooterCreator'
import InsightsDashboard from '../components/AnalyticsHead'
import ContentAnalytics from '../components/CreatorInsights'
import CommissionSplit from '../components/CommisionSplit'


export default function HomePage() {
  return (
    <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
    <>
   
      <main>
      <InsightsDashboard />
       <ContentAnalytics />
       <CommissionSplit />
       
      
      </main>
      <FooterCreator />
      
    </>
     </div>
     </div>
  )
}

