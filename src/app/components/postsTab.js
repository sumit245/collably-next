import EmptyState from './emptystate'
import styles from '../CreatorShop/styles.creatorShop.module.css'

export default function PostsTab({ posts = [] }) {
  if (posts.length === 0) {
    return <EmptyState 
      type="posts"
      title="No post added yet!"
      description="Add product to your existing Instagram content & share with your audience"
      buttonText="Add Post"
    />
  }

  return (
    <div className={styles.postsContainer}>
      {/* Render posts here */}
    </div>
  )
}

