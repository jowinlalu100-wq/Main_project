import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/Logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user_id");

  const logout = () => {
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
  <Link to="/">
    <img src={logo} alt="Sanchari Logo" />
  </Link>
</div>



      <div className="nav-links">
        <Link to="/">Home</Link>
        
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/planner">Planner</Link>
            <button className="nav-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
