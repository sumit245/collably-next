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

const TargetSection = ({ affiliateData }) => {
  return (
    <section className={styles.targetSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>{affiliateData.heading}</h2>
        <div className={styles.items}>
          {affiliateData.features.map((feature, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{feature.icon}</span>
              </div>
              <h3 className={styles.itemTitle}>{feature.title}</h3>
              <p className={styles.itemDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetSection;
