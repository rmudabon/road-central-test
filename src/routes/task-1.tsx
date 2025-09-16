import { createFileRoute } from "@tanstack/react-router";
import { SampleDataTable } from "../components/data-table";
import { Container } from "@mui/material";

export const Route = createFileRoute("/task-1")({
  component: Task1,
});

function Task1() {
  return (
    <Container>
      <SampleDataTable />
    </Container>
  );
}
