import ActionsMovies from "@/components/home/movies/ActionsMovies";
import Container from "@/components/shared/Container";
import {useHomeContent} from "@/hooks/useHomeContent";

const Home = () => {
  const { data, isLoading } = useHomeContent();

  if (isLoading || !data) {
    return (
      //TODO: add a loading ANIMATION
      <Container>
        <div>Loading...</div>
      </Container> 
    );
  }
  return (
    <Container>
      <ActionsMovies movies={data.action} />
    </Container>
  );
};

export default Home;
