import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import "../components/Auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser({ name, email, password, role });
      alert("Registration successful ✅");
      navigate("/");
    } catch (err) {
      alert("Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-glass-card">
        <h2>Create Account</h2>
        <p>Register as Patient or Technician</p>

        <form onSubmit={handleRegister} className="auth-form">
          <select
            className="auth-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="PATIENT">Patient</option>
            <option value="TECHNICIAN">Technician</option>
          </select>

          <input
            className="auth-input"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            className="auth-input"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}
