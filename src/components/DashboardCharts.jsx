import "./DashboardCharts.css";

export default function DashboardCharts({ stats }) {
  const total = Math.max(stats.total, 1);

  const percent = (value) => Math.round((value / total) * 100);

  return (
    <div className="charts-grid">

      {/* DONUT CHART */}
      <div className="chart-card">
        <h3>Status Overview</h3>

        <div className="donut">
          <svg viewBox="0 0 36 36">
            <circle className="bg" cx="18" cy="18" r="15.915" />
            <circle
              className="progress completed"
              strokeDasharray={`${percent(stats.completed)}, 100`}
              cx="18"
              cy="18"
              r="15.915"
            />
          </svg>
          <div className="donut-center">
            <b>{percent(stats.completed)}%</b>
            <span>Completed</span>
          </div>
        </div>

        <ul className="legend">
          <li><span className="dot green" /> Completed</li>
          <li><span className="dot orange" /> Booked</li>
          <li><span className="dot purple" /> In Progress</li>
        </ul>
      </div>

      {/* BAR CHART */}
      <div className="chart-card">
        <h3>Bookings Distribution</h3>

        <div className="bar-chart">
          <Bar label="Completed" value={stats.completed} total={total} color="green" />
          <Bar label="Booked" value={stats.booked} total={total} color="orange" />
          <Bar label="In Progress" value={stats.inProgress} total={total} color="purple" />
        </div>
      </div>

    </div>
  );
}

function Bar({ label, value, total, color }) {
  const width = Math.round((value / total) * 100);

  return (
    <div className="bar-row">
      <span>{label}</span>
      <div className="bar-track">
        <div className={`bar-fill ${color}`} style={{ width: `${width}%` }} />
      </div>
      <b>{value}</b>
    </div>
  );
}
