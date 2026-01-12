import "./DashboardLayout.css";

export default function DashboardLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dash-root">
      {/* SIDEBAR */}
      <aside className="dash-sidebar">
        <div className="dash-logo">🧪 MedLab</div>

        <nav className="dash-nav">
          {user?.role === "PATIENT" && (
            <>
              <a href="/patient">Dashboard</a>
              <a href="/book">Book Test</a>
              <a href="/reports">My Reports</a>
            </>
          )}

          {user?.role === "TECHNICIAN" && (
            <a href="/technician">Dashboard</a>
          )}
        </nav>
      </aside>

      {/* MAIN */}
      <main className="dash-main">
        {children}
      </main>
    </div>
  );
}
