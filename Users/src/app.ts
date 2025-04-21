import cors from "cors";
import express, { Application, Request, Response } from "express";
import { CLIENT, ORIGIN } from "./env_exports";
import { userRouter } from "./routes/user.router";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: [ORIGIN!, CLIENT!], credentials: true }));
app.use(cookieParser());

app.get("/api/users/test-direct", (req, res) => {
  res.send("User service is working directly!");
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/users", userRouter);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

export { app };
