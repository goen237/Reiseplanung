import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/client";
import DestinationForm from "../../components/DestinationFormComponent/DestinationForm";
import "./EditDestinationPage.css";

interface Destination {
  id: number;
  name: string;
  description?: string;
  activities?: string[];
  photos?: string[];
  latitude?: number;
  longitude?: number;
}

export default function EditDestinationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Destination>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.get(`/destinations/${id}`)
      .then(res => {
        setForm(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]:
      name === "latitude" || name === "longitude"
        ? value === "" ? undefined : parseFloat(value)
        : value,

  }));
  console.log("Form state updated:", {
    ...form,
  });
};

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: "activities" | "photos") => {
    setForm({
      ...form,
      [field]: e.target.value.split(",").map(s => s.trim()).filter(Boolean),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    await api.put(`/destinations/${id}`, form);
    navigate(-1);
  };

  if (loading) {
    return <div className="edit-destination-loading">Lade Reiseziel...</div>;
  }

  return (
    <div className="edit-destination-container">
      <h2 className="edit-destination-title">Reiseziel bearbeiten</h2>
      <form onSubmit={handleSubmit} className="edit-destination-form">
        <DestinationForm form={form} onChange={handleChange} onArrayChange={handleArrayChange} />
        <button type="submit" className="edit-destination-btn">Speichern</button>
        <button type="button" className="edit-destination-cancel" onClick={() => navigate(-1)}>
          Abbrechen
        </button>
      </form>
    </div>
  );
}