import { useNavigate } from "react-router-dom";
import { Destination } from "../types/models";

interface DestinationCardProps {
  destination: Destination;
  tripId: string;
  onDelete: (id: number) => void;
}

export default function DestinationCard({ destination, tripId, onDelete }: DestinationCardProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-4 border p-2 rounded">
      <h3 className="font-semibold">{destination.name}</h3>
      <p>{destination.description}</p>
      <p>
        <strong>Zeitraum:</strong>{" "}
        {destination.startDate
          ? new Date(destination.startDate).toISOString().split("T")[0]
          : "Unbekannt"}{" "}
        bis{" "}
        {destination.endDate
          ? new Date(destination.endDate).toISOString().split("T")[0]
          : "Unbekannt"}
      </p>
      {destination.activities?.length > 0 && (
        <ul className="list-disc pl-5">
          {destination.activities.map((a, idx) => (
            <li key={idx}>{a}</li>
          ))}
        </ul>
      )}
      <button
        onClick={() => navigate(`/trips/${tripId}/destinations/${destination.id}/edit`)}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        Ziel bearbeiten
      </button>
      <button
        onClick={() => onDelete(destination.id)}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Löschen
      </button>
    </div>
  );
}