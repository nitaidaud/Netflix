import { createProxyMiddleware } from "http-proxy-middleware";
import express from "express";

const USER_SERVICE_URL = "http://localhost:3000";
const MOVIES_SERVICE_URL = "http://localhost:3001";

// Create router instances
const userRoutes = express.Router();
const movieRoutes = express.Router();

// Apply proxy middleware to each router
userRoutes.use("/", (req, res) => {
  console.log("hello");
  
}, createProxyMiddleware({ 
  target: USER_SERVICE_URL, 
  changeOrigin: true,
  
}));

movieRoutes.use("/", createProxyMiddleware({ 
  target: MOVIES_SERVICE_URL, 
  changeOrigin: true 
}));

export { userRoutes, movieRoutes };