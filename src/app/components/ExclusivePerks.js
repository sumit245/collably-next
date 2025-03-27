import styles from '../brand/exclusive.module.css';
 import { FaRocket, FaRegLightbulb, FaHandshake } from 'react-icons/fa'; // Adding icons for extra style
 
 const ExclusivePerks = () => {
   return (
     <section className={styles.container}>
       <div className={styles.content}>
         <h2 className={styles.headline}>Exclusive Early Access Perks</h2>
         <p className={styles.description}>
           Join the first 50 brands to enjoy incredible advantages and get ahead in the game!
         </p>
         
         <div className={styles.perkList}>
           <div className={styles.perkItem}>
             <FaRocket className={styles.icon} />
             <h3 className={styles.perkTitle}> Zero Platform Fee for 6 Months</h3>
             <p className={styles.perkDescription}>
               For the first 50 brands only! Get started with zero platform fees and save money.
             </p>
           </div>
           
           <div className={styles.perkItem}>
             <FaRegLightbulb className={styles.icon} />
             <h3 className={styles.perkTitle}> Access to Pre-Vetted Influencers</h3>
             <p className={styles.perkDescription}>
               Connect with influencers that are a perfect fit for your brand. No more guesswork!
             </p>
           </div>
           
           <div className={styles.perkItem}>
             <FaHandshake className={styles.icon} />
             <h3 className={styles.perkTitle}> AI-Powered Insights</h3>
             <p className={styles.perkDescription}>
               Get actionable insights with AI tools to boost your brand's performance and growth.
             </p>
           </div>
         </div>
 
         <button className={styles.ctaButton}>Get Started as a Brand</button>
       </div>
     </section>
   );
 };
 
 export default ExclusivePerks;