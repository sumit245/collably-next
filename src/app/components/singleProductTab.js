import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchReferralsByUserId, trackReferralClick } from "../store/brandSlice"
import EmptyState from "./emptystate"
import styles from "../CreatorShop/styles.creatorShop.module.css"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SingleProductLinksTab() {
  const router = useRouter()
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.user?._id)
  const referrals = useSelector((state) => state.brands.referrals || [])

  useEffect(() => {
    if (userId) {
      dispatch(fetchReferralsByUserId(userId))
    }
  }, [dispatch, userId])

  const handleAddLinkClick = () => {
    router.push('/linkCreate')
  }

  const extractReferralCode = (url) => {
    const match = url.match(/referralCode=([A-Za-z0-9]{6})/)
    return match ? match[1] : null
  }

  const handleLinkClick = async (referralCode, referralLink, e) => {
    e.preventDefault()
    
    try {
      await dispatch(trackReferralClick(referralCode)).unwrap()
      
      window.location.href = referralLink
    } catch (error) {
      console.error('Failed to track click:', error)
      window.location.href = referralLink
    }
  }

  if (referrals.length === 0) {
    return (
      <EmptyState
        type="links"
        title="No product links added yet!"
        description="Add single product links to share individual items with your audience"
        buttonText="Add Product Link"
      />
    )
  }

  return (
    <div>
      <button className={styles.addButton} onClick={handleAddLinkClick}>
        Add Links <ArrowRight size={20} />
      </button>
      <div className={styles.linksContainer}>
        {referrals.map((link) => {
          const referralCode = extractReferralCode(link.referralLink)
          return (
            <div
              key={link._id}
              className={styles.linkCard}
              onClick={(e) => handleLinkClick(referralCode, link.referralLink, e)}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.linkInfo}>
                <div className={styles.linkUrl}>{link.referralLink}</div>
                <div className={styles.linkStats}>
                  <span>Clicks: {link.clicks || 0}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
