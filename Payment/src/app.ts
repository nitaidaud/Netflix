import express, { Application, Request, Response } from "express";
import cors from "cors";
import { CLIENT, ORIGIN } from "./env_exports";
import paymentsRouter from "./routers/payments.router";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(cors({ origin: [ORIGIN!, CLIENT!], credentials: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/payments", paymentsRouter);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

export { app };
