import HeroSection from "@/components/home/HeroSection";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import { useHomeContent } from "@/hooks/useHomeContent";
import Container from "@/components/shared/Container";

const Home = () => {
  const { data, isLoading } = useHomeContent();

  if (isLoading || !data) {
    return (
      //TODO: add loading animation
      <Container>
        <div className="text-white">Loading...</div>
      </Container>
    );
  }

  const heroMovie = data.newMovies[0];
  return (
    <div className="w-full bg-black">
      <HeroSection
        title={heroMovie.title}
        overview={heroMovie.overview}
        backdropPath={heroMovie.backdrop_path ?? ""}
      />

      <div className="space-y-16 px-6 lg:px-12 py-10">
        <CategoryCarousel
          title="Action Movies"
          movies={data.action}
          categoryLink="/browse?category=action"
        />
        <CategoryCarousel
          title="Comedy Movies"
          movies={data.comedy}
          categoryLink="/browse?category=comedy"
        />
        <CategoryCarousel
          title="Horror Movies"
          movies={data.horror}
          categoryLink="/browse?category=horror"
        />
        {/*  add more  */}
      </div>
    </div>
  );
};

export default Home;
