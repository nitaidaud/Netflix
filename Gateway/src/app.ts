import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { ORIGIN } from "./env_exports";
import { movieRoutes, userRoutes } from "./routes/routes";

const app: Application = express();

// Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
console.log("origin", ORIGIN);
app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);

// Catch-all route (after all other routes)
app.all("*", async (req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

export { app };
