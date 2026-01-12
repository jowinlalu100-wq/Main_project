import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/dashboard.css";
import TripMapPreview from "../components/TripMapPreview.jsx";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/trip/")
      .then((res) => res.json())
      .then((data) => setTrips(data));
  }, []);

  return (
    <div className="dashboard-wrapper">
      {/* 🔹 VIDEO BACKGROUND */}
      <div className="dashboard-video">
        <video autoPlay muted loop playsInline>
          <source
            src="/src/assets/videos/dashboard-bg.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* 🔹 DASHBOARD CONTENT */}
      <div className="dashboard">
       <h1>Your Trips 🧳</h1>

        {trips.length === 0 && <p>No trips yet.</p>}

        <div className="trip-grid">
          {trips.map((trip) => (
            <motion.div
              key={trip.id}
              className="trip-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {/* MINI MAP */}
              <TripMapPreview
                lat={trip.latitude}
                lng={trip.longitude}
                destination={trip.destination}
              />

              {/* TRIP DETAILS */}
              <h3>{trip.destination}</h3>
              <p>{trip.traveler_name}</p>
              <p>
                {trip.start_date} → {trip.end_date}
              </p>
              <p>{trip.notes}</p>
            </motion.div>
          ))}
        </div>
      </div>
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
      </footer>
    </div>
  );
}
