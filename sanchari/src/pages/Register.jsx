import "../styles/auth.css";

export default function Register() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    alert("Registration successful");
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Register</h2>
        <p>Create your Sanchari account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input name="username" placeholder="Username" required />
          </div>

          <div className="form-group">
            <input type="password" name="password" placeholder="Password" required />
          </div>

          <button className="btn">Register</button>
        </form>
      </div>
       
    </div>
  );
}
