import { z } from "zod";

export const createOrderSchema = z.object({
    totalAmount: z
        .number({ message: "totalAmount must be a number" })
        .nonnegative({ message: "totalAmount must be >= 0" }),
    products: z
        .array(
            z.object({
                productId: z
                    .string({ message: "productId is required" })
                    .min(24, "Invalid productId")
                    .max(24, "Invalid productId"), // MongoDB ObjectId length
                quantity: z
                    .number({ message: "quantity must be a number" })
                    .min(1, "Quantity must be at least 1"),
                price: z
                    .number({ message: "price must be a number" })
                    .nonnegative("Price must be >= 0"),
            })
        )
        .nonempty({ message: "At least one product is required" }),
});

export const orderIdSchema = z.string().trim().min(1);
