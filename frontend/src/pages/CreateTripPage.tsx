import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";

export default function CreateTripPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    image: "",
    participant: "",
  });

  useEffect(() => {
    if (id) {
      // Wenn eine ID vorhanden ist, laden wir die Daten der bestehenden Reise
      api
        .get(`/trips/${id}`)
        .then((res) => {
          const trip = res.data;
          setForm({
            name: trip.name,
            description: trip.description || "",
            startDate: trip.startDate,
            endDate: trip.endDate,
            image: trip.image || "",
            participant: trip.participant.join(", "),
          });
        })
        .catch((err) => console.error("Fehler beim Laden der Reise:", err));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tripData = {
      ...form,
      participant: form.participant
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p !== ""),
    };

    try {
      if (id) {
        // Bearbeiten einer bestehenden Reise
        await api.put(`/trips/${id}`, tripData);
        navigate(`/trips/${id}`);
      } else {
        // Anlegen einer neuen Reise
        const res = await api.post("/trips", tripData);
        const newTripId = res.data.id;
        navigate(`/trips/${newTripId}`);
      }
    } catch (err) {
      console.error("Fehler beim Speichern der Reise:", err);
      alert("Reise konnte nicht gespeichert werden.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Reise bearbeiten" : "Neue Reise anlegen"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          required
          placeholder="Name der Reise"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Beschreibung"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="startDate"
          type="date"
          required
          value={form.startDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="endDate"
          type="date"
          required
          value={form.endDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="participant"
          type="text"
          placeholder="Teilnehmer (durch Komma getrennt)"
          value={form.participant}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="image"
          type="text"
          placeholder="Bild-URL (optional)"
          value={form.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {id ? "Reise aktualisieren" : "Reise speichern"}
        </button>
      </form>
    </div>
  );
}