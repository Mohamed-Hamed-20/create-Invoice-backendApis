import { Router } from "express";
import * as Ic from "../controllers/invoice";
import { valid } from "../middleware/valiation";
import * as Ivs from "../validations/invoiceSchema";
const router = Router();
router.post("/createInvoice", valid(Ivs.createInvoiceSchema), Ic.createInvoice);
router.post("/sendPdf", valid(Ivs.sendPdfSchema), Ic.sendPdf);
export default router;
