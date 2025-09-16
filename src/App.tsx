import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { SampleDataTable } from "./components/data-table";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <SampleDataTable />
    </QueryClientProvider>
  );
}

export default App;
