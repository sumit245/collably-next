import EmptyState from './emptystate'
import styles from '../CreatorShop/styles.creatorShop.module.css'
import { useRouter } from 'next/navigation'

export default function PostsTab({ posts = [] }) {
  const router = useRouter()

  const handleAddPostClick = () => {
    router.push('/photoRec') // Redirect to /photoRec page
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        type="posts"
        title="No post added yet!"
        description="Add product to your existing Instagram content & share with your audience"
        buttonText="Add Post"
        onButtonClick={handleAddPostClick}
      />
    )
  }

  return (
    <div className={styles.postsContainer}>
      {/* Render posts here */}
    </div>
  )
}