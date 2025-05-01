import MoviesGrid from "@/components/browse/MovieGrid";
import MovieModal from "@/components/home/movieModal/MovieModal";
import Container from "@/components/shared/Container";
import Typography from "@/components/shared/Typography";
import { openMovieModal } from "@/store/slice/modal.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const MyListPage = () => {
  const dispatch = useAppDispatch();
  const myList = useAppSelector(
    (state) => state.profile.profile?.moviesFavoriteList,
  );
  const handleMoreInfo = (movieId: number) => {
    dispatch(openMovieModal(movieId));
  };
  return (
    <Container className="min-h-screen pt-24">
      {myList && myList.movies.length > 0 ? (
        <div className="w-full h-full">
          <Typography size="text-2xl" weight="font-bold">
            My List
          </Typography>
          <MoviesGrid
            onMoreInfo={handleMoreInfo}
            movies={myList.movies}
            isLoading={false}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-[50vh]">
          <Typography
            size="text-2xl"
            weight="font-bold"
            color="text-gray-300"
            className="text-center"
          >
            No movies in your list
          </Typography>
        </div>
      )}
      <MovieModal />
    </Container>
  );
};

export default MyListPage;
