import { useNavigate } from "react-router-dom";
import { Trip } from "../types/models";

interface TripCardProps {
  trip: Trip;
  onDelete: (id: number) => void;
}

export default function TripCard({ trip, onDelete }: TripCardProps) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        width: "300px",
      }}
    >
      <h2>{trip.name}</h2>
      <p>{trip.description}</p>
      {trip.image && (
        <img
          src={trip.image}
          alt={trip.name}
          style={{ width: "100%", borderRadius: "8px" }}
        />
      )}
      <p>Teilnehmer: {trip.participant.join(", ")}</p>
      <p>
        {new Date(trip.startDate).toISOString().split("T")[0]} bis{" "}
        {new Date(trip.endDate).toISOString().split("T")[0]}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => navigate(`/trips/${trip.id}`)}>Ansehen</button>
        <button onClick={() => navigate(`/trips/${trip.id}/edit`)}>Bearbeiten</button>
        <button onClick={() => onDelete(trip.id)}>Löschen</button>
      </div>
    </div>
  );
}