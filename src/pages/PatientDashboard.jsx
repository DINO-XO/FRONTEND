import { useEffect, useState } from "react";
import { getUserBookings } from "../api/bookingApi";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import DashboardCharts from "../components/DashboardCharts";
import "../components/Layout.css";

export default function PatientDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserBookings(user.id)
      .then(res => setBookings(res.data))
      .catch(() => setBookings([]));
  }, [user.id]);

  // ✅ EXISTING DERIVED VALUES (UNCHANGED)
  const total = bookings.length;
  const completed = bookings.filter(b => b.status === "COMPLETED").length;
  const booked = bookings.filter(b => b.status === "BOOKED").length;
  const inProgress = bookings.filter(b => b.status === "IN_PROGRESS").length;

  return (
    <DashboardLayout title="Patient Dashboard">

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <h4>Total</h4>
          <span>{total}</span>
        </div>
        <div className="stat-card green">
          <h4>Completed</h4>
          <span>{completed}</span>
        </div>
      </div>

      {/* ✅ CHARTS (UI ONLY) */}
      <DashboardCharts
        stats={{
          total,
          completed,
          booked,
          inProgress
        }}
      />

      {/* BOOKINGS */}
      <div className="booking-grid">
        {bookings.map(b => (
          <div key={b.id} className="booking-card">
            <h3>{b.labTest.testName}</h3>
            <span className={`status-pill ${b.status}`}>{b.status}</span>
            <p>Slot: <b>{b.slotTime}</b></p>

            {b.status === "COMPLETED" && (
              <button
                className="report-btn"
                onClick={() => navigate("/reports")}
              >
                View Report
              </button>
            )}
          </div>
        ))}
      </div>

    </DashboardLayout>
  );
}
