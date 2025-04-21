import { createProxyMiddleware } from "http-proxy-middleware";
import express from "express";

// const USER_SERVICE_URL = "http://localhost:3000/api/users";
const USER_SERVICE_URL = "http://users:3000";
const MOVIES_SERVICE_URL = "http://movies:3001/api/movies";

// Create router instances
const userRoutes = express.Router();
const movieRoutes = express.Router();

// Apply proxy middleware to each router
userRoutes.use(
  "/",
  async (req, res, next) => {
    console.log("Request received:", req.method, req.originalUrl);
    next();
  },
  createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "": "/api/users", // This ensures the path is correctly preserved
    },
    on: {
      error: (err, req, res) => {
        console.error("Proxy error:", err);
      },
      proxyReq: (proxyReq, req, res) => {
        console.log("Proxying request to:", USER_SERVICE_URL + req.url);
      },
      proxyRes: (proxyRes, req, res) => {
        console.log("Received response with status:", proxyRes.statusCode);
      },
    },
  }),
);

movieRoutes.use(
  "/",
  createProxyMiddleware({
    target: MOVIES_SERVICE_URL,
    changeOrigin: true,
  }),
);

export { userRoutes, movieRoutes };
