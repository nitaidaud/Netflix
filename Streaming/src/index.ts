import http from "http";
import { app } from "./app";
import { configAWS, createTempDir } from "./config/config";
import { PORT, validateEnv } from "./env_exports";

// Start the server
export function start(): http.Server {
  validateEnv();

  createTempDir();

  const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

  return server;
}

const server = start();

export { server };

