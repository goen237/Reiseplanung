import { useNavigate } from "react-router-dom";
import { Trip } from "../../types/models";
import { useEffect, useState } from "react";
import ActionButton from "./ActionButton";
import "./TripCard.css";

interface TripCardProps {
  trip: Trip;
  onDelete: (id: number) => void;
  onArchive: (id: number, archived: boolean) => void;
}

function getDaysUntil(dateString: string) {
  const today = new Date();
  const start = new Date(dateString);
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  return Math.ceil((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function update() {
      const now = new Date();
      const start = new Date(targetDate);
      const diff = start.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft("Gestartet!");
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

export default function TripCard({ trip, onDelete, onArchive }: TripCardProps) {
  const navigate = useNavigate();
  const days = getDaysUntil(trip.startDate);
  const countdown = useCountdown(trip.startDate);
  const isSoon = days >= 0 && days <= 7;

  return (
    <div className={`trip-card${isSoon ? " trip-card-upcoming" : ""}${trip.archived ? " trip-card-archived" : ""}`}>
      {trip.image && (
        <img
          src={trip.image}
          alt={trip.name}
          className="trip-image"
        />
      )}
      <div className="trip-card-header">
        <h2>{trip.name}</h2>
        {isSoon && (
          <span className="trip-countdown">{countdown}</span>
        )}
      </div>
      <p className="trip-dates">
        <i className="fa fa-calendar" aria-hidden="true" style={{ marginRight: 6 }} />
        {new Date(trip.startDate).toLocaleDateString()} – {new Date(trip.endDate).toLocaleDateString()}
      </p>
      <p className="trip-description">{trip.description}</p>
      {isSoon && (
        <div className="trip-card-hint">
          <span role="img" aria-label="rocket" className="rocket-emoji">🚀</span>
          Deine Reise startet in {days} Tag{days !== 1 && "en"}!
        </div>
      )}
      {trip.archived && (
        <div className="archived-label">
          <i className="fa fa-archive" aria-hidden="true" style={{ marginRight: 4 }} />
          Archiviert
        </div>
      )}
      <div className="trip-actions">
        <ActionButton color="primary" onClick={() => navigate(`/trips/${trip.id}`)} title="Details ansehen">
          <i className="fa fa-search" aria-hidden="true" /> Details
        </ActionButton>
        <ActionButton color="edit" onClick={() => navigate(`/trips/${trip.id}/edit`)} title="Bearbeiten">
          <i className="fa fa-pencil" aria-hidden="true" /> Bearbeiten
        </ActionButton>
        <ActionButton color="delete" onClick={() => onDelete(trip.id)} title="Löschen">
          <i className="fa fa-trash" aria-hidden="true" /> Löschen
        </ActionButton>
        {!trip.archived && (
          <ActionButton color="archive" onClick={() => onArchive(trip.id, true)} title="Archivieren">
            <i className="fa fa-archive" aria-hidden="true" /> Archivieren
          </ActionButton>
        )}
        {trip.archived && (
          <ActionButton color="restore" onClick={() => onArchive(trip.id, false)} title="Wiederherstellen">
            <i className="fa fa-undo" aria-hidden="true" /> Wiederherstellen
          </ActionButton>
        )}
      </div>
    </div>
  );
}