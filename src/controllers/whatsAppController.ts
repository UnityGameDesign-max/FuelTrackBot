import type { Request, Response } from "express";
import { sendWhatsAppMessage } from "../services/whatsAppService.js";
import {
  getUserState,
  setUserState,
  clearUserState,
} from "../services/conversationService.js";

export async function handleIncomingMessage(req: Request, res: Response) {
  const from = req.body.From;
  const message = req.body.Body?.trim().toLowerCase() || "";

  try {
    const state = getUserState(from);

    if (!state) {
      await sendWhatsAppMessage(
        from,
        `👋 *Welcome to FuelTrack Bot!*  
 
          I help you check fuel prices, plan trip expenses, and track your fuel spending — all from WhatsApp 🚗💨

          Here’s what I can do: 

          1️⃣ Check current fuel prices  
          2️⃣ Plan your trip fuel cost  
          3️⃣ Track your fuel spending  
          4️⃣ Learn how to save on fuel  

          Reply with a number (1–4) to continue.`
      );
      setUserState(from, "main_menu");
      return res.sendStatus(200);
    }
    if (state === "main_menu") {
      switch (message) {
        case "1":
          await sendWhatsAppMessage(from, "⛽ Enter your province name:");
          setUserState(from, "fuel_province");
          break;

        case "2":
          await sendWhatsAppMessage(from, "🧮 Enter your trip distance (km):");
          setUserState(from, "trip_distance");
          break;

        case "3":
          await sendWhatsAppMessage(from, "💸 Enter today’s fuel spend (R):");
          setUserState(from, "spending_amount");
          break;

        case "4":
          await sendWhatsAppMessage(
            from,
            `💡 *Fuel-Saving Tips:*  
1️⃣ Keep tyres inflated.  
2️⃣ Avoid idling too long.  
3️⃣ Maintain steady speeds.  
4️⃣ Plan routes to avoid traffic.  

Reply *Menu* to go back.`
          );
          clearUserState(from);
          break;

        default:
          await sendWhatsAppMessage(
            from,
            "Please reply with 1️⃣, 2️⃣, 3️⃣, or 4️⃣."
          );
      }

      return res.sendStatus(200);
    }

    if (message === "menu") {
      clearUserState(from);
      await sendWhatsAppMessage(from, "👋 Type *Hi* to start again.");
      return res.sendStatus(200);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Error handling WhatsApp message:", error);
    res.sendStatus(500);
  }
}
