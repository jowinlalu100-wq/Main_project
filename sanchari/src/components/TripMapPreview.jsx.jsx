import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function TripMapPreview({ lat, lng }) {
  if (!lat || !lng) return null;

  return (
    <div className="trip-map">
      <MapContainer
        center={[lat, lng]}
        zoom={10}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
        style={{ height: "140px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]} />
      </MapContainer>
    </div>
  );
}
