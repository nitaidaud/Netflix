import { PORT, validateEnv } from "../env_exports";
import { app } from "./app";

const start = async () => {
  validateEnv();

  //NOTE: if we need to connect to a database make it here with dbConnection

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

start();
