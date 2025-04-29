import fs from "fs";
import HLSServer from "hls-server";
import { server } from "..";
import { TEMP_DIR } from "../env_exports";


export const createTempDir = () => {
  const tempDir = TEMP_DIR || "./temp";

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
};

export const createHLSServer = () => {
    new HLSServer(server, {
        path: "/streams",
        dir: TEMP_DIR,
      });
}