import { Router } from "express";
import { ClientController } from "../controller/client.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";
import { validateMiddleware } from "../../../middleware/validate.middleware";
import { createClientValidator } from "../validators/create-client.validator";
import { updateClientValidator } from "../validators/update-client.validator";

const router = Router();

// Protect all client endpoints
router.use(authMiddleware);

router.post("/", validateMiddleware(createClientValidator), ClientController.createClient);
router.get("/", ClientController.getClients);
router.get("/:id", ClientController.getClientById);
router.patch("/:id", validateMiddleware(updateClientValidator), ClientController.updateClient);
router.delete("/:id", ClientController.deleteClient);

export default router;
