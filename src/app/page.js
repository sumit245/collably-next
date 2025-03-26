import HeaderComponent from '../app/components/HeaderComponents'
import HeroSectionComponent from '../app/components/HeroSectionComponent'
import KeyFeaturesComponent from '../app/components/KeyFeatureComponent'
import QuickEasyComponent from '../app/components/QuickEasyComponent'
import ScrollerComponent from '../app/components/ScrollerComponent'
import CategoryGridComponent from '../app/components/CategoryGridComponent'
import ImageRotationComponent from '../app/components/ImageRotationComponent'
import ReviewSectionComponent from '../app/components/ReviewSectionComponent'
import SliderSectionComponent from '../app/components/SliderSectionComponent'
import ClientSectionComponent from '../app/components/ClientSectionComponent'
import FAQSectionComponent from '../app/components/FaqSectionComponent'
import CommunitySectionComponent from '../app/components/CommunitySectionComponent'
import FooterComponent from '../app/components/FooterComponent'
import BottomNavComponent from '../app/components/BottomNavComponent'
import LoginComponent from '../app/components/LoginComponent';
import {heroData, scrollerData, faqs, items, clientLogos} from '../app/utils.faker'
import {scrollerData2} from '../app/utils.faker'
import {quickEasyData} from '../app/utils.faker'
// import {heroData} from '../app/utils.faker'
const handleLoginSuccess = (userData) => {
  setUser(userData);
};
export default function HomePage() {
  return (
    <>
      <HeaderComponent />
      <main>
        <HeroSectionComponent heroData={heroData} />
        <KeyFeaturesComponent items = {items}/>
        <QuickEasyComponent quickEasyData={quickEasyData} />
        <ScrollerComponent scrollerData={scrollerData} />
        <CategoryGridComponent />
        <ImageRotationComponent />
        <ReviewSectionComponent />
        <SliderSectionComponent />
        <ClientSectionComponent images={clientLogos}/>
        <ScrollerComponent scrollerData={scrollerData2} />
        <FAQSectionComponent faqs={faqs}/>
        <CommunitySectionComponent />
      </main>
      <FooterComponent />
      <BottomNavComponent />
    </>
  )
}

