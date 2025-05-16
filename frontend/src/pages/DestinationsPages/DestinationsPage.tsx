import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/client";
import { Destination } from "../../types/models";
import DestinationCard from "../../components/TripDetailComponent/DestinationCard";
import "./DestinationPage.css";

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const navigate = useNavigate();

  // Lade alle Reiseziele aus der Datenbank
  useEffect(() => {
    api
      .get<Destination[]>("/destinations")
      .then((res) => setDestinations(res.data))
      .catch((err) => console.error("Fehler beim Laden der Reiseziele:", err));
  }, []);

  // Lösche ein Reiseziel
  const handleDelete = async (id: number) => {
    if (window.confirm("Möchten Sie dieses Reiseziel wirklich löschen?")) {
      try {
        await api.delete(`/destinations/${id}`);
        setDestinations((prev) => prev.filter((destination) => destination.id !== id));
        alert("Reiseziel erfolgreich gelöscht.");
      } catch (err) {
        console.error("Fehler beim Löschen des Reiseziels:", err);
        alert("Das Reiseziel konnte nicht gelöscht werden.");
      }
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="page-title">Alle Reiseziele</h1>
      <button
        onClick={() => navigate("/destinations/new")}
        className="new-trip-button"
      >
        Neues Reiseziel hinzufügen
      </button>
      <div className="destination-list-container">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            tripId="" // Kein spezifischer TripId erforderlich
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}