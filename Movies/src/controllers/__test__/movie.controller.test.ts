import request from "supertest";
import { prisma } from "../../../prisma/prisma";
import { app } from "../../app";

describe("Test for movies controller", () => {
  describe("getPopularMovie", () => {
    it("should return 200 if get popular movies successfully", async () => {
      // First, we need to sign up the user before updating user
      const res = await request(app).get("/api/movies/popular").send();

      expect(res.status).toBe(200);
    });
  });

  describe("getTopMovies", () => {
    it("should return 200 if get top movies successfully", async () => {
      const res = await request(app).get("/api/movies/top").send();

      expect(res.status).toBe(200);
    });
  });

  describe("search", () => {
    it("should return 200 if search movies successfully", async () => {
      const res = await request(app)
        .get("/api/movies/search")
        .query({ query: "iron" })
        .send();

      expect(res.status).toBe(200);
    });
  });

  describe("getMoviesByGenre", () => {
    const genre = "action";
    it("should return 200 if get movies by genre successfully", async () => {
      const res = await request(app).get(`/api/movies/genre/${genre}`).send();

      expect(res.status).toBe(200);
    });
  });

  describe("getMovieById", () => {
    const movieId = 557;
    it("should return 200 if get movie successfully", async () => {
      const res = await request(app).get(`/api/movies/getMovieById/${movieId}`).send();

      expect(res.status).toBe(200);
    });
  });

  describe("getMovieTrailer", () => {
    const movieId = 557;
    it("should return 200 if get movie successfully", async () => {
      const res = await request(app)
        .get(`/api/movies/${movieId}/trailer`)
        .send();

      expect(res.status).toBe(200);
    });
  });

  describe("getMoviesByPage", () => {
    it("should return 200 if get movies by page successfully", async () => {
      const res = await request(app).get("/api/movies/getMovies/page/3").send();

      expect(res.status).toBe(200);
    });
  });

  describe("getNewMovies", () => {
    it("should return 200 if get new movies successfully", async () => {
      const res = await request(app).get("/api/movies/new").send();

      expect(res.status).toBe(200);
    });
  });

  describe("getComedyMovies", () => {
    it("should return 200 if get comedy movies successfully", async () => {
      const res = await request(app).get("/api/movies/comedy").send();

      expect(res.status).toBe(200);
    });
  });

  describe("getHorrorMovies", () => {
    it("should return 200 if get horror movies successfully", async () => {
      const res = await request(app).get("/api/movies/horror").send();

      expect(res.status).toBe(200);
    });
  });

  describe("getActionMovies", () => {
    it("should return 200 if get action movies successfully", async () => {
      const res = await request(app).get("/api/movies/action").send();

      expect(res.status).toBe(200);
    });
  });

  describe("getRomanceMovies", () => {
    it("should return 200 if get romance movies successfully", async () => {
      const res = await request(app).get("/api/movies/romance").send();

      expect(res.status).toBe(200);
    });
  });

  describe("getKidsMovies", () => {
    it("should return 200 if get kids movies successfully", async () => {
      const res = await request(app).get("/api/movies/kids").send();

      expect(res.status).toBe(200);
    });
  });

  describe("getAnimationMovies", () => {
    it("should return 200 if get animation movies successfully", async () => {
      const res = await request(app).get("/api/movies/animation").send();

      expect(res.status).toBe(200);
    });
  });

  describe("getCrimeMovies", () => {
    it("should return 200 if get crime movies successfully", async () => {
      const res = await request(app).get("/api/movies/crime").send();

      expect(res.status).toBe(200);
    });
  });

  describe("getDocumentaryMovies", () => {
    it("should return 200 if get documentary movies successfully", async () => {
      const res = await request(app).get("/api/movies/documentary").send();

      expect(res.status).toBe(200);
    });
  });

  describe("getHomeContent", () => {
    it("should return 200 if get home content successfully", async () => {
      const res = await request(app).get("/api/movies/home").send();

      expect(res.status).toBe(200);
    });
  });
});
