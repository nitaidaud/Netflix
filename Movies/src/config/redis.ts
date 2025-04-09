import { createClient } from "redis";
import { REDIS_PASSWORD, REDIS_SOCKET_HOST, REDIS_SOCKET_PORT, REDIS_USERNAME } from "../../env_exports";

class RedisClient {
  private static instance: ReturnType<typeof createClient>;

  static getInstance() {
    if (!RedisClient.instance) {
      RedisClient.instance = createClient({
        username: REDIS_USERNAME!,
        password: REDIS_PASSWORD!,
        socket: {
          host: REDIS_SOCKET_HOST!,
          port: Number(REDIS_SOCKET_PORT!),
        },
      });

      RedisClient.instance.on("error", (err) => console.error("Redis Client Error", err));

      RedisClient.instance.connect();
    }

    return RedisClient.instance;
  }
}

export default RedisClient.getInstance();