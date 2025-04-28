import axios from "axios";
import { MOVIE_BASE_URL, MOVIE_API_KEY } from "../env_exports";

const tmbd = axios.create({
  baseURL: MOVIE_BASE_URL,
  headers: {
    Authorization: `Bearer ${MOVIE_API_KEY}`,
    Accept: "application/json",
  },
});

export default tmbd;
