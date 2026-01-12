import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    const res = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.message) {
      localStorage.setItem("user_id", result.user_id);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Login</h2>
        <p>Welcome back to Sanchari</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input name="username" placeholder="Username" required />
          </div>

          <div className="form-group">
            <input type="password" name="password" placeholder="Password" required />
          </div>

          <button className="btn">Login</button>
        </form>
      </div>
       
    </div>
  );
}
