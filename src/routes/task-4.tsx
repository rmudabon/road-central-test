import { createFileRoute } from "@tanstack/react-router";
import QueryResolver from "../components/ui/query-resolver";
import { useProducts } from "../hooks/useProducts";
import { VirtualTable } from "../components/virtual-table";

export const Route = createFileRoute("/task-4")({
  component: RouteComponent,
});

function RouteComponent() {
  const query = useProducts();
  return (
    <QueryResolver query={query}>
      {(data) => <VirtualTable data={data} />}
    </QueryResolver>
  );
}
