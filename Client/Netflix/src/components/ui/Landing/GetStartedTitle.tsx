import Typography from "../../shared/Typography";
import STRINGS from "../Landing/STRINGS";

const GetStartedTitle = () => {
  return (
    <>
      <Typography size="text-4xl" weight="font-bold" className="max-w-2xl">
        {STRINGS.UnlimitedMovies}
      </Typography>
      <Typography size="text-xl" className="mt-4">
        {STRINGS.WatchAnywhere}
      </Typography>
      <Typography size="text-sm" className="mt-4">
        {STRINGS.ReadyToWatch}
      </Typography>
    </>
  );
};

export default GetStartedTitle;
