import axios from "axios";

const apiKey = process.env.API_KEY;
const baseURL = process.env.BASE_URL;
const token = process.env.MOVIE_API_KEY;

const tmbd = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
})

export default tmbd;