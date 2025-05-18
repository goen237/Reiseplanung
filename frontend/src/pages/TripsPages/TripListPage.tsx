import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/client";
import TripCard from "../../components/TripCardComponent/TripCard";
import { Trip } from "../../types/models";
import "./TripListPage.css"; // Import der CSS-Datei

const today = new Date();

function getDaysUntil(dateString: string): number {
  const tripDate = new Date(dateString);
  const diffTime = tripDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

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

  const handleArchive = (id: number, archived: boolean) => {
    api
      .patch(`/trips/${id}/archive`, { archived })
      .then(() => fetchTrips())
      .catch(() => alert("Fehler beim Archivieren der Reise!"));
  };

  // Trenne kommende, vergangene und archivierte Reisen
  today.setHours(0, 0, 0, 0);

  const kommendeReisen = trips.filter(trip => !trip.archived && new Date(trip.startDate) >= today);
  const vergangeneReisen = trips.filter(trip => !trip.archived && new Date(trip.startDate) < today);
  const archivierteReisen = trips.filter(trip => trip.archived);


  // Reisen, die in den nächsten 7 Tagen starten
  const upcomingTrips = trips.filter(
    (trip) => {
      const days = getDaysUntil(trip.startDate);
      return days >= 0 && days <= 7;
    }
  );

  return (
    <div className="trip-list-container">
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

      <h1 className="page-title">Alle Reisen</h1>
      {/* Hinweis für bevorstehende Reisen */}
      {upcomingTrips
        .filter(trip => !trip.archived)
        .map((trip) => {
          const days = getDaysUntil(trip.startDate);
          return (
            <div key={trip.id} className="upcoming-trip-hint">
              <span role="img" aria-label="rocket" className="rocket-emoji">🚀</span>
              Deine Reise „{trip.name}“ startet in {days} Tag{days !== 1 && "en"}!
            </div>
          );
        })
      }
      {/* Kommende Reisen */}
      <h2 className="section-title">Kommende Reisen</h2>
      <div className="trip-list">
        {kommendeReisen.length === 0 ? (
          <div className="no-trips-message">Keine kommenden Reisen gefunden.</div>
        ) : (
          kommendeReisen.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onDelete={handleDelete}
              onArchive={handleArchive}
            />
          ))
        )}
      </div>

      {/* Vergangene Reisen */}
      <h2 className="section-title">Vergangene Reisen</h2>
      <div className="trip-list">
        {vergangeneReisen.length === 0 ? (
          <div className="no-trips-message">Keine vergangenen Reisen gefunden.</div>
        ) : (
          vergangeneReisen.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onDelete={handleDelete}
              onArchive={handleArchive}
            />
          ))
        )}
      </div>

      {/* Archivierte Reisen */}
      <h2 className="section-title">Archivierte Reisen</h2>
      <div className="trip-list trip-list-archived">
        {archivierteReisen.length === 0 ? (
          <div className="no-trips-message">Keine archivierten Reisen gefunden.</div>
        ) : (
          archivierteReisen.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onDelete={handleDelete}
              onArchive={handleArchive}
            />
          ))
        )}
      </div>
    </div>
  );

}