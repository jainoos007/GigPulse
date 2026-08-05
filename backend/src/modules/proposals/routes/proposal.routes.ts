import { Router } from "express";
import { ProposalController } from "../controller/proposal.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";
import { validateMiddleware } from "../../../middleware/validate.middleware";
import { createProposalValidator } from "../validators/create-proposal.validator";
import { updateProposalValidator } from "../validators/update-proposal.validator";

const router = Router();

router.use(authMiddleware);

router.post("/", validateMiddleware(createProposalValidator), ProposalController.createProposal);
router.get("/", ProposalController.getProposals);
router.get("/:id", ProposalController.getProposalById);
router.patch("/:id", validateMiddleware(updateProposalValidator), ProposalController.updateProposal);
router.post("/:id/convert", ProposalController.convertProposal);
router.delete("/:id", ProposalController.deleteProposal);

export default router;
