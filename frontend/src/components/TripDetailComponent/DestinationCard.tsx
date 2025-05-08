import { useNavigate } from "react-router-dom";
import { Destination } from "../../types/models";

interface DestinationCardProps {
  destination: Destination;
  tripId: string;
  onDelete: (id: number) => void;
}

import "./DestinationCard.css"; // Import der CSS-Datei

export default function DestinationCard({
  destination,
  tripId,
  onDelete,
}: DestinationCardProps) {
  const navigate = useNavigate();

  return (
    <div className="destination-card">
      <h2>{destination.name}</h2>
      <p className="text-gray-700 mb-4">{destination.description}</p>

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
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Aktivitäten:</h4>
          <ul className="list-disc pl-5 text-gray-700">
            {destination.activities.map((activity, idx) => (
              <li key={idx}>{activity}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="destination-actions">
        <button
          onClick={() => navigate(`/trips/${tripId}/destinations/${destination.id}/edit`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ziel bearbeiten
        </button>
        <button
          onClick={() => onDelete(destination.id)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Löschen
        </button>
      </div>
    </div>
  );
}