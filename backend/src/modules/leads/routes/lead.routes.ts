import { Router } from "express";
import { LeadController } from "../controller/lead.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";
import { validateMiddleware } from "../../../middleware/validate.middleware";
import { createLeadValidator } from "../validators/create-lead.validator";
import { updateLeadValidator } from "../validators/update-lead.validator";

const router = Router();

router.use(authMiddleware);

router.post("/", validateMiddleware(createLeadValidator), LeadController.createLead);
router.get("/", LeadController.getLeads);
router.get("/:id", LeadController.getLeadById);
router.patch("/:id", validateMiddleware(updateLeadValidator), LeadController.updateLead);
router.post("/:id/convert", LeadController.convertLead);
router.delete("/:id", LeadController.deleteLead);

export default router;
