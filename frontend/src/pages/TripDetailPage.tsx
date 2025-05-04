import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";
import { Trip, Destination } from "../types/models";
import DestinationCard from "../components/DestinationCard";

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
        .delete(`/destinations/${destinationId}`)
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

      <h1 className="text-2xl font-bold mb-2">{trip.name}</h1>
      {trip.image && (
        <img
          src={trip.image}
          alt={trip.name}
          className="mb-4 max-w-full h-auto rounded"
        />
      )}
      <p>
        <strong>Beschreibung:</strong> {trip.description}
      </p>
      <p>
        <strong>Zeitraum:</strong> {new Date(trip.startDate).toISOString().split("T")[0]} bis {new Date(trip.endDate).toISOString().split("T")[0]}
      </p>
      <p>
        <strong>Teilnehmer:</strong> {trip.participant.join(", ")}
      </p>

      <button
        onClick={() => navigate(`/trips/${id}/edit`)}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Reise bearbeiten
      </button>

      <hr className="my-6" />
      <h2 className="text-xl font-semibold">Reiseziele</h2>

      <button
        onClick={() => navigate(`/trips/${id}/destinations/new`)}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Neues Reiseziel hinzufügen
      </button>
      <div>
        {destinations.length ? (
          destinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              tripId={id!}
              onDelete={handleDeleteDestination}
            />
          ))
        ) : (
          <p>Keine Reiseziele vorhanden.</p>
        )}
      </div>
    </div>
  );
}