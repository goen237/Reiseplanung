import { useNavigate } from "react-router-dom";
import { Trip } from "../../types/models";
import "./TripCard.css"; // Import der neuen CSS-Datei

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
      <p className="trip-dates">
        {new Date(trip.startDate).toISOString().split("T")[0]} bis{" "}
        {new Date(trip.endDate).toISOString().split("T")[0]}
      </p>
      <div className="trip-actions">
        <button className="details" onClick={() => navigate(`/trips/${trip.id}`)}>
          Details ansehen
        </button>
        <button className="edit" onClick={() => navigate(`/trips/${trip.id}/edit`)}>
          Bearbeiten
        </button>
        <button className="delete" onClick={() => onDelete(trip.id)}>
          Löschen
        </button>
      </div>
    </div>
  );
}