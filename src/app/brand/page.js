import Header from '../components/HeaderComponents'
import Footer from '../components/FooterComponent'
import ComingSoon from '../components/ComingSoon'
import MoreReasons from '../components/ChooseUs'
import ExclusivePerks from '../components/ExclusivePerks'
import TargetSection from '../components/TargetSection'
import RotatingScreens from '../components/RotatingScreen'


export default function ShopPage() {
  return (
    <div>
      <Header />
      <main>
        <MoreReasons/>
        <ExclusivePerks/>
        <TargetSection/>
        <RotatingScreens/>
    {/* <ComingSoon /> */}
      </main>
      <Footer />
    </div>
  )
}

