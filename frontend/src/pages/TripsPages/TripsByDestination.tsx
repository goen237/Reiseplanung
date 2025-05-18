import { useState } from "react";
import { api } from "../../api/client";
import TripCard from "../../components/TripCardComponent/TripCard";
import { Destination, Trip } from "../../types/models";
import "./TripsByDestination.css"; // Import der CSS-Datei

export default function TripsByDestination() {
  const [searchName, setSearchName] = useState("");
  const [destination, setDestination] = useState<Destination | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setDestination(null);
    setTrips([]);

    try {
      const res = await api.get(`/destinations/search`, {
        params: { name: searchName },
      });

      if (res.data.length === 0) {
        setError("Kein Reiseziel mit diesem Namen gefunden.");
        return;
      }

      const foundDestination = res.data[0];
      setDestination(foundDestination);

      const tripsRes = await api.get(`/destinations/${foundDestination.id}/trips`);
      setTrips(tripsRes.data);
    } catch (err) {
      console.error("Fehler bei der Suche:", err);
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <div className="trips-by-destination-container">
      <h1 className="page-title">Reisen nach Reiseziel suchen</h1>

      {/* Suchfeld */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Name des Reiseziels eingeben"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Suchen
        </button>
      </div>

      {/* Fehlermeldung */}
      {error && <p className="error-message">{error}</p>}

      {/* Gefundenes Reiseziel */}
      {destination && (
        <div className="destination-details">
          <h2 className="destination-title">Gefundenes Reiseziel</h2>
          <p>
            <strong>Name:</strong> {destination.name}
          </p>
          <p>
            <strong>Beschreibung:</strong> {destination.description || "Keine Beschreibung"}
          </p>
        </div>
      )}

      {/* Liste der Reisen */}
      {trips.length > 0 && (
        <div className="trips-list">
          <h2 className="trips-title">Reisen zu diesem Reiseziel</h2>
          <div className="trips-grid">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} onDelete={() => {}} onArchive={() => {}} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}