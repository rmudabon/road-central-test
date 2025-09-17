import { Add, ChevronRight } from "@mui/icons-material";
import "./index.css";

const dummyData = [
  {
    id: 1,
    origin: "New York",
    destination: "Los Angeles",
    status: "In Transit",
  },
  {
    id: 2,
    origin: "Chicago",
    destination: "Houston",
    status: "Delivered",
  },
  {
    id: 3,
    origin: "San Francisco",
    destination: "Seattle",
    status: "Pending",
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "In Transit") {
    return <div className="in-transit badge">{status}</div>;
  }
  if (status === "Delivered") {
    return <div className="delivered badge">{status}</div>;
  }
  return <div className="pending badge">{status}</div>;
}

function ShipmentTable() {
  return (
    <>
      <article className="shipment-table-container">
        <table className="shipment-table">
          <thead className="shipment-table-header">
            <tr>
              <th>ID</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((shipment) => (
              <tr key={shipment.id}>
                <td>{shipment.id}</td>
                <td>{shipment.origin}</td>
                <td>{shipment.destination}</td>
                <td>
                  <StatusBadge status={shipment.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
      <div className="pagination-controls">
        <button
          type="button"
          aria-label="Previous"
          className="primary-plain-button"
        >
          Previous
        </button>
        <p style={{ fontWeight: 500 }}>1</p>
        <button
          type="button"
          className="primary-plain-button"
          aria-label="Next"
        >
          Next
          <ChevronRight />
        </button>
      </div>
    </>
  );
}

function TotalShipments() {
  return (
    <article className="total-shipment-container">
      <h2 style={{ fontWeight: 500, fontSize: "1.2rem" }}>Total Shipments</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          justifyContent: "space-between",
        }}
      >
        <h3 style={{ fontWeight: 500, fontSize: "2rem" }}>256</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div className="completed-circle" />
          <p>Completed</p>
        </div>
      </div>
    </article>
  );
}

export function ShipmentMockup() {
  return (
    <main className="container">
      <section className="shipment-card">
        <div className="shipment-card-header">
          <h1 style={{ fontWeight: 600, fontSize: "1.8rem" }}>Shipments</h1>
          <button
            className="primary-button"
            type="button"
            title="Add Shipment"
            aria-label="Add Shipment"
          >
            <Add />
            Add Shipment
          </button>
        </div>
        <TotalShipments />
        <ShipmentTable />
      </section>
    </main>
  );
}
