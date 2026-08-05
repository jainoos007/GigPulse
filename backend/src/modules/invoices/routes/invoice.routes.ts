import { Router } from "express";
import { InvoiceController } from "../controller/invoice.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";
import { validateMiddleware } from "../../../middleware/validate.middleware";
import { createInvoiceValidator } from "../validators/create-invoice.validator";
import { updateInvoiceValidator } from "../validators/update-invoice.validator";
import { recordPaymentValidator } from "../validators/record-payment.validator";

const router = Router();

router.use(authMiddleware);

router.post("/", validateMiddleware(createInvoiceValidator), InvoiceController.createInvoice);
router.get("/", InvoiceController.getInvoices);
router.get("/:id", InvoiceController.getInvoiceById);
router.patch("/:id", validateMiddleware(updateInvoiceValidator), InvoiceController.updateInvoice);
router.post("/:id/payments", validateMiddleware(recordPaymentValidator), InvoiceController.recordPayment);
router.delete("/:id", InvoiceController.deleteInvoice);

export default router;
