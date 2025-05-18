import { useEffect, useState } from "react";
import "./TripDetails.css";

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

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function update() {
      const now = new Date();
      const start = new Date(targetDate);
      const diff = start.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft("Die Reise hat begonnen!");
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

export default function TripDetails({ trip, onEdit }: TripDetailsProps) {
  const countdown = useCountdown(trip.startDate);

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
      <div className="trip-details-countdown">
        <span role="img" aria-label="clock" className="trip-details-clock">⏰</span>
        <span>
          {countdown === "Die Reise hat begonnen!"
            ? countdown
            : `Countdown bis zum Start: ${countdown}`}
        </span>
      </div>
      <p className="trip-details-text">
        <strong>Beschreibung:</strong> {trip.description}
      </p>
      <p className="trip-details-text">
        <strong>Zeitraum:</strong> {new Date(trip.startDate).toLocaleDateString()} bis{" "}
        {new Date(trip.endDate).toLocaleDateString()}
      </p>
      <p className="trip-details-text">
        <strong>Teilnehmer:</strong> {trip.participants.join(", ")}
      </p>
      <button
        onClick={onEdit}
        className="trip-details-button"
      >
        <i className="fa fa-pencil" aria-hidden="true" style={{ marginRight: 6 }} />
        Reise bearbeiten
      </button>
    </div>
  );
}