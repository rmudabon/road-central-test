import z from "zod";

export const productSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  stock: z.number(),
  sku: z.string(),
  image_url: z.string(),
  rating: z.object({
    rate: z.number(),
    count: z.number(),
  }),
});

export const productListSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;
