import LoginComponent from "../components/LoginComponent";
import { Suspense } from 'react'

export default function LoginPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
      <LoginComponent />
      </Suspense>
    </div>
  );
}
