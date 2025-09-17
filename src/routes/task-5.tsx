import { createFileRoute } from "@tanstack/react-router";
import { ShipmentMockup } from "../components/shipment-mockup";

export const Route = createFileRoute("/task-5")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ShipmentMockup />;
}
