import styles from '../brand/target.module.css';
 
 const TargetSection = () => {
   return (
     <section className={styles.targetSection}>
       <div className={styles.container}>
         <h2 className={styles.title}>Perfect For:</h2>
         <div className={styles.items}>
           <div className={styles.item}>
             <div className={styles.iconWrapper}>
               <span className={styles.icon}>🌟</span>
             </div>
             <h3 className={styles.itemTitle}>D2C Brands</h3>
             <p className={styles.itemDescription}>Take control of your brand and sell directly to customers.</p>
           </div>
           <div className={styles.item}>
             <div className={styles.iconWrapper}>
               <span className={styles.icon}>🛒</span>
             </div>
             <h3 className={styles.itemTitle}>Ecommerce Stores</h3>
             <p className={styles.itemDescription}>Boost your online store's visibility and sales effortlessly.</p>
           </div>
           <div className={styles.item}>
             <div className={styles.iconWrapper}>
               <span className={styles.icon}>🏪</span>
             </div>
             <h3 className={styles.itemTitle}>Local Businesses</h3>
             <p className={styles.itemDescription}>Grow your community presence with easy-to-manage digital tools.</p>
           </div>
           <div className={styles.item}>
             <div className={styles.iconWrapper}>
               <span className={styles.icon}>🚀</span>
             </div>
             <h3 className={styles.itemTitle}>Startups</h3>
             <p className={styles.itemDescription}>Scale your startup with innovative strategies and technology.</p>
           </div>
         </div>
       </div>
     </section>
   );
 };
 
 export default TargetSection;