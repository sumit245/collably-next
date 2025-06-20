import Header from "../components/HeaderComponents";
import CommunitySectionComponent from "../components/CommunitySectionComponent";
import FooterComponent from "../components/FooterComponent";
import BottomNavComponent from "../components/BottomNavComponent";
import ComingSoon from "../components/ComingSoon";
import HeroSectionComponent from "../components/HeroSectionComponent";
import AffiliateFeatures from "../components/affiliatebrand";
import {
  heroDataBrand,
  scrollerData3,
  faqsBrand,
  imageBrand,
  affiliateDataBrand,
  fakeItems
} from "../utils.faker";
import ScrollerComponent from "../components/ScrollerComponent";
import QuickEasyComponent from "../components/QuickEasyComponent";
import { quickEasyDataBrand } from "../utils.faker";
import FAQSectionComponent from "../components/FaqSectionComponent";
import ClientSectionComponent from "../components/ClientSectionComponent";
import RotatingImageSection from "../components/rotateBrands";
import MoreReasons from "../components/ChooseUs";
import ExclusivePerks from "../components/ExclusivePerks";
import TargetSection from "../components/TargetSection";
export default function ShopPage() {
  return (
    <div>
      <Header />
      <main>
        <HeroSectionComponent heroData={heroDataBrand} />
        <AffiliateFeatures affiliateData={affiliateDataBrand} />
        <QuickEasyComponent quickEasyData={quickEasyDataBrand} />
        <ScrollerComponent scrollerData={scrollerData3} />
        <TargetSection targetData = { fakeItems} />
        {/* <RotatingImageSection /> */}
        <ExclusivePerks />
        <ClientSectionComponent />
        <MoreReasons />

        {/* <ComingSoon /> */}
        <FAQSectionComponent faqs={faqsBrand} />
        <CommunitySectionComponent />
      </main>
      <FooterComponent />
      <BottomNavComponent />
    </div>
  );
}