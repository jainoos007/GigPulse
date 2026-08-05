import { Router } from "express";
import { ProjectController } from "../controller/project.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";
import { validateMiddleware } from "../../../middleware/validate.middleware";
import { createProjectValidator } from "../validators/create-project.validator";
import { updateProjectValidator } from "../validators/update-project.validator";

const router = Router();

router.use(authMiddleware);

router.post("/", validateMiddleware(createProjectValidator), ProjectController.createProject);
router.get("/", ProjectController.getProjects);
router.get("/:id", ProjectController.getProjectById);
router.patch("/:id", validateMiddleware(updateProjectValidator), ProjectController.updateProject);
router.delete("/:id", ProjectController.deleteProject);

export default router;
