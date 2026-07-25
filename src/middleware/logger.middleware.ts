import morgan from "morgan";
import { env } from "../config";

const morganFormat = env.NODE_ENV === "production" ? "combined" : "dev";

export const logger = morgan(morganFormat, {
  skip: (req, res) => {
    // Skip logging health check in production
    return env.NODE_ENV === "production" && req.url === "/health";
  },
});

export const customLogger = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});
