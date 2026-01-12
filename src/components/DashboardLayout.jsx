import "./DashboardLayout.css";

export default function DashboardLayout({ title, children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dash-root">
      {/* SIDEBAR */}
      <aside className="dash-sidebar">
        <div className="dash-logo">🧪 MedLab</div>

        <nav className="dash-nav">
          <a href="/patient">Dashboard</a>
          <a href="/book">Book Test</a>
          <a href="/reports">My Reports</a>

          {/* ✅ ROLE-BASED LINK (FIX) */}
          {user?.role === "TECHNICIAN" && (
            <a href="/technician">Technician</a>
          )}
        </nav>
      </aside>

      {/* MAIN */}
      <main className="dash-main">
        <div className="dash-header">
          <h1>{title}</h1>
        </div>

        <div className="dash-content">
          {children}
        </div>
      </main>
    </div>
  );
}
