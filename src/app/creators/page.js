import HeaderComponent from '../components/HeaderComponents'
import HeroSectionComponent from '../components/HeroSectionComponent'
import KeyFeaturesComponent from '../components/KeyFeatureComponent'
import QuickEasyComponent from '../components/QuickEasyComponent'
import ScrollerComponent from '../components/ScrollerComponent'
import CategoryGridComponent from '../components/CategoryGridComponent'
import ImageRotationComponent from '../components/ImageRotationComponent'
import ReviewSectionComponent from '../components/ReviewSectionComponent'
import SliderSectionComponent from '../components/SliderSectionComponent'
import ClientSectionComponent from '../components/ClientSectionComponent'
import FAQSectionComponent from '../components/FaqSectionComponent'
import CommunitySectionComponent from '../components/CommunitySectionComponent'
import FooterComponent from '../components/FooterComponent'
import BottomNavComponent from '../components/BottomNavComponent'
import LoginComponent from '../components/LoginComponent';
import {heroDataCreator, scrollerData, faqs, itemsCreator,} from '../utils.faker'
import {scrollerData2} from '../utils.faker'
import {quickEasyDataCreator} from '../utils.faker'
// import {heroData} from '../app/utils.faker'
const handleLoginSuccess = (userData) => {
  setUser(userData);
};
export default function HomePage() {
  return (
    <>
      <HeaderComponent />
      <main>
        <HeroSectionComponent heroData={heroDataCreator} />
        <KeyFeaturesComponent items ={itemsCreator}/>
        <QuickEasyComponent quickEasyData={quickEasyDataCreator} />
        <ScrollerComponent scrollerData={scrollerData} />
        <CategoryGridComponent />
        <ImageRotationComponent />
        {/* <ReviewSectionComponent /> */}
        <SliderSectionComponent />
        <ClientSectionComponent />
        <ScrollerComponent scrollerData={scrollerData2} />
        <FAQSectionComponent faqs={faqs}/>
        <CommunitySectionComponent />
      </main>
      <FooterComponent />
      <BottomNavComponent />
    </>
  )
}