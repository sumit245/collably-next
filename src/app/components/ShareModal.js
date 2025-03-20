import { useState } from 'react'
import styles from '../feed/stylesfeed.module.css'

export default function ShareModal({ reel, onClose }) {
  const [copySuccess, setCopySuccess] = useState('')

  const shareOptions = [
    { name: 'Copy Link', icon: '🔗', action: copyToClipboard },
    { name: 'Share Via', icon: '📤', action: useWebShare },
    
  ]

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(`https://newapp.collably.in/feed?reelId=${reel._id}`)
      setCopySuccess('Link copied!')
      setTimeout(() => setCopySuccess(''), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  async function useWebShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${reel.username}'s Reel`,
          text: reel.caption,
          url: `https://newapp.collably.in/feed?reelId=${reel._id}`,
        })
      } catch (err) {
        console.error('Error sharing: ', err)
      }
    } else {
      alert('Web Share API is not supported in your browser')
    }
  }

 
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>Share to</h2>
        <div className={styles.shareOptions}>
          {shareOptions.map((option) => (
            <button 
              key={option.name} 
              className={styles.shareOption}
              onClick={option.action}
            >
              <span className={styles.shareIcon}>{option.icon}</span>
              <span className={styles.shareIconName}>{option.name}</span>
            </button>
          ))}
        </div>
        {copySuccess && <p className={styles.copySuccess}>{copySuccess}</p>}
        <button className={styles.closeButton} onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}

