import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/client";
import TripForm from "../../components/TripFormComponent/TripForm";
import { Trip } from "../../types/models";

export default function TripEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    participants: "",
    image: "",
  });

  useEffect(() => {
    api
      .get(`/trips/${id}`)
      .then((res) => {
        const trip: Trip = res.data;
        setForm({
          name: trip.name,
          description: trip.description || "",
          startDate: trip.startDate,
          endDate: trip.endDate,
          participants: trip.participants.join(", "),
          image: trip.image || "",
        });
      })
      .catch(() => {
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
      participants: form.participants
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
      <h1 style={{ textAlign: "center" }}>Reise bearbeiten</h1>
      <TripForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEditMode={true}
      />
    </div>
  );
}