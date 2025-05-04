import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";
import { Destination } from "../types/models";

export default function AddDestinationPage() {
  const { id, destinationId } = useParams<{ id: string; destinationId?: string }>();

  console.log("Trip ID:", id, "Destination ID:", destinationId);

  const navigate = useNavigate();

  const isEdit = Boolean(destinationId);

  const [form, setForm] = useState<Partial<Destination>>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    activities: [],
    photos: [],
  });

  useEffect(() => {
    if (isEdit && destinationId) {
      api
        .get<Destination>(`/destinations/${destinationId}`)
        .then((res) => setForm(res.data))
        .catch((err) => console.error("Fehler beim Laden des Ziels:", err));
    }
  }, [id, destinationId, isEdit]);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (new Date(form.startDate!) > new Date(form.endDate!)) {
      alert("Das Startdatum darf nicht nach dem Enddatum liegen.");
      return;
    }

    try {
      console.log("Formular wird gespeichert:", form);
      // Daten für das Ziel vorbereiten
      const destinationData = {
        name: form.name,
        description: form.description,
        startDate: form.startDate ? new Date(form.startDate).toISOString() : undefined,
        endDate: form.endDate ? new Date(form.endDate).toISOString() : undefined,
        activities: form.activities?.map((a) => a.trim()).filter((a) => a !== ""),
        photos: form.photos?.map((p) => p.trim()).filter((p) => p !== ""),
      };
      console.log("Zieldaten:", destinationData);
      console.log("Trip ID:", id, "Destination ID:", destinationId);
      if (isEdit && id && destinationId) {
        // Ziel aktualisieren
        await api.put(`/destinations/${destinationId}`, destinationData);
        console.log("Ziel aktualisiert:", destinationData);
      } else if (id) {
        // Neues Ziel anlegen
        const destination = await api.post(`/destinations/`, destinationData);
        await api.post(`/trips/${id}/destinations`, { destinationId: destination.data.id });
        console.log("Neues Ziel angelegt:", destination.data);
      }
      window.alert("Reiseziel erfolgreich gespeichert!");
      // Nach dem Speichern zurück zur Reise-Detailseite navigieren
      console.log("Navigiere zu:", `/trips/${id}`);
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
        <label>
          Name:
          <input
            required
            name="name"
            value={form.name || ""}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <label>
          Beschreibung:
          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <label>
          Startdatum:
          <input
            type="date"
            required
            name="startDate"
            value={form.startDate ? form.startDate.split("T")[0] : ""}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <label>
          Enddatum:
          <input
            type="date"
            required
            name="endDate"
            value={form.endDate ?  form.endDate.split("T")[0] : ""}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <label>
          Aktivitäten (kommagetrennt):
          <input
            name="activities"
            value={form.activities?.join(", ") || ""}
            onChange={(e) => handleArrayChange(e, "activities")}
          />
        </label>
        <br></br>
        <label>
          Fotos (URLs, kommagetrennt):
          <input
            name="photos"
            value={form.photos?.join(", ") || ""}
            onChange={(e) => handleArrayChange(e, "photos")}
          />
        </label>
        <br></br>
        <button type="submit">{isEdit ? "Speichern" : "Anlegen"}</button>
      </form>
    </div>
  );
}