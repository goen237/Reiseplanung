import { useNavigate } from "react-router-dom";
import { Destination } from "../../types/models";
import "./DestinationCard.css"; // Import der CSS-Datei

interface DestinationCardProps {
  destination: Destination;
  tripId: string;
  onDelete: (id: number) => void;
}

export default function DestinationCard({
  destination,
  tripId,
  onDelete,
}: DestinationCardProps) {
  const navigate = useNavigate();

  return (
    <div className="destination-card">
      <h2>{destination.name}</h2>
      <p>{destination.description || "Keine Beschreibung verfügbar."}</p>

      {destination.photos?.length > 0 && (
        <div className="destination-photos">
          {destination.photos.map((photo, idx) => (
            <img
              key={idx}
              src={photo}
              alt={`Photo ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {destination.activities?.length > 0 && (
        <div className="destination-activities">
          <h4>Aktivitäten:</h4>
          <ul>
            {destination.activities.map((activity, idx) => (
              <li key={idx}>{activity}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="destination-actions">
        <button onClick={() => navigate(`/trips/${tripId}/destinations/${destination.id}/edit`)}>
          Ziel bearbeiten
        </button>
        <button onClick={() => onDelete(destination.id)}>
          Löschen
        </button>
      </div>
    </div>
  );
}