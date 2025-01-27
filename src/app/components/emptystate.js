import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import styles from '../CreatorShop/styles.creatorShop.module.css'

export default function EmptyState({ type, title, description, buttonText }) {
  return (
    <div className={styles.emptyState}>
      <Image
        src="/images/empty-state.svg"
        alt={title}
        width={120}
        height={120}
      />
      <h2 className={styles.emptyStateTitle}>{title}</h2>
      <p className={styles.emptyStateText}>
        {description}
      </p>
      <button className={styles.addButton}>
        {buttonText} <ArrowRight size={20} />
      </button>
    </div>
  )
}

