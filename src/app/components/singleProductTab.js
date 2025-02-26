import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReferralsByUserId } from "../store/brandSlice"; // Import action
import EmptyState from "./emptystate";
import styles from "../CreatorShop/styles.creatorShop.module.css";
import Link from "next/link";
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SingleProductLinksTab() {
  const router = useRouter()
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?._id);
  const referrals = useSelector((state) => state.brands.referrals || []);

  // Fetch referrals when the component loads
  useEffect(() => {
    if (userId) {
      dispatch(fetchReferralsByUserId(userId));
    }
  }, [dispatch, userId]);

  const handleAddLinkClick = () => {
    router.push('/linkCreate')
  }

  if (referrals.length === 0) {
    return (
      <EmptyState
        type="links"
        title="No product links added yet!"
        description="Add single product links to share individual items with your audience"
        buttonText="Add Product Link"
      />
    );
  }

  return (
    <div>
         <button className={styles.addButton} onClick={handleAddLinkClick}>
        Add Links <ArrowRight size={20} />
      </button>
    <div className={styles.linksContainer}>
      
      {referrals.map((link) => (
        <Link href={link.referralLink} key={link._id}>
          <div className={styles.linkCard}>
            <div className={styles.linkInfo}>
              <div className={styles.linkUrl}>{link.referralLink}</div>
              <div className={styles.linkStats}>
                <span>Clicks: {link.clicks || 0}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
      
    </div>
    </div>
  );
}
