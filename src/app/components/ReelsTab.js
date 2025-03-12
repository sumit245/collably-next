import EmptyState from './emptystate'
import styles from '../CreatorShop/styles.creatorShop.module.css'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { ArrowRight } from 'lucide-react'
import { BASE_URL } from "../services/api";

const changeEscapeChar = (path) => path?.replace(/\\/g, "/") || ""

export default function ReelsTab() {
  const router = useRouter()
  const { posts } = useSelector((state) => state.posts)
  const user = useSelector((state) => state.auth.user)

  const userReels = posts.filter(post => post.user?._id === user?._id && post.video)
  
  const handleAddReelClick = () => {
    router.push('/videoRec')
  }

  if (userReels.length === 0) {
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
    <div>
       <button className={styles.addButton} onClick={handleAddReelClick}>
        Add Reel <ArrowRight size={20} />
      </button>
    <div className={styles.gridContainer}>
      {userReels.map((reel) => (
        <Link href={`/post/${reel._id}`} key={reel._id} className={styles.gridItem}>
          <video
            className={styles.gridVideo}
            // width={100}
            // src={`${BASE_URL}${changeEscapeChar(reel.video)}`}
            // height={100}
          >
             <source src={`${BASE_URL}${changeEscapeChar(reel.video)}`} type="video/mp4" />
          </video>
        </Link>
      ))}
      
    </div>
   
    </div>
  )
}