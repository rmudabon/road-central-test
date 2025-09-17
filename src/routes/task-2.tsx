import { createFileRoute } from "@tanstack/react-router";
import QueryResolver from "../components/ui/query-resolver";
import { useProducts } from "../hooks/useProducts";
import { DataTable } from "../components/data-table";

export const Route = createFileRoute("/task-2")({
  component: RouteComponent,
});

function RouteComponent() {
  const query = useProducts();
  return (
    <div id="task-root">
      <QueryResolver query={query}>
        {(data) => <DataTable data={data} />}
      </QueryResolver>
    </div>
  );
}
