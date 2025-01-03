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


export default function HomePage() {
  return (
    <>
      <HeaderComponent />
      <main>
        <HeroSectionComponent />
        <KeyFeaturesComponent />
        <QuickEasyComponent />
        <ScrollerComponent text="Why Choose Our App?" />
        <CategoryGridComponent />
        <ImageRotationComponent />
        <ReviewSectionComponent />
        <SliderSectionComponent />
        <ClientSectionComponent />
        <ScrollerComponent />
        <FAQSectionComponent />
        <CommunitySectionComponent />
      </main>
      <FooterComponent />
      <BottomNavComponent />
    </>
  )
}

