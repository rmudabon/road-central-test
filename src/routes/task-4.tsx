import { createFileRoute } from "@tanstack/react-router";
import QueryResolver from "../components/ui/query-resolver";
import { useProducts } from "../hooks/useProducts";
import { VirtualTable } from "../components/virtual-table";
import { useState } from "react";
import { getFilteredProducts } from "../utils/getProducts";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Checkbox,
  debounce,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ServerSideTable } from "../components/server-side-table";

export const Route = createFileRoute("/task-4")({
  component: RouteComponent,
});

export interface TableFilters {
  name: string;
  category: string;
  only_in_stock: boolean;
  page: number;
}

function VirtualizedLayout() {
  const query = useProducts();
  return (
    <QueryResolver query={query}>
      {(data) => <VirtualTable data={data} />}
    </QueryResolver>
  );
}

const choices = ["Products", "Peripherals", "Audio"];
const INITIAL_PAGE = 1;
function FilteredLayout() {
  const [filters, setFilters] = useState<TableFilters>({
    name: "",
    category: "",
    only_in_stock: false,
    page: INITIAL_PAGE,
  });

  const query = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getFilteredProducts(filters),
  });

  const handleChange = (event: SelectChangeEvent) => {
    setFilters((filters) => ({ ...filters, category: event.target.value }));
  };

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilters((filters) => ({ ...filters, name: e.target.value }));
  };

  const debouncedSearch = debounce(handleSearch, 250);

  return (
    <Box display="flex" flexDirection="column" gap={2} marginY={2}>
      <Typography>Server Side Table (Filtering and Pagination)</Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <TextField label="Search product..." onChange={debouncedSearch} />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={filters.category}
            label="Category"
            onChange={handleChange}
          >
            {choices.map((choice) => (
              <MenuItem key={choice} value={choice}>
                {choice}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.only_in_stock}
              onChange={(e) =>
                setFilters((filters) => ({
                  ...filters,
                  only_in_stock: e.target.checked,
                }))
              }
            />
          }
          label="Show in stock"
        />
      </Box>
      <QueryResolver query={query}>
        {(data) => <ServerSideTable data={data} />}
      </QueryResolver>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          padding: 2,
          gap: 2,
        }}
      >
        <Typography>Page: {filters.page}</Typography>
        <IconButton
          onClick={() =>
            setFilters((filters) => ({ ...filters, page: filters.page - 1 }))
          }
          disabled={filters.page === INITIAL_PAGE}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            setFilters((filters) => ({ ...filters, page: filters.page + 1 }))
          }
        >
          <ChevronRightIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}

function RouteComponent() {
  return (
    <>
      <VirtualizedLayout />
      <FilteredLayout />
    </>
  );
}
