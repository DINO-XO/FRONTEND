import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import "../components/Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser({ email, password, role });
      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.role === "TECHNICIAN") navigate("/technician");
      else navigate("/patient");
    } catch (err) {
      alert("Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-glass-card">
        <h2>Medical Portal</h2>
        <p>Sign in to access your dashboard</p>

        <form onSubmit={handleLogin} className="auth-form">
          <select
            className="auth-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="PATIENT">Patient Login</option>
            <option value="TECHNICIAN">Technician Login</option>
          </select>

          <input
            type="email"
            placeholder="Email Address"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}
