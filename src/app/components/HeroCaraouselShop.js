import VideoCarouselCard from './Cards/VideoCard';

export default function HeroCarousel() {
  const videos = [
    { src: "images/playback.mp4" },
    { src: "images/playback.mp4" },
    { src: "images/playback.mp4" },
    { src: "images/playback.mp4" },
    { src: "images/playback.mp4" },
  ];

  return (
    <main>
      <VideoCarouselCard 
        videos={videos} 
        title="Scroll and Shop" 
        subtitle="From Your ❤ Creators & Brands" 
      />
    </main>
  );
}
