import stylesShop from '../shop/StyleShop.module.css';
import FooterCreator from '../components/FooterCreator'
import CreatorHome from '../components/CreatorHome'
// import SuggestedActions from '../components/CreatorHomeSuggested'
import BannerCarousel from '../components/creatorherohome'
import StripBanner from '../components/stripBanner'
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
import TrendingBrandsCreator from '../components/creatorbrandtrend';
import CategoryBrands from '../components/creatorcategorybrand';
import LocalBrands from '../components/localBrands';
export default function HomePage() {

  return (
    <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
    <>
   
      <main>
       <CreatorHome />
       {/* <TopBrands /> */}
       {/* <SuggestedActions /> */}
       <BannerCarousel />
       <StripBanner 
        text="Make your content shoppable for more users" 
        buttonText="Setup Feed" 
        buttonLink="" 
      />
       {/* <ExclusiveFeatures /> */}
       {/* <TopBrands /> */}
       {/* <ExclusiveFeatures /> */}
       <TopBrands 
       heading="Top sellers "
       />
       {/* <SaleCalendar /> */}
       <TrendingBrands />
       <FeaturedCategories />
      
      <TrendingBrandsCreator />
      <CategoryBrands heading="Best in Fashion " category="Fashion"/>
      <CategoryBrands heading="Best in Health & Beauty " category="Beauty"/>
      <CategoryBrands heading="New on Collably " category="Home"/>
      <StripBanner 
        text="Join Collably’s Referall Program and earn 15% of the earnings your friends make - FOREVER!" 
        buttonText="Generate Link " 
        buttonLink="" 
      />
      <CategoryBrands heading="Best in Electronics " category="Electronics"/>
       {/* <TopCreators /> */}
      
       {/* <FindsOfTheDay /> */}
       <TopBrands 
       heading="Explore All Brands "
       />
       {/* <ReferralProgram /> */}
       {/* <TopCreators /> */}
       {/* <TopPerformers /> */}
       {/* <ToDo /> */}
       {/* <LocalBrands /> */}
       <BannerCarousel />
       <PoweredByFooter />
      </main>
      <FooterCreator />
      
    </>
     </div>
     </div>
  )
}