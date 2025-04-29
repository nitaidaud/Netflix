declare module "hls-server" {
  import { Server } from "http";

  interface HLSServerOptions {
    path?: string;
    dir?: string;
    debugLevel?: number;
  }

  class HLSServer {
    constructor(server: Server, options?: HLSServerOptions);
  }

  export = HLSServer;
}
