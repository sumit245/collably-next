import EmptyState from './emptystate'
import styles from '../CreatorShop/styles.creatorShop.module.css'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { ArrowRight } from 'lucide-react'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000"

const changeEscapeChar = (path) => path?.replace(/\\/g, "/") || ""

export default function PostsTab() {
  const router = useRouter()
  const { posts } = useSelector((state) => state.posts)
  const user = useSelector((state) => state.auth.user)

  const userPosts = posts.filter(post => post.user._id === user?.user?._id && (!post.video || post.video.length === 0))

  const handleAddPostClick = () => {
    router.push('/photoRec')
  }

  if (userPosts.length === 0) {
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
    <div>
    <div className={styles.gridContainer}>
      {userPosts.map((post) => (
        <Link href={`/post/${post._id}`} key={post._id} className={styles.gridItem}>
          <Image
            src={`${BASE_URL}/${changeEscapeChar(post.images[0])} || "/placeholder.svg"`}
            alt={`Post by ${post.user?.username || "unknown"}`}
            className={styles.gridImage}
            width={300}
            height={300}
          />
        </Link>
      ))}
      
    </div>
    <button className={styles.addButton} onClick={handleAddPostClick}>
        Add Post <ArrowRight size={20} />
      </button>
    </div>
  )
}