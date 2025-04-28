import MoviesGrid from "@/components/browse/MovieGrid";
import Container from "@/components/shared/Container";
import { openModal } from "@/store/slice/modal.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const MyListPage = () => {
  const dispatch = useAppDispatch();
  const myList = useAppSelector(
    (state) => state.profile.profile?.moviesFavoriteList
  );
  const handleMoreInfo = (movieId: number) => {
    dispatch(openModal(movieId));
  };
  console.log("My List movies", myList?.movies);
  return (
    <Container>
      <div className="text-start">
        {myList && myList.movies.length > 0 ? (
          <>
            <h2>My List</h2>
            <MoviesGrid
              onMoreInfo={handleMoreInfo}
              movies={myList.movies}
              isLoading={false}
            />
          </>
        ) : (
          <h2>No movies in your list</h2>
        )}
      </div>
    </Container>
  );
};

export default MyListPage;
