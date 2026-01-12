  import { useState ,useEffect} from "react";
  import "../styles/planner.css";
import { useLocation } from "react-router-dom";

  export default function Planner() {
      const [theme, setTheme] = useState("night");

  useEffect(() => {
    const hour = new Date().getHours();
    setTheme(hour >= 6 && hour < 18 ? "day" : "night");
  }, []);

    const location = useLocation();
const state = location.state;
    const [form, setForm] = useState({
    traveler_name: "",
    destination: state?.destination || "",
    start_date: "",
    end_date: "",
    notes: "",
    latitude: state?.latitude || null,
    longitude: state?.longitude || null,
  });

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("SUBMIT CLICKED", form);

      try {
        const response = await fetch("http://127.0.0.1:8000/api/trip/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await response.json();
        console.log("SERVER:", data);

        if (response.ok) {
          alert("Trip planned successfully!");
          setForm({
            traveler_name: "",
            destination: "",
            start_date: "",
            end_date: "",
            notes: "",
          });
        } else {
          alert("Error creating trip");
        }
      } catch (error) {
        console.error("ERROR:", error);
        alert("Server not reachable");
      }
    };

    return (
      
  <div className={`planner-container ${theme}`}>
    <div className="planner-center">
      <div className="planner-card">
        <h1>Plan Your Trip ✈️</h1>
        <br/>
        <form className="planner-form" onSubmit={handleSubmit}>
          <input
            name="traveler_name"
            placeholder="Your Name"
            value={form.traveler_name}
            onChange={handleChange}
            required
          />

          <input
            name="destination"
            placeholder="Destination"
            value={form.destination}
            onChange={handleChange}
            required
          />

          <div className="date-row">
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              required
            />
          </div>

          <textarea
            name="notes"
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={handleChange}
          />

          <button type="submit">Save Trip</button>
        </form>
      </div></div>
       {/* FOOTER */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-left">
            <h3>Sanchari</h3>
            <p>A wandering soul's travel planner 🌍</p>
          </div>

          <div className="footer-center">
            <a
              href="https://www.instagram.com/_its_me_jowin_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://x.com/JowinLalu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>

          <div className="footer-right">
            <p>© {new Date().getFullYear()} Sanchari</p>
            <p>All rights reserved</p>
          </div>
        </div>
      </footer></div>
    );
  }
