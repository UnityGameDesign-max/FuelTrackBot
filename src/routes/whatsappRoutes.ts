import { Router } from "express";
import { handleIncomingMessage } from "../controllers/whatsAppController.js";

const router = Router();

// POST endpoint Twilio will call for incoming WhatsApp messages
router.post("/", handleIncomingMessage);

export default router;
