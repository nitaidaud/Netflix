import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRouter } from "./routes/user.router";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5174", credentials: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/users", userRouter);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
})

export { app };
