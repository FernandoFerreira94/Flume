import { z } from "zod";

const capitalizeTransform = (val: string): string => {
  if (val.length === 0) return val;
  const lower = val.toLowerCase();
  const firstChar = lower.charAt(0).toUpperCase();
  const rest = lower.slice(1);
  return firstChar + rest;
};

// Define o esquema reutilizável para string capitalizada
export const CapitalizedString = z.string().transform(capitalizeTransform);
