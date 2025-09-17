import { createFileRoute } from "@tanstack/react-router";
import { DataTable } from "../components/data-table";
import QueryResolver from "../components/ui/query-resolver";
import { useProducts } from "../hooks/useProducts";
import { Box } from "@mui/material";

export const Route = createFileRoute("/task-3")({
  component: RouteComponent,
});

function TableOne() {
  const query = useProducts();
  return (
    <QueryResolver query={query}>
      {(data) => {
        const shortenedData = data.slice(0, 5);
        return <DataTable data={shortenedData} />;
      }}
    </QueryResolver>
  );
}

function TableTwo() {
  const query = useProducts();
  return (
    <QueryResolver query={query}>
      {(data) => {
        const shortenedData = data.slice(0, 5);
        return <DataTable data={shortenedData} />;
      }}
    </QueryResolver>
  );
}

function TableThree() {
  const query = useProducts();
  return (
    <QueryResolver query={query}>
      {(data) => {
        const shortenedData = data.slice(0, 5);
        return <DataTable data={shortenedData} />;
      }}
    </QueryResolver>
  );
}

function RouteComponent() {
  return (
    <div id="task-root">
      <Box sx={{ display: "flex", gap: 4, flexDirection: "column" }}>
        <TableOne />
        <TableTwo />
        <TableThree />
      </Box>
    </div>
  );
}
