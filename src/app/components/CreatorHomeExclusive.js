import Image from 'next/image'
import styles from '../CreatorHome/stylescreator.module.css'

export default function ExclusiveFeatures() {
  const features = [
    {
      name: 'Rewards',
      icon: '/images/home-quick.webp',
      color: '#FF6B6B'
    },
    {
      name: 'Sourcing',
      icon: '/images/access-sourcing.webp',
      color: '#FFD93D'
    },
    {
      name: 'Engage',
      icon: '/images/access-engage.webp',
      color: '#6C63FF'
    }
  ]

  return (
    <div className={styles.containerExclusive}>
      <h2 className={styles.titleExclusive}>Collably Exclusive</h2>
      <div className={styles.featuresExclusive}>
        {features.map((feature) => (
          <div key={feature.name} className={styles.featureItemExclusive}>
            <div 
              className={styles.iconWrapperExclusive} 
              style={{ backgroundColor: feature.color }}
            >
              <Image
                src={feature.icon}
                alt={feature.name}
                width={24}
                height={24}
                className={styles.iconExclusive}
              />
              <span className={styles.lockedBadgeExclusive}>LOCKED</span>
            </div>
            <span className={styles.featureNameExclusive}>{feature.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

