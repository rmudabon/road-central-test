import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@mui/material";
import type { Product } from "../types/products";
import { DataTable } from "../components/data-table";

export const Route = createFileRoute("/task-1")({
  component: Task1,
});

const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Product 1",
    description: "Description 1",
    price: 10,
    category: "Peripherals",
    stock: 10,
    sku: "sku-1",
    image_url: "https://via.placeholder.com/150",
    rating: {
      rate: 4.5,
      count: 10,
    },
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description 2",
    price: 20,
    category: "Laptops",
    stock: 20,
    sku: "sku-2",
    image_url: "https://via.placeholder.com/150",
    rating: {
      rate: 3.8,
      count: 5,
    },
  },
  {
    id: 3,
    name: "Product 3",
    description: "Description 3",
    price: 30,
    category: "Monitors",
    stock: 30,
    sku: "sku-3",
    image_url: "https://via.placeholder.com/150",
    rating: {
      rate: 2.5,
      count: 3,
    },
  },
  {
    id: 4,
    name: "Product 4",
    description: "Description 4",
    price: 40,
    category: "Printers",
    stock: 40,
    sku: "sku-4",
    image_url: "https://via.placeholder.com/150",
    rating: {
      rate: 1.5,
      count: 8,
    },
  },
  {
    id: 5,
    name: "Product 5",
    description: "Description 5",
    price: 50,
    category: "Tablets",
    stock: 50,
    sku: "sku-5",
    image_url: "https://via.placeholder.com/150",
    rating: {
      rate: 3.5,
      count: 20,
    },
  },
];

function SampleDataTable() {
  return <DataTable data={dummyProducts} />;
}

function Task1() {
  return (
    <Container>
      <SampleDataTable />
    </Container>
  );
}
