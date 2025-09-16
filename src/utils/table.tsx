import { createColumnHelper } from "@tanstack/react-table";
import type { Product } from "../types/products";

export const columnHelper = createColumnHelper<Product>();

export const columns = [
  columnHelper.accessor("id", {
    id: "id",
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("sku", {
    id: "sku",
    header: "SKU",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    id: "price",
    header: "Price",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("category", {
    id: "category",
    header: "Category",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("stock", {
    id: "stock",
    header: "Stock",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    id: "description",
    header: "Description",
    cell: (info) =>
      `${info.getValue().slice(0, 50)}${info.getValue().length > 50 ? "..." : ""}`,
  }),
  columnHelper.accessor("image_url", {
    id: "image_url",
    header: "Image",
    cell: (info) => <a href={info.getValue()}>Preview</a>,
    enableSorting: false,
  }),
  columnHelper.accessor("rating", {
    id: "rating",
    header: "Rating",
    cell: (info) => info.getValue().rate,
    sortingFn: (a, b) => a.original.rating.rate - b.original.rating.rate,
    sortUndefined: "last",
  }),
];
