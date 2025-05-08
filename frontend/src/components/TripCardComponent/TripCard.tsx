import { useNavigate } from "react-router-dom";
import { Trip } from "../../types/models";
import "./TripCard.css"; // Import der CSS-Datei

interface TripCardProps {
  trip: Trip;
  onDelete: (id: number) => void;
}

export default function TripCard({ trip, onDelete }: TripCardProps) {
  const navigate = useNavigate();

  return (
    <div className="trip-card">
      <h2>{trip.name}</h2>
      <p>{trip.description}</p>
      {trip.image && (
        <img
          src={trip.image}
          alt={trip.name}
        />
      )}
      <p><u>Teilnehmer</u>: {trip.participants.join(", ")}</p>
      <p className="trip-dates">
        <strong>{new Date(trip.startDate).toISOString().split("T")[0]}</strong> bis{" "}
        <strong>{new Date(trip.endDate).toISOString().split("T")[0]}</strong>
      </p>
      <div className="trip-actions">
        <button onClick={() => navigate(`/trips/${trip.id}`)}>Details ansehen</button>
        <button onClick={() => navigate(`/trips/${trip.id}/edit`)}>Bearbeiten</button>
        <button onClick={() => onDelete(trip.id)}>Löschen</button>
      </div>
    </div>
  );
}