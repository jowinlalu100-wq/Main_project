import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "../styles/home.css";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

/* Fix Leaflet marker icons */
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

/* Fly map to searched location */
function FlyToLocation({ location }) {
  const map = useMap();
  if (location) {
    map.flyTo([location.lat, location.lng], 12, { duration: 1.5 });
  }
  return null;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(null);
  const [summary, setSummary] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchPlace = async () => {
    if (!query) return;
    setLoading(true);

    try {
      /* 1️⃣ Nominatim search */
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();

      if (!data.length) {
        alert("Place not found");
        return;
      }

      const place = data[0];

      const selectedLocation = {
        lat: parseFloat(place.lat),
        lng: parseFloat(place.lon),
        name: place.display_name,
      };

      setLocation(selectedLocation);

      /* 2️⃣ Wikipedia summary */
      const wikiRes = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          query
        )}`
      );
      const wikiData = await wikiRes.json();
      setSummary(wikiData.extract || "");

      /* 3️⃣ Wikimedia images */
      const imgRes = await fetch(
        `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
          query
        )}&gsrlimit=6&prop=imageinfo&iiprop=url&format=json&origin=*`
      );
      const imgData = await imgRes.json();

      const imgs = imgData.query?.pages
        ? Object.values(imgData.query.pages)
            .map((p) => p.imageinfo?.[0]?.url)
            .filter(Boolean)
        : [];

      setImages(imgs);
    } catch (err) {
      alert("Error fetching place data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-wrapper">
      {/* VIDEO BACKGROUND */}
      <div className="video-bg">
        <video autoPlay muted loop playsInline>
          <source src="/src/assets/videos/home-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* CONTENT ABOVE VIDEO */}
      <div className="home-content">
        <div className="user-home">
          <h1>Explore Destinations 🌍</h1>
          <p>Search a place and plan your journey</p>

          {/* SEARCH BAR */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search places (Goa, Munnar, Paris)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchPlace()}
            />
            <button onClick={searchPlace}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* MAP + DETAILS */}
          <div className={`map-details-layout ${location ? "searched" : ""}`}>

            {/* MAP */}
            <div className="map-wrapper">
              <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                scrollWheelZoom
                style={{ height: "420px", width: "100%" }}
              >
                <TileLayer
                  attribution="© OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {location && (
                  <>
                    <FlyToLocation location={location} />
                    <Marker position={[location.lat, location.lng]} />
                  </>
                )}
              </MapContainer>
            </div>

            {/* DETAILS */}
            {location && (
              <div className="place-details">
                <h2>{query}</h2>
                <p className="place-address">{location.name}</p>

                {summary && (
                  <p className="place-summary">{summary}</p>
                )}

                {images.length > 0 && (
                  <div className="image-grid">
                    {images.map((img, i) => (
                      <img key={i} src={img} alt="place" />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
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