import axios from "axios";
import { getCache, setCache } from "../config/cache.js";
import type { FuelPrices } from "../utils/types.js";
import { parseFuelSAResponse } from "../utils/index.js";

const FUEL_SA_API_URL = process.env.FUELSA_API_URL || "https://api.fuelsa.co.za/exapi/fuel";
const FUEL_SA_API_KEY = process.env.FUELSA_API_KEY || "";

console.log(FUEL_SA_API_URL)
console.log(FUEL_SA_API_KEY)

// cache key and TTL (time-to-live)
const CACHE_KEY = "fuelPrices";
const CACHE_TTL_SECONDS = 6 * 60 * 60; // 6 hours — prices rarely change daily



export const getFuelPrices = async (): Promise<string> => {
  // check cache first
  const cachedData = getCache<FuelPrices>(CACHE_KEY);

  console.log("cachedData", cachedData);
  if (cachedData) {
    console.log("✅ Using cached fuel prices");
    return formatFuelPrices(cachedData);
  }

  console.log("⛽ Fetching new fuel prices from FuelSA...");
  try {
    const response = await axios.get(`${FUEL_SA_API_URL}/current`, {
      headers: {
        key: `${FUEL_SA_API_KEY}`,
      },
      timeout: 5000,
    });

    const prices = response.data;
    const parsed = parseFuelSAResponse(prices)
    // store in cache
    setCache(CACHE_KEY, parsed, CACHE_TTL_SECONDS);


    return formatFuelPrices(parsed);
  } catch (error: any) {
    console.error("❌ Error fetching fuel prices:", error.message);

    const lastKnown = getCache<FuelPrices>(CACHE_KEY);
    if (lastKnown) {
      return (
        "⚠️ Live update unavailable — showing last known data.\n" +
        formatFuelPrices(lastKnown)
      );
    }

    throw new Error("Unable to fetch fuel prices right now.");
  }
};

const formatFuelPrices = (data: FuelPrices): string => `
⛽ Current Fuel Prices in South Africa 🇿🇦
-------------------
🚗 Petrol 95 (Unleaded): R${((Number(data.petrol95) || 0) / 100).toFixed(2)}/L
🚙 Petrol 93 (Unleaded): R${((Number(data.petrol93) || 0) / 100).toFixed(2)}/L
🚛 Diesel 50ppm: R${((Number(data.diesel50) || 0) / 100).toFixed(2)}/L
🚛 Diesel 500ppm: R${((Number(data.diesel500) || 0) / 100).toFixed(2)}/L
-------------------
Source: FuelSA API
🕒 Updated: 2025/11/0
`;
