import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/client";
import DestinationForm from "../../components/DestinationFormComponent/DestinationForm";
import { Destination } from "../../types/models";

export default function AddDestinationPage() {
  const { id, destinationId } = useParams<{ id: string; destinationId?: string }>();
  const navigate = useNavigate();

  const isEdit = Boolean(destinationId);

  const [form, setForm] = useState<Partial<Destination>>({
    name: "",
    description: "",
    // startDate: "",
    // endDate: "",
    activities: [],
    photos: [],
  });

  const [allDestinations, setAllDestinations] = useState<Destination[]>([]);
  const [selectedDestinationIds, setSelectedDestinationIds] = useState<number[]>([]);
  const [includeNewDestination, setIncludeNewDestination] = useState(false); // Kontrollkästchen-Status

  // Lade alle Reiseziele aus der Datenbank
  useEffect(() => {
    api
      .get<Destination[]>("/destinations")
      .then((res) => setAllDestinations(res.data))
      .catch((err) => console.error("Fehler beim Laden der Reiseziele:", err));
  }, []);

  // Lade das aktuelle Reiseziel, wenn es bearbeitet wird
  useEffect(() => {
    if (isEdit && destinationId) {
      api
        .get<Destination>(`/destinations/${destinationId}`)
        .then((res) => setForm(res.data))
        .catch((err) => console.error("Fehler beim Laden des Ziels:", err));
    }
  }, [destinationId, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: "activities" | "photos") => {
    const { value } = e.target;
    setForm((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleDestinationSelection = (destinationId: number) => {
    setSelectedDestinationIds((prev) =>
      prev.includes(destinationId)
        ? prev.filter((id) => id !== destinationId) // Entfernen, wenn bereits ausgewählt
        : [...prev, destinationId] // Hinzufügen, wenn nicht ausgewählt
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      console.log("Formular wird gespeichert:", form);

      let newDestinationId: number | null = null;

      // Neues Ziel speichern, wenn das Kontrollkästchen aktiviert ist
      if (includeNewDestination && !isEdit) {
        const destinationData = {
          name: form.name,
          description: form.description,
          // startDate: form.startDate ? new Date(form.startDate).toISOString() : undefined,
          // endDate: form.endDate ? new Date(form.endDate).toISOString() : undefined,
          activities: form.activities?.map((a) => a.trim()).filter((a) => a !== ""),
          photos: form.photos?.map((p) => p.trim()).filter((p) => p !== ""),
        };

        const destination = await api.post(`/destinations/`, destinationData);
        newDestinationId = destination.data.id;
        if (newDestinationId !== null) {
          selectedDestinationIds.push(newDestinationId); // Füge das neue Ziel zu den ausgewählten hinzu
        }
      }

      // Füge die ausgewählten Reiseziele zur Reise hinzu
      if (id && selectedDestinationIds.length > 0) {
        await api.post(`/trips/${id}/destinations`, { destinationIds: selectedDestinationIds });
      }

      alert("Reiseziel(e) erfolgreich gespeichert!");
      navigate(`/trips/${id}`);
    } catch (error) {
      console.error("Fehler beim Speichern des Ziels:", error);
      alert("Das Reiseziel konnte nicht gespeichert werden.");
    }
  };

  return (
    <div className="container">
      <h3>{isEdit ? "Reiseziel bearbeiten" : "Neues Reiseziel anlegen"}</h3>

      <form onSubmit={handleSubmit} className="destination-form">
      <DestinationForm form={form} onChange={handleChange} onArrayChange={handleArrayChange} />
        <br />
        <h4>Alle Reiseziele</h4>
        <div>
          {allDestinations.map((destination) => (
            <div key={destination.id}>
              <input
                type="checkbox"
                checked={selectedDestinationIds.includes(destination.id)}
                onChange={() => handleDestinationSelection(destination.id)}
              />
              {destination.name}
            </div>
          ))}
        </div>
        <br />
        <label>
          <input
            type="checkbox"
            checked={includeNewDestination}
            onChange={(e) => setIncludeNewDestination(e.target.checked)}
          />
          Neues Reiseziel speichern
        </label>
        <br />
        <button type="submit">{isEdit ? "Speichern" : "Anlegen"}</button>
      </form>
    </div>
  );
}