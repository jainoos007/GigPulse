import { Router } from "express";
import authRoutes from "../modules/auth/routes/auth.routes";
import clientRoutes from "../modules/clients/routes/client.routes";

const apiV1Router = Router();

apiV1Router.use("/auth", authRoutes);
apiV1Router.use("/clients", clientRoutes);

apiV1Router.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "v1",
  });
});

export default apiV1Router;
