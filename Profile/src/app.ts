import express, { Application, Request, Response } from "express";
import cors from "cors";
import profileRouter from "./routes/profile.routes";
import { CLIENT, ORIGIN } from "./env_exports";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: [ORIGIN!, CLIENT!], credentials: true }));
app.use(cookieParser());

app.get("/api/profile/test", (req: Request, res: Response) => {
  res.send("Profile service is working!");
});

app.use("/api/profile", profileRouter)

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" });
  });

export { app };
