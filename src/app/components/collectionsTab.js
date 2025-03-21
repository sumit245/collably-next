import EmptyState from './emptystate'
import styles from '../CreatorShop/styles.creatorShop.module.css'

export default function CollectionsTab({ collections = [] }) {
  if (collections.length === 0) {
    return <EmptyState 
      type="collections"
      title="No collections added yet!"
      description="Create collections & tag multiple products in your content, upto x 10 and share with your audience."
      buttonText="Create Collection"
    />
  }

  
  return (
    <div className={styles.collectionsContainer}>
      {/* Render collections here */}
    </div>
  )
}

