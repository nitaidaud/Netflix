import HeroSection from "@/components/home/HeroSection";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import { useHomeContent } from "@/hooks/useHomeContent";
import Container from "@/components/shared/Container";

const Home = () => {
  const { data, isLoading } = useHomeContent();

  if (isLoading || !data) {
    return (
      //todo: add loading animation
      <Container>
        <div className="text-white">Loading...</div>
      </Container>
    );
  }

  return (
    <Container>
      <HeroSection />
      <CategoryCarousel title="Action Movies" movies={data.action} categoryLink="/browse?category=action" />
      <CategoryCarousel title="Comedy Movies" movies={data.comedy} categoryLink="/browse?category=comedy" />
      <CategoryCarousel title="Horror Movies" movies={data.horror} categoryLink="/browse?category=horror" />
      {/* Add more */}
    </Container>
  );
};

export default Home;