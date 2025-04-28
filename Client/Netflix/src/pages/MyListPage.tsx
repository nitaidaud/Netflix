import MoviesGrid from "@/components/browse/MovieGrid";
import MovieModal from "@/components/home/movieModal/MovieModal";
import Container from "@/components/shared/Container";
import { openModal } from "@/store/slice/modal.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const MyListPage = () => {
  const dispatch = useAppDispatch();
  const myList = useAppSelector(
    (state) => state.profile.profile?.moviesFavoriteList,
  );
  const handleMoreInfo = (movieId: number) => {
    dispatch(openModal(movieId));
  };
  console.log("My List movies", myList?.movies);
  return (
    <Container>
      <div className="text-start w-full py-20">
        {myList && myList.movies.length > 0 ? (
          <div className="w-full h-full">
            <h2 className="text-lg font-semibold">My List</h2>
            <MoviesGrid
              onMoreInfo={handleMoreInfo}
              movies={myList.movies}
              isLoading={false}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center size-full">
            <h2>No movies in your list</h2>
          </div>
        )}
      </div>
      <MovieModal />
    </Container>
  );
};

export default MyListPage;
