"use client";

import { useRouter } from "next/navigation";

export default function UploadSuccess() {
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "black", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Video uploaded successfully!</h1>
        <button onClick={() => router.push("/")} style={{ padding: "0.5rem 1.5rem", backgroundColor: "white", color: "black", borderRadius: "9999px" }}>
          Continue creating?
        </button>
      </div>
    </div>
  );
}

