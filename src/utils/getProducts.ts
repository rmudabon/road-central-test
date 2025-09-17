import type { TableFilters } from "../routes/task-4";
import { productListSchema } from "../types/products";

export async function getProducts() {
  try {
    const res = await fetch("https://api.mockae.com/fakeapi/products/");
    const rawData = await res.json();
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

export async function getFilteredProducts(filters: TableFilters) {
  const params = new URLSearchParams({
    name: filters.name,
    category: filters.category,
    stock: filters.only_in_stock.toString(),
    page: filters.page.toString(),
  });
  try {
    const res = await fetch(
      `https://api.mockae.com/fakeapi/products?${params}`
    );
    const rawData = await res.json();
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
