import express, { Application } from "express";
import helmet from "helmet";
import { env, connectDatabase } from "./config";
import { errorHandler, notFound } from "./middleware/error.middleware";
import { logger } from "./middleware/logger.middleware";
import { corsMiddleware } from "./middleware/cors.middleware";
import { sanitizeMongo, sanitizeInput } from "./middleware/sanitize.middleware";
import { router } from "./routes";

const app: Application = express();

app.use(helmet());
app.use(corsMiddleware);

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sanitizeMongo);
app.use(sanitizeInput);

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Portfolio API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", router);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();

    const PORT = parseInt(env.PORT);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${env.NODE_ENV}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

if (process.env.VERCEL !== "1") {
  startServer();
}

if (process.env.VERCEL === "1") {
  connectDatabase().catch((error) => {
    console.error("Failed to connect to database:", error);
  });
}

export { app };
