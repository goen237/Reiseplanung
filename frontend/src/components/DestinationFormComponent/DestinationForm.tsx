import "./DestinationForm.css";

interface Destination {
  name?: string;
  description?: string;
  activities?: string[];
  photos?: string[];
  latitude?: number;
  longitude?: number;
}

interface DestinationFormProps {
  form: Partial<Destination>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onArrayChange: (e: React.ChangeEvent<HTMLInputElement>, field: "activities" | "photos") => void;
}

export default function DestinationForm({ form, onChange, onArrayChange }: DestinationFormProps) {
  return (
    <div className="destination-form">
      <label>
        Name:
        <input
          required
          name="name"
          value={form.name || ""}
          onChange={onChange}
        />
      </label>
      <label>
        Beschreibung:
        <textarea
          name="description"
          value={form.description || ""}
          onChange={onChange}
        />
      </label>
      <label>
        Aktivitäten (kommagetrennt):
        <input
          name="activities"
          value={form.activities?.join(", ") || ""}
          onChange={(e) => onArrayChange(e, "activities")}
        />
      </label>
      <label>
        Fotos (URLs, kommagetrennt):
        <input
          name="photos"
          value={form.photos?.join(", ") || ""}
          onChange={(e) => onArrayChange(e, "photos")}
        />
      </label>
      <label>
        Breitengrad: <input
          name="latitude"
          type="number"
          value={form.latitude || ""}
          onChange={onChange}
        />
      </label>
      <label>
        Längengrad: <input
          name="longitude"
          type="number"
          value={form.longitude || ""}
          onChange={onChange}
        />
      </label>
    </div>
  );
}