import { z } from "zod"

export const currencyCode = z.string().min(3).max(4)

export const companyInfoSchema = z.object({
  name: z.string().max(200),
  address: z.string().max(300),
  city: z.string().max(120),
  state: z.string().max(120),
  zip: z.string().max(40),
  country: z.string().max(120),
  email: z.string().max(254),
  phone: z.string().max(80),
  taxId: z.string().max(80),
  logo: z
    .union([
      z.literal(""),
      z.null(),
      z
        .string()
        .regex(
          /^data:image\/(png|jpeg|jpg|gif|webp|bmp|svg\+xml);base64,/i,
          "Invalid image data"
        ),
    ])
    .transform((value) => (value === "" ? null : value)),
})

export const clientInfoSchema = z.object({
  name: z.string().max(200),
  company: z.string().max(200),
  address: z.string().max(300),
  city: z.string().max(120),
  state: z.string().max(120),
  zip: z.string().max(40),
  country: z.string().max(120),
  email: z.string().max(254),
  phone: z.string().max(80),
})

const nonNegativeNumber = z
  .union([z.number(), z.string()])
  .transform((value, ctx) => {
    const num = typeof value === "string" ? Number.parseFloat(value) : value
    if (typeof num !== "number" || Number.isNaN(num) || !Number.isFinite(num)) {
      ctx.addIssue({
        code: "custom",
        message: "Expected a valid number",
      })
      return 0
    }
    return num
  })
  .refine((value) => value >= 0, "Must be zero or greater")

export const invoiceItemSchema = z.object({
  id: z.string().default("item-import"),
  description: z.string().max(500),
  quantity: nonNegativeNumber,
  unitPrice: nonNegativeNumber,
})

export const totalsSchema = z.object({
  taxRate: nonNegativeNumber,
  discount: nonNegativeNumber,
  discountType: z.enum(["percent", "flat"]),
  shipping: nonNegativeNumber,
})

export const settingsSchema = z.object({
  template: z.enum(["modern", "minimal"]),
  accentColor: z
    .string()
    .regex(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/, "Invalid color"),
})

export const metaSchema = z.object({
  invoiceNumber: z.string().max(80),
  poNumber: z.string().max(80),
  issueDate: z.string().max(10),
  dueDate: z.string().max(10),
  currency: currencyCode,
  notes: z.string().max(2000),
  terms: z.string().max(2000),
})

export const invoiceSchema = z.object({
  meta: metaSchema,
  company: companyInfoSchema,
  client: clientInfoSchema,
  items: z.array(invoiceItemSchema).max(500),
  totals: totalsSchema,
  settings: settingsSchema,
})
