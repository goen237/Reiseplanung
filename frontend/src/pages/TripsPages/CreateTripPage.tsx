import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/client";
import TripForm from "../../components/TripFormComponent/TripForm";

export default function CreateTripPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    image: "",
    participants: "",
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
            participants: trip.participant.join(", "),
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
      participants: form.participants
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
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", textAlign: "center" }}>
        {id ? "Reise bearbeiten" : "Neue Reise anlegen"}
      </h1>
      <TripForm form={form} onChange={handleChange} onSubmit={handleSubmit} isEditMode={!!id} />
    </div>
  );
}