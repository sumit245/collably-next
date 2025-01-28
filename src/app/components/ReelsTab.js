import EmptyState from './emptystate'
import styles from '../CreatorShop/styles.creatorShop.module.css'
import { useRouter } from 'next/navigation'

export default function ReelsTab({ reels = [] }) {
  const router = useRouter()

  const handleAddReelClick = () => {
    router.push('/videoRec') // Redirect to /videoRec page
  }

  if (reels.length === 0) {
    return (
      <EmptyState
        type="reels"
        title="No reels added yet!"
        description="Create engaging reels to showcase your products and share with your audience"
        buttonText="Add Reel"
        onButtonClick={handleAddReelClick}
      />
    )
  }

  return (
    <div className={styles.postsContainer}>
      {/* Render reels here */}
    </div>
  )
}