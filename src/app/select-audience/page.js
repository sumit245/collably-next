"use client"

import { useRouter } from "next/navigation"
import styles from "./page.module.css"

export default function SelectAudience() {
  const router = useRouter()

  const handleSelect = (audience) => {
    // Handle audience selection
    router.back()
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select audience</h1>

      <div className={styles.question}>
        <h2>Is this video Made for Kids?</h2>
        <p>
          Regardless of your location, you're legally required to comply with the US Children's Online Privacy
          Protection Act (COPPA) and/or other laws. You're required to tell us whether your videos are Made for Kids.
        </p>
      </div>

      <div className={styles.options}>
        <button className={styles.option} onClick={() => handleSelect("for-kids")}>
          <div className={styles.radio} />
          <span>Yes, it's Made for Kids</span>
        </button>

        <button className={styles.option} onClick={() => handleSelect("not-for-kids")}>
          <div className={styles.radio} />
          <span>No, it's not Made for Kids</span>
        </button>
      </div>

      <div className={styles.ageRestriction}>
        <h3>Age restriction (advanced)</h3>
        <p>Do you want to restrict your video to an adult audience?</p>

        <div className={styles.options}>
          <button className={styles.option} onClick={() => handleSelect("18-plus")}>
            <div className={styles.radio} />
            <span>Yes, restrict my video to viewers over 18</span>
          </button>

          <button className={styles.option} onClick={() => handleSelect("no-restriction")}>
            <div className={styles.radio} />
            <span>No, don't restrict my video to viewers over 18</span>
          </button>
        </div>
      </div>
    </div>
  )
}

