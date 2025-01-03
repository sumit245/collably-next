import CreatorCard from './Cards/CreatorCard'
import styles from '../shop/StyleShop.module.css'
export default function LatestCreators() {
  const creators = [
    { name: 'Voguishpriyanka', followers: '34.1K', videoSrc: 'https://video.gumlet.io/65112bc788ea257b8ad9139e/664ef61bdc88f9b2f0baf7ea/main.mp4', posterSrc: 'https://blog-images-redesyn.s3.ap-south-1.amazonaws.com/2w44aiwqyl1r8epsb8rna26eim4s' },
    { name: 'tasmiyahsheikh', followers: '47.8K', videoSrc: 'https://video.gumlet.io/65112bc788ea257b8ad9139e/66507e0e189bb0e1e49137a6/main.mp4', posterSrc: 'https://blog-images-redesyn.s3.ap-south-1.amazonaws.com/qo1jjqvltzbjd95f3wje488l8rtp' },
    { name: 'thesnowstar_', followers: '16.6K', videoSrc: 'https://video.gumlet.io/65112bc788ea257b8ad9139e/66507a54dc88f9b2f0c15bfa/main.mp4', posterSrc: 'https://blog-images-redesyn.s3.ap-south-1.amazonaws.com/tcmdr3ttg2hkfku4i404cqlhe1ns' },
    { name: 'theankitasangwan', followers: '6.92K', videoSrc: 'https://video.gumlet.io/65112bc788ea257b8ad9139e/660e4445da330b75b35f53c0/main.mp4', posterSrc: 'https://blog-images-redesyn.s3.ap-south-1.amazonaws.com/fs0p93igwzd13n03jsasw0whr7n6' },
  ]

  return (
    <section className={styles.creatorSection}>
    <h4 className={styles.sectionTitleShop}>Latest from the Creators</h4>
    <div className={styles.creatorScroll}>
      {creators.map((creator, index) => (
        <CreatorCard key={index} {...creator} />
        ))}
      </div>
    </section>
  )
}

