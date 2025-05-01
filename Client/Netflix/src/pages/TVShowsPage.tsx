import LoadingContentAnimation from "@/components/shared/LoadingContentAnimation";
import Typography from "@/components/shared/Typography";
import TVCard from "@/components/tv/TVCard";
import { useTVShows } from "@/hooks/useTVShows";
import { openTVShowModal } from "@/store/slice/modal.slice";
import { useAppDispatch } from "@/store/store";

const TVShowPage = () => {
  const { data: tvShows, isLoading } = useTVShows();
  const dispatch = useAppDispatch();
  return (
    <div className="p-6 pt-28 max-w-7xl mx-auto">
      <Typography className="mb-10" size="text-2xl" weight="font-bold">
        Tv Shows
      </Typography>

      {isLoading ? (
        <LoadingContentAnimation />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tvShows?.slice(0, 20).map((show) => (
            <TVCard
              key={show.id}
              show={show}
              image={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
              onMoreInfo={() => dispatch(openTVShowModal(show.id))}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default TVShowPage;
