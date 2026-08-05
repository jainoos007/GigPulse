import { Router } from "express";
import authRoutes from "../modules/auth/routes/auth.routes";
import clientRoutes from "../modules/clients/routes/client.routes";
import leadRoutes from "../modules/leads/routes/lead.routes";
import projectRoutes from "../modules/projects/routes/project.routes";
import taskRoutes from "../modules/tasks/routes/task.routes";

const apiV1Router = Router();

apiV1Router.use("/auth", authRoutes);
apiV1Router.use("/clients", clientRoutes);
apiV1Router.use("/leads", leadRoutes);
apiV1Router.use("/projects", projectRoutes);
apiV1Router.use("/tasks", taskRoutes);

apiV1Router.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "v1",
  });
});

export default apiV1Router;
