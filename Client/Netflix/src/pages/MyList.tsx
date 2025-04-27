import Container from "@/components/shared/Container";
import { useAppSelector } from "@/store/store";

const MyList = () => {
  const myList = useAppSelector(
    (state) => state.profile.profile?.moviesFavoriteList,
  );

  return (
    <Container>
      <div className="text-start">
        <h2>My List</h2>
        <div>
          {myList && myList.movies.length > 0 ? (
            myList.movies.map((movie) => (
              <div key={movie.id}>
                <p>{movie.title}</p>
              </div>
            ))
          ) : (
            <p>No movies in your list</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default MyList;
