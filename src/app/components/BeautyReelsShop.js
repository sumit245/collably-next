import CreatorCard from './Cards/CreatorCard';
import styles from '../shop/StyleShop.module.css';

export default function BeautyReels() {
  const creators = [
    {
      id: '1',
      name: 'Voguishpriyanka',
      followers: '34.1K',
      videoSrc: 'https://collablybucket.s3.ap-south-1.amazonaws.com/posts/1/1741842474553/SLIDE%20FASHION%2004.mp4',
      posterSrc: 'https://blog-images-redesyn.s3.ap-south-1.amazonaws.com/2w44aiwqyl1r8epsb8rna26eim4s',
      price: 999,
    },
    {
      id: '2',
      name: 'tasmiyahsheikh',
      followers: '47.8K',
      videoSrc: 'https://video.gumlet.io/65112bc788ea257b8ad9139e/66507e0e189bb0e1e49137a6/main.mp4',
      posterSrc: 'https://blog-images-redesyn.s3.ap-south-1.amazonaws.com/qo1jjqvltzbjd95f3wje488l8rtp',
      price: 1299,
    },
    {
      id: '3',
      name: 'thesnowstar_',
      followers: '16.6K',
      videoSrc: 'https://video.gumlet.io/65112bc788ea257b8ad9139e/66507a54dc88f9b2f0c15bfa/main.mp4',
      posterSrc: 'https://blog-images-redesyn.s3.ap-south-1.amazonaws.com/tcmdr3ttg2hkfku4i404cqlhe1ns',
      price: 1099,
    },
    {
      id: '4',
      name: 'tasmiyahsheikh',
      followers: '47.8K',
      videoSrc: 'https://video.gumlet.io/65112bc788ea257b8ad9139e/66507e0e189bb0e1e49137a6/main.mp4',
      posterSrc: 'https://blog-images-redesyn.s3.ap-south-1.amazonaws.com/qo1jjqvltzbjd95f3wje488l8rtp',
      price: 1299,
    },
   
  ];

  return (
    <section className={styles.creatorSection}>
      <h4 className={styles.sectionTitleShop}>Beauty Reels</h4>
      <div className={styles.creatorScroll}>
        {creators.map((creator) => (
          <CreatorCard key={creator.id} {...creator} />
        ))}
      </div>
    </section>
  );
}
