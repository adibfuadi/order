import { z } from "zod";

export const nameSchema = z.string().trim().min(1).max(255);
export const priceSchema = z.number().min(0);

export const stockSchema = z.number().min(0);

export const productIdSchema = z.string().trim().min(1);

export const createProductSchema = z.object({
  name: nameSchema,
  price: priceSchema,
  stock: stockSchema,
});

export const updateProcuctSchema = z.object({
  name: nameSchema,
  price: priceSchema,
  stock: stockSchema
});