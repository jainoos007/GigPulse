import { Router } from "express";
import { TaskController } from "../controller/task.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";
import { validateMiddleware } from "../../../middleware/validate.middleware";
import { createTaskValidator } from "../validators/create-task.validator";
import { updateTaskValidator } from "../validators/update-task.validator";

const router = Router();

router.use(authMiddleware);

router.post("/", validateMiddleware(createTaskValidator), TaskController.createTask);
router.get("/", TaskController.getTasks);
router.get("/kanban", TaskController.getKanbanBoard);
router.get("/:id", TaskController.getTaskById);
router.patch("/:id", validateMiddleware(updateTaskValidator), TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

export default router;
