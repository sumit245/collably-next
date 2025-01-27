import EmptyState from './emptystate'
import styles from '../CreatorShop/styles.creatorShop.module.css'

export default function SingleProductLinksTab({ links = [] }) {
  if (links.length === 0) {
    return <EmptyState 
      type="links"
      title="No product links added yet!"
      description="Add single product links to share individual items with your audience"
      buttonText="Add Product Link"
    />
  }

  
  return (
    <div className={styles.linksContainer}>
      {/* Render single product links here */}
    </div>
  )
}

