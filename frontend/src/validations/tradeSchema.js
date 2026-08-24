import { z } from "zod";

export const tradeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),

  lastName: z.string().min(1, "Last name is required"),

  businessName: z.string().min(1, "Business name is required"),

  businessType: z.string().min(1, "Business type is required"),

  businessAddress: z.string().min(1, "Business Address is required"),

  email: z.string().min(1, "Email is required").email("Invalid email"),

  whatsapp: z.string().min(8, "WhatsApp number is required"),

  city: z.string().optional(),

  country: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Country is required",
    }),

  state: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .nullable()
    .optional(),

  categoriesInterested: z.array(z.any()).optional(),

  message: z.string().optional(),
});
