import stylesShop from '../shop/StyleShop.module.css';
import FooterCreator from '../components/FooterCreator'
import CreatorHome from '../components/CreatorHome'
import SuggestedActions from '../components/CreatorHomeSuggested'
import ExclusiveFeatures from '../components/CreatorHomeExclusive'
import TopBrands from '../components/CreatorHomeBrand';
import SaleCalendar from '../components/CreatorHomeCalender'
import FindsOfTheDay from '../components/CreatorHomeFInds'
import ToDo from '../components/CreatorHomeToDo'
import PoweredByFooter from '../components/CreatorBottomFooter'
import TopCreators from '../components/TopCreatorShop'

export default function HomePage() {
  return (
    <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
    <>
   
      <main>
       <CreatorHome />
       <SuggestedActions />
       {/* <ExclusiveFeatures /> */}
       <TopBrands />
       <SaleCalendar />
       <TopCreators />
       <FindsOfTheDay />
       <ToDo />
       <PoweredByFooter />
      </main>
      <FooterCreator />
      
    </>
     </div>
     </div>
  )
}

