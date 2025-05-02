import { Client, Environment, LogLevel } from "@paypal/paypal-server-sdk";
import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } from "../env_exports";

const PaypalClient = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: OAUTH_CLIENT_ID!,
    oAuthClientSecret: OAUTH_CLIENT_SECRET!,
  },
  timeout: 0,
  environment: Environment.Sandbox,
  logging: {
    logLevel: LogLevel.Info,
    logRequest: {
      logBody: true,
    },
    logResponse: {
      logHeaders: true,
    },
  },
});

export default PaypalClient;
