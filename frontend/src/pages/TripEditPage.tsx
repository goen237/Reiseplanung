import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";
import { Trip } from "../types/models";

export default function TripEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    participant: "",
    image: "",
  });

  useEffect(() => {
    api.get(`/trips/${id}`).then((res) => {
      const trip: Trip = res.data;
      setForm({
        name: trip.name,
        description: trip.description || "",
        startDate: trip.startDate,
        endDate: trip.endDate,
        participant: trip.participant.join(", "),
        image: trip.image || "",
      });
    }).catch(() => {
      alert("Reise konnte nicht geladen werden.");
      navigate("/");
    });
  }, [id, navigate]);

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
      await api.put(`/trips/${id}`, tripData);
      navigate(`/trips/${id}`);
    } catch (err) {
      console.error("Fehler beim Aktualisieren:", err);
      alert("Update fehlgeschlagen.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reise bearbeiten</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          required
          placeholder="Name der Reise"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <br></br>
        <textarea
          name="description"
          placeholder="Beschreibung"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <br></br>
        <input
          name="startDate"
          type="date"
          value={form.startDate ? form.startDate.split("T")[0] : ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <br></br>
        <input
          name="endDate"
          type="date"
          value={form.endDate ?  form.endDate.split("T")[0] : ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <br></br>
        <input
          name="participants"
          type="text"
          placeholder="Teilnehmer (durch Komma getrennt)"
          value={form.participant}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <br></br>
        <input
          name="image"
          type="text"
          placeholder="Bild-URL (optional)"
          value={form.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <br></br>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Reise speichern
        </button>
      </form>
    </div>
  );
}
