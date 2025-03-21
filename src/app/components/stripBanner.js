import Link from "next/link";
import styles from "../CreatorHome/hero.module.css";


export default function StripBanner({ text, buttonText, buttonLink }) {
  return (
    <div className={styles.stripBanner}>
      <div className={styles.content}>
        <p className={styles.bannerText}>{text}</p>
        <Link href={buttonLink} className={styles.actionButton}>
          {buttonText} <span className={styles.arrow}>→</span>
        </Link>
      </div>
    </div>
  );
}
