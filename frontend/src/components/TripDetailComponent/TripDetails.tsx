import "./TripDetails.css"; // Import der CSS-Datei

interface TripDetailsProps {
  trip: {
    name: string;
    image?: string;
    description: string;
    startDate: string;
    endDate: string;
    participants: string[];
  };
  onEdit: () => void;
}

export default function TripDetails({ trip, onEdit }: TripDetailsProps) {
  return (
    <div className="trip-details-container">
      <h1 className="trip-details-title">{trip.name}</h1>
      {trip.image && (
        <img
          src={trip.image}
          alt={trip.name}
          className="trip-details-image"
        />
      )}
      <p className="trip-details-text">
        <strong>Beschreibung:</strong> {trip.description}
      </p>
      <p className="trip-details-text">
        <strong>Zeitraum:</strong> {new Date(trip.startDate).toISOString().split("T")[0]} bis{" "}
        {new Date(trip.endDate).toISOString().split("T")[0]}
      </p>
      <p className="trip-details-text">
        <strong>Teilnehmer:</strong> {trip.participants.join(", ")}
      </p>
      <button
        onClick={onEdit}
        className="trip-details-button"
      >
        Reise bearbeiten
      </button>
    </div>
  );
}