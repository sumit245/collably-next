import stylesShop from '../shop/StyleShop.module.css';
import FooterCreator from '../components/FooterCreator'
import CreateWith from '../components/CreateWith'

export default function HomePage() {
  return (
    <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
    <>
   
      <main>
      
       <CreateWith/>
      </main>
      <FooterCreator />
      
    </>
     </div>
     </div>
  )
}

