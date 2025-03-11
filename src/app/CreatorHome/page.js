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
import CreateWith from '../components/CreateWith'
import TopCreators from '../components/TopCreatorShop'
import FeaturedCategories from "../components/CategoriesCreatorHome"
import  ReferralProgram from "../components/ReferralProgram"
import TopPerformers from "../components/TopPerformers"
import TrendingBrands from '../components/CreatorTrendingBrands';
import LocalBrands from '../components/localBrands';
export default function HomePage() {
  return (
    <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
    <>
   
      <main>
       <CreatorHome />
       {/* <TopBrands /> */}
       <SuggestedActions />
       {/* <ExclusiveFeatures /> */}
       {/* <TopBrands /> */}
       {/* <ExclusiveFeatures /> */}
       <TopBrands />
       {/* <SaleCalendar /> */}
       <TopCreators />
       <TrendingBrands />
       {/* <FindsOfTheDay /> */}
       <FeaturedCategories />
       <ReferralProgram />
       <TopCreators />
       {/* <TopPerformers /> */}
       {/* <ToDo /> */}
       <LocalBrands />
       <PoweredByFooter />
      </main>
      <FooterCreator />
      
    </>
     </div>
     </div>
  )
}