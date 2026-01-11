import "./DashboardLayout.css";

export default function DashboardLayout({ title, children }) {
  return (
    <div className="dash-root">
      {/* SIDEBAR */}
      <aside className="dash-sidebar">
        <div className="dash-logo">MedLab</div>

        <nav className="dash-nav">
          <a href="/patient">Dashboard</a>
          <a href="/book">Book Test</a>
          <a href="/reports">My Reports</a>
          <a href="/technician">Technician</a>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="dash-main">
        <h1 className="dash-title">{title}</h1>
        {children}
      </main>
    </div>
  );
}
