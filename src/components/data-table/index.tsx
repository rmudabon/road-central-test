import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import z from "zod";

const productSchema = z.object({
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

export type Product = z.infer<typeof productSchema>;

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

const columnHelper = createColumnHelper<Product>();

const columns = [
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
    cell: (info) => info.getValue().slice(0, 50),
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
    sortUndefined: "last",
  }),
];

function DataTable({ data }: { data: Product[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      sorting: [
        {
          id: "stock",
          desc: true,
        },
      ],
    },
  });

  return (
    <Paper
      sx={{ display: "flex", flexDirection: "column", gap: "1rem", padding: 2 }}
    >
      <TextField
        label="Search..."
        onChange={(e) => table.setGlobalFilter(e.target.value)}
      />
      <TableContainer sx={{ border: "1px solid #ccc" }}>
        <Table sx={{ minWidth: 750 }} aria-label="basic products table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    component="th"
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      fontWeight: "500",
                      cursor: header.column.getCanSort()
                        ? "pointer"
                        : "inherit",
                      userSelect: "none",
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 2 }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getIsSorted() === "asc" && (
                        <ArrowUpwardIcon fontSize="small" />
                      )}
                      {header.column.getIsSorted() === "desc" && (
                        <ArrowDownwardIcon fontSize="small" />
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export function SampleDataTable() {
  return <DataTable data={dummyProducts} />;
}
