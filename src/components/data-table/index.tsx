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
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import type { Product } from "../../types/products";
import { columns } from "../../utils/table";

export function DataTable({ data }: { data: Product[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      sorting: [
        {
          id: "id",
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
