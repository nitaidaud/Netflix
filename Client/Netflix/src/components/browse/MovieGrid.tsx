import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
 // לוודא שזה מוגדר

const MoviesGrid = () => {
  const [movies, setMovies] = useState<any[]>([]); //change type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/api/movies/popular"); 
        setMovies(data);
      } catch (error) {
        console.error("Error fetching popular movies", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, []);

  return (
    <div className="p-4 mt-10 border-amber-300 border-2 rounded-lg bg-neutral-900">
      <h2 className="text-white text-xl font-bold mb-4">Popular Movies test</h2>
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesGrid;
