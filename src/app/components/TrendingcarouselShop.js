import VideoCarouselCard from './Cards/VideoCard';

export default function TrendingCarousel() {
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
        title="Trending Products" 
        subtitle="From Your ❤ Creators & Brands" 
      />
    </main>
  );
}
