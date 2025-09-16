import { productListSchema } from "../types/products";

export async function getProducts() {
  try {
    const res = await fetch("https://api.mockae.com/fakeapi/products/");
    const rawData = await res.json();
    console.log(rawData);
    const schemaResponse = productListSchema.safeParse(rawData);
    if (schemaResponse.success) {
      return schemaResponse.data;
    } else {
      console.error(schemaResponse.error);
      throw new Error("Failed to fetch products");
    }
  } catch {
    throw new Error("Failed to fetch products");
  }
}
