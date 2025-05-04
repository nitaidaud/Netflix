import { app } from "./app";
import { dbConnection } from "./config/db";
import { PORT, validateEnv } from "./env_exports";

const start = async () => {
  validateEnv();

  dbConnection();

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

start();
