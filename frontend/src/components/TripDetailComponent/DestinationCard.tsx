import { useNavigate } from "react-router-dom";
import { Destination } from "../../types/models";
import WeatherForecastWidget from "./WeatherForecastWidget";
import "./DestinationCard.css";

interface DestinationCardProps {
  destination: Destination;
  tripId: string;
  onDelete: (id: number) => void;
  tripStartDate: string;
  tripEndDate: string;
}
export default function DestinationCard({
  destination,
  tripId,
  onDelete,
  tripStartDate,
  tripEndDate,
}: DestinationCardProps) {
  const navigate = useNavigate();


  return (
    <div className="destination-card">
      <h2>{destination.name}</h2>
      {destination.latitude &&
        destination.longitude &&
        !!tripStartDate &&
        !!tripEndDate && (
          <WeatherForecastWidget
            latitude={destination.latitude}
            longitude={destination.longitude}
            startDate={tripStartDate}
            endDate={tripEndDate}
          />
      )}
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
        <div className="destination-activities-badges">
          {destination.activities.map((activity, idx) => (
            <span className="destination-activity-badge" key={idx}>
              {activity}
            </span>
          ))}
        </div>
      )}

      <div className="destination-actions">
        <button
          onClick={() =>
            navigate(
              tripId
          ? `/trips/${tripId}/destinations/${destination.id}/edit`
          : `/destinations/${destination.id}/edit`
            )
          }
        >
          Ziel bearbeiten
        </button>
        <button onClick={() => onDelete(destination.id)}>
          Löschen
        </button>
      </div>
    </div>
  );
}