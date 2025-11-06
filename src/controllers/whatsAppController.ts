import type { Request, Response } from "express";
import { sendWhatsAppMessage } from "../services/whatsAppService.js";
import dotenv from 'dotenv';

dotenv.config();
export async function handleIncomingMessage(req: Request, res: Response) {
  const from = "+27737258031";

  const body = "Hello Bot!!";

  try {
    let reply = "";

    if (["fuel", "price"].includes(body)) {
      reply = `⛽ Fuel Prices (Test):
- Petrol 95: R23.45
- Diesel: R22.10`;
    } else {
      reply = `🤖 Unknown command. Type "fuel" for current prices.`;
    }

    await sendWhatsAppMessage(from, reply);
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Error handling WhatsApp message:", err);
    res.sendStatus(500);
  }
}
