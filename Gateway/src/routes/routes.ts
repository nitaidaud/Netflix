import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const USER_SERVICE_URL = "http://users:3000";
const MOVIES_SERVICE_URL = "http://movies:3001";
const PROFILES_SERVICE_URL = "http://profile:3001";

// Create router instances
const userRoutes = Router();
const movieRoutes = Router();
const profileRoutes = Router();

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
  async (req, res, next) => {
    console.log("Request received:", req.method, req.originalUrl);
    next();
  },
  createProxyMiddleware({
    target: MOVIES_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "": "/api/movies", // This ensures the path is correctly preserved
    },
    on: {
      error: (err, req, res) => {
        console.error("Proxy error:", err);
      },
      proxyReq: (proxyReq, req, res) => {
        console.log("Proxying request to:", MOVIES_SERVICE_URL + req.url);
      },
      proxyRes: (proxyRes, req, res) => {
        console.log("Received response with status:", proxyRes.statusCode);
      },
    },
  }),
);

profileRoutes.use(
  "/",
  async (req, res, next) => {
    console.log("Request received:", req.method, req.originalUrl);
    next();
  },
  createProxyMiddleware({
    target: PROFILES_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "": "/api/profile", // This ensures the path is correctly preserved
    },
    on: {
      error: (err, req, res) => {
        console.error("Proxy error:", err);
      },
      proxyReq: (proxyReq, req, res) => {
        console.log("Proxying request to:", PROFILES_SERVICE_URL + req.url);
      },
      proxyRes: (proxyRes, req, res) => {
        console.log("Received response with status:", proxyRes.statusCode);
      },
    },
  }),
);

export { movieRoutes, userRoutes, profileRoutes };
