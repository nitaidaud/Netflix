import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import morgan from "morgan";
import { CLIENT, ORIGIN } from "./env_exports";
import streamerRouter from "./routes/streamer.routes";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(cors({ origin: [ORIGIN!, CLIENT!] }));
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/stream", streamerRouter);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

export { app };

