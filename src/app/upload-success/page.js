"use client";

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react"
import stylesShop from '../shop/StyleShop.module.css'
import FooterCreator from '../components/FooterCreator'


export default function UploadSuccess() {
  const router = useRouter();

  return (
    <div className={stylesShop.bodyShop}>
    <div className={stylesShop.smartphoneContainer}>
    <div style={{ minHeight: "100vh", backgroundColor: "black", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
      <div className="text-center space-y-4">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
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

