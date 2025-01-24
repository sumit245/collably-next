"use client";

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react"
import styles from "./page.module.css"
import stylesShop from '../shop/StyleShop.module.css'
import FooterCreator from '../components/FooterCreator'


export default function UploadSuccess() {
  const router = useRouter();

  return (
    <div className={stylesShop.bodyShop}>
    <div className={stylesShop.smartphoneContainer}>
    <div className={styles.page}>

      <div style={{ textAlign: "center" }}>
      <div className="text-center space-y-4">
      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="100px" height="100px"><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" d="M35.4,38.8c-3.2,2.4-7.1,3.9-11.4,3.9C13.7,42.7,5.3,34.3,5.3,24c0-2.6,0.6-5.2,1.5-7.4"/><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" d="M12.1,9.6C15.3,7,19.5,5.3,24,5.3c10.3,0,18.7,8.4,18.7,18.7c0,2.3-0.4,4.5-1.2,6.6"/><polyline fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" points="16.5,23.5 21.5,28.5 32,18"/></svg>
        <h1 className="text-2xl font-bold">Upload Complete!</h1>
        <p className="text-zinc-400">Your video has been successfully uploaded</p></div>
        <button onClick={() => router.push("/videoRec")} style={{ padding: "0.5rem 1.5rem", backgroundColor: "white", color: "black", borderRadius: "9999px" }}>
          Continue creating?
        </button>
      </div>
    </div>
     <FooterCreator />
            </div>
            </div>
  );
}

