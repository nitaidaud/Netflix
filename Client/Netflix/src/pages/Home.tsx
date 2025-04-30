import CategoryCarousel from "@/components/home/CategoryCarousel";
import HeroSection from "@/components/home/HeroSection";
import MovieModal from "@/components/home/movieModal/MovieModal";
import Container from "@/components/shared/Container";
import LoadingContentAnimation from "@/components/shared/LoadingContentAnimation";

import { useHomeContent } from "@/hooks/useHomeContent";
import { useMovieById } from "@/hooks/useMovieById";
import { openModal } from "@/store/slice/modal.slice";
import { useAppDispatch } from "@/store/store";


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

const HeroIdMovie = 953;

const Home = () => {
  const { data, isLoading } = useHomeContent();
  const { data:heroIdMovie, isLoading:isHeroLoading } = useMovieById(HeroIdMovie);
  const dispatch = useAppDispatch();
  if (isLoading || !data || isHeroLoading || !heroIdMovie) {
    return (
      <Container>
        <div className="space-y-10 px-6 lg:px-12 py-10 bg-black">
          <LoadingContentAnimation />
        </div>
      </Container>
    );
  }

  //const heroMovie = data.newMovies[8]; // Display movie for Hero section

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroSection
        title={heroIdMovie.title}
        overview={heroIdMovie.overview}
        backdropPath={heroIdMovie.backdrop_path ?? ""}
        movieId={heroIdMovie.id}
      />

      {/* Movie Categories */}
      <div className="space-y-16 px-6 lg:px-12 py-10 bg-gradient-to-t from-black via-black/90 to-transparent -mt-13 relative z-20">
        {categories.map(({ key, title, link }) => (
          <CategoryCarousel
            onMoreInfo={(id) => dispatch(openModal(id))} // Open modal on movie click
            key={key}
            title={title}
            movies={data[key as keyof typeof data]}
            categoryLink={link}
          />
        ))}
      </div>

      {/* Movie Modal */}
      <MovieModal />
    </div>
  );
};

export default Home;
