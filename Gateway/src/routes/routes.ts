import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import {
  MOVIES_SERVICE_URL,
  PAYMENTS_SERVICE_URL,
  PROFILES_SERVICE_URL,
  STREAMING_SERVICE_URL,
  USER_SERVICE_URL,
} from "../env_exports";
import { checkAuthMiddleware } from "../middleware/auth.middleware";

const userRoutes = Router();
const movieRoutes = Router();
const profileRoutes = Router();
const streamRoutes = Router();
const paymentsRoutes = Router();

userRoutes.use(
  "/",
  checkAuthMiddleware,
  createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "": "/api/users",
    },
    on: {
      error: (err, req, res) => {
        // console.error("Proxy error:", err);
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
  checkAuthMiddleware,
  createProxyMiddleware({
    target: MOVIES_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "": "/api/movies",
    },
    on: {
      error: (err, req, res) => {
        // console.error("Proxy error:", err);
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
  checkAuthMiddleware,
  createProxyMiddleware({
    target: PROFILES_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "": "/api/profile",
    },
    on: {
      error: (err, req, res) => {
        // console.error("Proxy error:", err);
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

streamRoutes.use(
  "/",
  checkAuthMiddleware,
  createProxyMiddleware({
    target: STREAMING_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "": "/api/stream",
    },
    on: {
      error: (err, req, res) => {
        // console.error("Proxy error:", err);
      },
      proxyReq: (proxyReq, req, res) => {
        console.log("Proxying request to:", STREAMING_SERVICE_URL + req.url);
      },
      proxyRes: (proxyRes, req, res) => {
        console.log("Received response with status:", proxyRes.statusCode);
      },
    },
  }),
);

paymentsRoutes.use(
  "/",
  checkAuthMiddleware,
  createProxyMiddleware({
    target: PAYMENTS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "": "/api/payments",
    },
    on: {
      error: (err, req, res) => {
        // console.error("Proxy error:", err);
      },
      proxyReq: (proxyReq, req, res) => {
        console.log("Proxying request to:", PAYMENTS_SERVICE_URL + req.url);
      },
      proxyRes: (proxyRes, req, res) => {
        console.log("Received response with status:", proxyRes.statusCode);
      },
    },
  }),
);

export { movieRoutes, profileRoutes, streamRoutes, userRoutes, paymentsRoutes };
