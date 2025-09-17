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
    origin: "San Fransisco",
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
        <button type="button" className="primary-plain-button">
          Previous
        </button>
        <h4 style={{ fontWeight: 500 }}>1</h4>
        <button type="button" className="primary-plain-button">
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
      <h3 style={{ fontWeight: 500 }}>Total Shipments</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ fontWeight: 500, fontSize: "2rem" }}>256</h2>
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
    <div className="container">
      <section className="shipment-card">
        <div className="shipment-card-header">
          <h2 style={{ fontWeight: 600 }}>Shipments</h2>
          <button className="primary-button" type="button" role="button">
            <Add />
            Add Shipment
          </button>
        </div>
        <TotalShipments />
        <ShipmentTable />
      </section>
    </div>
  );
}
