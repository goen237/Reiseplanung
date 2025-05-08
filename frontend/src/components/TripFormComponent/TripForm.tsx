import React from "react";
import "./TripForm.css";

interface TripFormProps {
  form: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    image: string;
    participants: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditMode: boolean;
}

export default function TripForm({ form, onChange, onSubmit, isEditMode }: TripFormProps) {
  return (
    <form onSubmit={onSubmit} className="trip-form">
      <label>
        Name der Reise:
        <input
          name="name"
          type="text"
          required
          placeholder="Name der Reise"
          value={form.name}
          onChange={onChange}
        />
      </label>
      <label>
        Beschreibung:
        <textarea
          name="description"
          placeholder="Beschreibung"
          value={form.description}
          onChange={onChange}
        />
      </label>
      <label>
        Startdatum:
        <input
          name="startDate"
          type="date"
          required
          value={form.startDate ? form.startDate.split("T")[0] : ""}
          onChange={onChange}
        />
      </label>
      <label>
        Enddatum:
        <input
          name="endDate"
          type="date"
          required
          value={form.endDate ?  form.endDate.split("T")[0] : ""}
          onChange={onChange}
        />
      </label>
      <label>
        Teilnehmer (durch Komma getrennt):
        <input
          name="participants"
          type="text"
          placeholder="Teilnehmer (durch Komma getrennt)"
          value={form.participants}
          onChange={onChange}
        />
      </label>
      <label>
        Bild-URL (optional):
        <input
          name="image"
          type="text"
          placeholder="Bild-URL (optional)"
          value={form.image}
          onChange={onChange}
        />
      </label>
      <button type="submit">
        {isEditMode ? "Reise aktualisieren" : "Reise speichern"}
      </button>
    </form>
  );
}