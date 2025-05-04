import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { Trip } from "../types/models";
import TripCard from "../components/TripCard";

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
    <div>
      <h1>Alle Reisen</h1>

      {/* Suchfelder */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Reisename suchen"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="date"
          placeholder="Datum suchen"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={fetchTrips}>Suchen</button>
      </div>

      {/* Button: Neue Reise anlegen */}
      <button onClick={() => navigate("/trips/new")} style={{ marginBottom: "20px" }}>
        Neue Reise anlegen
      </button>

      {/* Liste der Reisen */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}