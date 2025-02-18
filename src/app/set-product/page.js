
import { Suspense } from "react"
import SetProductClient from './SetProductClient'


export default function SetProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetProductClient />
    </Suspense>
  )
}
