import client from "../config/twilio.js";
import dotenv from 'dotenv';

dotenv.config();

export async function sendWhatsAppMessage(to: string, body: string) {
  try {
    const message = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: "whatsapp:+27737258031",
      body: body
    });
    console.log("✅ Message sent:", message.sid);
  } catch (err) {
    console.error("❌ Error sending WhatsApp message:", err);
    throw err;
  }
}
