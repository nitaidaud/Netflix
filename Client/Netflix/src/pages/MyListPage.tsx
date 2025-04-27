import MoviesGrid from "@/components/browse/MovieGrid";
import Container from "@/components/shared/Container";
import { useAppSelector } from "@/store/store";

const MyListPage = () => {
  const myList = useAppSelector(
    (state) => state.profile.profile?.moviesFavoriteList,
  );

  return (
    <Container>
      <div className="text-start">
        {myList && myList.movies.length > 0 ? (
          <>
            <h2>My List</h2>
            <MoviesGrid movies={myList.movies} isLoading={false} />
          </>
        ) : (
          <h2>No movies in your list</h2>
        )}
      </div>
    </Container>
  );
};

export default MyListPage;
