import app from "./app";
import { config } from "./config/environment";
import prisma from "./database/prisma";

const server = app.listen(config.port, () => {
  console.log(
    `GigPulse Backend API running on http://localhost:${config.port} [${config.nodeEnv}]`,
  );
});

const gracefulShutdown = async (signal: string) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    await prisma.$disconnect();
    console.log("Database connection closed. Exiting process.");
    process.exit(0);
  });
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
