// import Image from "next/image"
// import styles from "../brand/page.module.css"

// const AffiliateFeatures = ({ affiliateData }) => {
//   return (
//     <section className={styles.brand_features_section}>
//       <div className={styles.brand_container}>
//         <h2 className={styles.brand_heading}>{affiliateData.heading}</h2>

//         <div className={styles.brand_features_grid}>
//           {affiliateData.features.map((feature, index) => (
//             <div key={index} className={styles.brand_feature_card}>
//               <div className={styles.brand_feature_content}>
//                 <h3 className={styles.brand_feature_title}>{feature.title}</h3>
//                 <p className={styles.brand_feature_description}>{feature.description}</p>
//               </div>
//               <div className={styles.brand_feature_image_container}>
//                 <Image
//                   src={feature.imageSrc || "/placeholder.svg"}
//                   alt={feature.imageAlt}
//                   width={400}
//                   height={300}
//                   className={styles.brand_feature_image}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default AffiliateFeatures



import styles from '../brand/target.module.css';
 
 const TargetSection = () => {
   return (
     <section className={styles.targetSection}>
       <div className={styles.container}>
         <h2 className={styles.title}>Empowering Creators with Innovative Tools</h2>
         <div className={styles.items}>
           <div className={styles.item}>
             <div className={styles.iconWrapper}>
               <span className={styles.icon}>🖇️</span>
             </div>
             <h3 className={styles.itemTitle}>Instant Affiliate Links</h3>
             <p className={styles.itemDescription}>Generate custom links, share & earn per sale</p>
           </div>
           <div className={styles.item}>
             <div className={styles.iconWrapper}>
               <span className={styles.icon}>💸</span>
             </div>
             <h3 className={styles.itemTitle}>Shoppable Content</h3>
             <p className={styles.itemDescription}>Tag products in posts—your & ours audience buys instantly!</p>
           </div>
           <div className={styles.item}>
             <div className={styles.iconWrapper}>
               <span className={styles.icon}>🛍️</span>
             </div>
             <h3 className={styles.itemTitle}>Brand Collections</h3>
             <p className={styles.itemDescription}>Get invites from partner brands for exclusive collaborations</p>
           </div>
           {/* <div className={styles.item}>
             <div className={styles.iconWrapper}>
               <span className={styles.icon}>🚀</span>
             </div>
             <h3 className={styles.itemTitle}>Startups</h3>
             <p className={styles.itemDescription}>Scale your startup with innovative strategies and technology.</p>
           </div> */}
         </div>
       </div>
     </section>
   );
 };
 
 export default TargetSection;