import type { Request, Response } from "express";
import { sendWhatsAppMessage } from "../services/whatsAppService.js";
import {
  getUserState,
  setUserState,
  clearUserState,
} from "../services/conversationService.js";
import { getFuelPrices } from "../services/fuelSAService.js";


const introMessage = `
👋 *Welcome to FuelTrack Bot!*  

I'm your smart assistant for managing fuel costs in South Africa.  
I help you check fuel prices, plan trip expenses, and track your fuel spending — all from WhatsApp 🚗💨  

Here’s what I can do:
1️⃣ Check current fuel prices  
2️⃣ Plan your trip fuel cost  
3️⃣ Track your fuel spending  
4️⃣ Learn how to save on fuel  

Reply with a number (1–4) to continue.
`;

export async function handleIncomingMessage(req: Request, res: Response) {
  const incomingMsg = req.body.Body?.trim().toLowerCase();
  const from = req.body.From;

  try{
    if(["hi", "hello", "start", "menu"].includes(incomingMsg)) {
      await sendWhatsAppMessage(from, introMessage);
      return res.sendStatus(200)
    }

    if (incomingMsg === "1"){
      const prices = await getFuelPrices();
      await sendWhatsAppMessage(from, prices);
      return res.sendStatus(200);
    }

    await sendWhatsAppMessage(
      from,
      "⚠️ That feature is coming soon! Try replying with *1* to check current fuel prices."
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Error handling WhatsApp message:", err);
    res.sendStatus(500);
  }
}
