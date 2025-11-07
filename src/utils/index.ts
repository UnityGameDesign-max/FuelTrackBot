import type { FuelPrices } from "./types.js";

export const parseFuelSAResponse = (data: any): FuelPrices => {
  const petrol = data?.petrol || [];
  const diesel = data?.diesel || [];

  console.log("data", data);

  const petrol93 = petrol.find(
    (p: any) => p.octane === "93" && p.type === "Unleaded"
  )?.value;

  const petrol95 = petrol.find(
    (p: any) => p.octane === "95" && p.type === "Unleaded"
  )?.value;

  const diesel50 = diesel.find((d: any) => d.ppm === "50")?.value;
  const diesel500 = diesel.find((d: any) => d.ppm === "500")?.value;

  return {
    petrol93: petrol93 || 0,
    petrol95: petrol95 || 0,
    diesel50: diesel50 || 0,
    diesel500: diesel500 || 0,
  };
};