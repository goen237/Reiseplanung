import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/client";
import TripCard from "../../components/TripCardComponent/TripCard";
import { Trip } from "../../types/models";
import "./TripListPage.css"; // Import der CSS-Datei

export default function TripListPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const navigate = useNavigate();

  const fetchTrips = useCallback(() => {
    api
      .get("/trips/search", {
        params: {
          name: searchName,
          date: searchDate,
        },
      })
      .then((res) => setTrips(res.data))
      .catch((err) => console.error("Fehler beim Laden der Reisen:", err));
  }, [searchName, searchDate]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const handleDelete = (id: number) => {
    if (window.confirm("Möchten Sie diese Reise wirklich löschen?")) {
      api
        .delete(`/trips/${id}`)
        .then(() => fetchTrips())
        .catch((err) => console.error("Fehler beim Löschen der Reise:", err));
    }
  };

  return (
    <div className="trip-list-container">
      <h1 className="page-title">Alle Reisen</h1>

      {/* Suchfelder */}
      <div className="search-container">
        <div className="search-box">
          <label htmlFor="searchName" className="search-label">
            Nach Name suchen:
          </label>
          <input
            id="searchName"
            type="text"
            placeholder="Reisename eingeben"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="search-box">
          <label htmlFor="searchDate" className="search-label">
            Nach Datum suchen:
          </label>
          <input
            id="searchDate"
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="search-input"
          />
        </div>
        <button onClick={fetchTrips} className="search-button">
          Suchen
        </button>
      </div>

      {/* Button: Neue Reise anlegen */}
      <button onClick={() => navigate("/trips/new")} className="new-trip-button">
        Neue Reise anlegen
      </button>

      {/* Liste der Reisen */}
      <div className="trip-list">
        {trips.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}