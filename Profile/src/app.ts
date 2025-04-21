import express, { Application, Request, Response } from "express";
import profileRouter from "./routes/profile.routes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/profile/test", (req: Request, res: Response) => {
  res.send("Profile service is working!");
});

app.use("/api/profile", profileRouter)

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" });
  });

export { app };
