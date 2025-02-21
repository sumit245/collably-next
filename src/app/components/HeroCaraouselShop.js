import VideoCarouselCard from './Cards/VideoCard';

export default function HeroCarousel({ data }) {
  return (
    <main>
      <VideoCarouselCard 
        videos={data.videos} 
        title={data.title} 
        subtitle={data.subtitle} 
      />
    </main>
  );
}