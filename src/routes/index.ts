import { Router } from "express";
import whatsappRoutes from "./whatsappRoutes.js";

const router = Router();

router.use("/webhook", whatsappRoutes);

export default router;
