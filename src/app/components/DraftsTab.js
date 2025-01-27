import EmptyState from './emptystate'
import styles from '../CreatorShop/styles.creatorShop.module.css'

export default function DraftsTab({ drafts = [] }) {
  if (drafts.length === 0) {
    return <EmptyState 
      type="drafts"
      title="No drafts yet!"
      description="Start creating posts and save them as drafts to edit later"
      buttonText="Create Draft"
    />
  }

  
  return (
    <div className={styles.draftsContainer}>
      {/* Render drafts here */}
    </div>
  )
}

