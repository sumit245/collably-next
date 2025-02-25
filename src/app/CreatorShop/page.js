import stylesShop from '../shop/StyleShop.module.css';
import FooterCreator from '../components/FooterCreator'

import CreatorShop from '../components/CreatorShop'



export default function HomePage() {
  return (
    <>
    <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
    
     <>
      
         <main>
         
         <CreatorShop/>
         
         
         </main>
         <FooterCreator />
         
       </>
     </div>
     </div>

</>
  )
}