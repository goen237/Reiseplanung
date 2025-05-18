import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/client";
import DestinationForm from "../../components/DestinationFormComponent/DestinationForm";
import { Destination } from "../../types/models";
import "./AddDestinationPage.css";

export default function AddDestinationPage() {
  const { id, destinationId } = useParams<{ id?: string; destinationId?: string }>();
  const navigate = useNavigate();

  const isEdit = Boolean(destinationId);
  const isTrip = Boolean(id);

  const [form, setForm] = useState<Partial<Destination>>({
    name: "",
    description: "",
    activities: [],
    photos: [],
  });

  const [allDestinations, setAllDestinations] = useState<Destination[]>([]);
  const [selectedDestinationIds, setSelectedDestinationIds] = useState<number[]>([]);
  const [includeNewDestination, setIncludeNewDestination] = useState(false);

  // Lade alle Reiseziele aus der Datenbank
  useEffect(() => {
    if (isTrip) {
      api
        .get<Destination[]>("/destinations")
        .then((res) => setAllDestinations(res.data))
        .catch((err) => console.error("Fehler beim Laden der Reiseziele:", err));
    }
  }, [isTrip]);

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
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "latitude" || name === "longitude"
          ? value === "" ? undefined : Number.parseFloat(value)
          : value,
    }));
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
      if (!isTrip) {
        // Speichere das Reiseziel direkt in die Datenbank
        const destinationData = {
          name: form.name,
          description: form.description,
          activities: form.activities?.map((a) => a.trim()).filter((a) => a !== ""),
          photos: form.photos?.map((p) => p.trim()).filter((p) => p !== ""),
          latitude: form.latitude,
          longitude: form.longitude,
        };

        await api.post(`/destinations/`, destinationData);
        alert("Reiseziel erfolgreich gespeichert!");
        navigate("/destinations");
        return;
      }

      let newDestinationId: number | null = null;

      // Neues Ziel speichern, wenn das Kontrollkästchen aktiviert ist
      if (includeNewDestination && !isEdit) {
        const destinationData = {
          name: form.name,
          description: form.description,
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
    <div className="add-destination-container">
      <h2 className="add-destination-title">
        {isEdit ? "Reiseziel bearbeiten" : isTrip ? "Neues Reiseziel zur Reise hinzufügen" : "Reiseziel speichern"}
      </h2>

      <form onSubmit={handleSubmit} className="destination-form">
        {isTrip && (
          <>
            <h4 className="destination-list-title">Alle verfügbaren Reiseziele</h4>
            <div className="destination-cards">
              {allDestinations.map((destination) => (
                <div
                  key={destination.id}
                  className={`destination-card${selectedDestinationIds.includes(destination.id) ? " selected" : ""}`}
                  onClick={() => handleDestinationSelection(destination.id)}
                  title={destination.description}
                >
                  {destination.photos?.[0] && (
                    <img src={destination.photos[0]} alt={destination.name} />
                  )}
                  <p>{destination.name}</p>
                  {destination.activities && destination.activities.length > 0 && (
                    <div className="destination-card-activities">
                      {destination.activities.map((act, idx) => (
                        <span className="destination-activity-badge" key={idx}>
                          {act}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={includeNewDestination}
                onChange={(e) => setIncludeNewDestination(e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkbox-custom"></span>
              Neues Reiseziel anlegen
            </label>
            {includeNewDestination && (
              <DestinationForm form={form} onChange={handleChange} onArrayChange={handleArrayChange} />
            )}
          </>
        )}
        {!isTrip && (
          <DestinationForm form={form} onChange={handleChange} onArrayChange={handleArrayChange} />
        )}
        <button type="submit" className="destination-submit-btn">
          {isEdit ? "Speichern" : "Anlegen"}
        </button>
      </form>
    </div>
  );
}

