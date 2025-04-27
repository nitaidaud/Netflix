import CategoryCarousel from "@/components/home/CategoryCarousel";
import HeroSection from "@/components/home/HeroSection";
import MovieModal from "@/components/home/MovieModal"; // נוסיף מודל
import Container from "@/components/shared/Container";
import LoadingContentAnimation from "@/components/shared/LoadingContentAnimation";
import { useHomeContent } from "@/hooks/useHomeContent";

import { useState } from "react";

const categories = [
  { key: "newMovies", title: "New Releases", link: "/browse?category=new" },
  { key: "comedy", title: "Comedy Movies", link: "/browse?category=comedy" },
  { key: "horror", title: "Horror Movies", link: "/browse?category=horror" },
  { key: "action", title: "Action Movies", link: "/browse?category=action" },
  { key: "romance", title: "Romance Movies", link: "/browse?category=romance" },
  { key: "kids", title: "Kids Movies", link: "/browse?category=kids" },
  {
    key: "documentary",
    title: "Documentaries",
    link: "/browse?category=documentary",
  },
];

const Home = () => {
  const { data, isLoading } = useHomeContent();
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  if (isLoading || !data) {
    return (
      <Container>
        <div className="space-y-10 px-6 lg:px-12 py-10 bg-black">
          <LoadingContentAnimation />
        </div>
      </Container>
    );
  }

  const heroMovie = data.newMovies[8];

  return (
    <div className="w-full">
      <HeroSection
        title={heroMovie.title}
        overview={heroMovie.overview}
        backdropPath={heroMovie.backdrop_path ?? ""}
      />

      <div className="space-y-16 px-6 lg:px-12 py-10 bg-gradient-to-t from-black via-black/90 to-transparent -mt-13 relative z-20">
        {categories.map(({ key, title, link }) => (
          <CategoryCarousel
            key={key}
            title={title}
            movies={data[key as keyof typeof data]}
            categoryLink={link}
            onMoreInfo={setSelectedMovieId}
          />
        ))}
      </div>

      {selectedMovieId && (
        <MovieModal
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}

    </div>
  );
};

export default Home;
