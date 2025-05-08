import { Destination } from "../../types/models";
import DestinationCard from "./DestinationCard";

interface DestinationListProps {
  destinations: Destination[];
  tripId: string;
  onAdd: () => void;
  onDelete: (destinationId: number) => void;
}

import "./DestinationList.css"; // Import der CSS-Datei

export default function DestinationList({
  destinations,
  tripId,
  onAdd,
  onDelete,
}: DestinationListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold">Reiseziele</h2>
      <button
        onClick={onAdd}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Neues Reiseziel hinzufügen
      </button>
      <div className="destination-list">
        {destinations.length ? (
          destinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              tripId={tripId}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p>Keine Reiseziele vorhanden.</p>
        )}
      </div>
    </div>
  );
}