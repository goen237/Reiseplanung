import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/client";
import DestinationList from "../../components/TripDetailComponent/DestinationList";
import TripDetails from "../../components/TripDetailComponent/TripDetails";
import { Destination, Trip } from "../../types/models";

export default function TripDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      console.error("Fehler: Keine gültige ID vorhanden.");
      return;
    }

    // Reise laden
    api
      .get(`/trips/${id}`)
      .then((res) => setTrip(res.data))
      .catch((err) => console.error("Fehler beim Laden der Reise:", err));

    // Reiseziele der Reise laden
    api
      .get(`/destinations/trips/${id}`)
      .then((res) => setDestinations(res.data))
      .catch((err) => console.error("Fehler beim Laden der Reiseziele:", err));
  }, [id]);

  if (!trip) return <div>Reise wird geladen...</div>;

  const handleDeleteDestination = (destinationId: number) => {
    if (!id) return;

    if (window.confirm("Möchten Sie dieses Reiseziel wirklich löschen?")) {
      api
        .delete(`/trips/${id}/destinations/${destinationId}`)
        .then(() => {
          setDestinations((prev) => prev.filter((dest) => dest.id !== destinationId));
        })
        .catch((err) => console.error("Fehler beim Löschen des Reiseziels:", err));
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="bg-gray-300 text-black px-4 py-2 rounded mb-4"
      >
        Zurück zur Übersicht
      </button>

      <TripDetails
        trip={{ ...trip, description: trip.description || "" }}
        onEdit={() => navigate(`/trips/${id}/edit`)}
      />

      <hr className="my-6" />

      <DestinationList
        destinations={destinations}
        tripId={id!}
        onAdd={() => navigate(`/trips/${id}/destinations/new`)}
        onDelete={handleDeleteDestination}
      />
    </div>
  );
}