import { PORT, validateEnv } from "./env_exports";
import { app } from "./app";

const start = async () => {
  validateEnv();

  app.listen(PORT || 5000, () => {
    console.log(`Proxy Server is listening on port ${PORT || 5000}`);
  });
};

start();
