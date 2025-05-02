import MoviesGrid from "@/components/browse/MovieGrid";
import MovieModal from "@/components/home/modals/movieModal/MovieModal";
import TVModal from "@/components/home/modals/tvModal/TvModal";
import Container from "@/components/shared/Container";
import Typography from "@/components/shared/Typography";
import { openMovieModal, openTVShowModal } from "@/store/slice/modal.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const MyListPage = () => {
  const dispatch = useAppDispatch();
  const myList = useAppSelector((state) => state.profile.profile?.favoriteList);
  const handleMoreInfo = (id: number, type: "Movie" | "Show") => {
    if (type === "Show") dispatch(openTVShowModal(id));
    else dispatch(openMovieModal(id));
  };
  return (
    <Container className="min-h-screen pt-24">
      {myList && myList.favoriteList.length > 0 ? (
        <div className="w-full h-full">
          <Typography size="text-2xl" weight="font-bold">
            My List
          </Typography>
          <MoviesGrid
            onMoreInfo={handleMoreInfo}
            movies={myList.favoriteList}
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
      <TVModal />
    </Container>
  );
};

export default MyListPage;
