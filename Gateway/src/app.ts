import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { ORIGIN } from "./env_exports";
import { movieRoutes, userRoutes } from "./routes/routes";
import { createProxyMiddleware } from "http-proxy-middleware";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("origin", ORIGIN);
app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(cookieParser());


const USER_SERVICE_URL = "http://localhost:3000";
const MOVIES_SERVICE_URL = "http://localhost:3001";

// Apply proxy middleware to each router
app.use("/api/users", (req, res) => {
  console.log("hello");
  
}, createProxyMiddleware({ 
  target: USER_SERVICE_URL, 
  changeOrigin: true,
  on: {
    proxyReq:(proxyReq, req, res) => {
      console.log(req);
    }
  }
  
}));

app.use("/api/movies", createProxyMiddleware({ 
  target: MOVIES_SERVICE_URL, 
  changeOrigin: true 
}));

// Apply routes
// app.use("/api/users", userRoutes);
// app.use("/api/movies", movieRoutes);

// Catch-all route (after all other routes)
app.all("*", async (req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

export { app };