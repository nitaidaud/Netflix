import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { ORIGIN } from "./env_exports";
import {
  movieRoutes,
  profileRoutes,
  streamRoutes,
  userRoutes,
} from "./routes/routes";

const app: Application = express();

app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/stream", streamRoutes);

app.all("*", async (req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

export { app };
