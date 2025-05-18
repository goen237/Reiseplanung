import { useEffect, useState } from "react";

function minDate(a: string, b: string) {
  return new Date(a) < new Date(b) ? a : b;
}

interface WeatherForecastWidgetProps {
  latitude: number;
  longitude: number;
  startDate: string; // ISO-String
  endDate: string;   // ISO-String
}

interface WeatherDay {
  date: string;
  temp_max: number;
  temp_min: number;
  weathercode: number;
}

function getWeatherIcon(code: number) {
  // Siehe https://open-meteo.com/en/docs für Codes
  if (code === 0) return "☀️";
  if ([1, 2, 3].includes(code)) return "🌤️";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51, 53, 55, 56, 57].includes(code)) return "🌦️";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "🌧️";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return "❔";
}

export default function WeatherForecastWidget({
  latitude,
  longitude,
  startDate,
  endDate,
}: WeatherForecastWidgetProps) {
  const [forecast, setForecast] = useState<WeatherDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const today = new Date();
    const maxEnd = new Date(today);
    maxEnd.setDate(today.getDate() + 16);
    const allowedEnd = minDate(endDate.slice(0, 10), maxEnd.toISOString().slice(0, 10));

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${startDate.slice(0,10)}&end_date=${allowedEnd}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.daily) {
          const days: WeatherDay[] = data.daily.time.map((date: string, i: number) => ({
            date,
            temp_max: data.daily.temperature_2m_max[i],
            temp_min: data.daily.temperature_2m_min[i],
            weathercode: data.daily.weathercode[i],
          }));
          setForecast(days);
        }
        setLoading(false);
      });
  }, [latitude, longitude, startDate, endDate]);

  if (loading) return <div className="weather-widget">Lade Wetterdaten...</div>;
  if (!forecast.length) return <div className="weather-widget">Keine Wetterdaten verfügbar.</div>;

  return (
    <div className="weather-widget">
      <div style={{ fontWeight: 600, marginBottom: 6 }}>Wettervorhersage</div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {forecast.map((day) => (
          <div
            key={day.date}
            style={{
              background: "#e3f2fd",
              borderRadius: 8,
              padding: "0.5rem 0.8rem",
              minWidth: 80,
              textAlign: "center",
              boxShadow: "0 1px 4px #90caf9aa",
              fontSize: "0.98rem",
            }}
          >
            <div style={{ fontWeight: 500 }}>{new Date(day.date).toLocaleDateString()}</div>
            <div style={{ fontSize: "1.5rem" }}>{getWeatherIcon(day.weathercode)}</div>
            <div>
              <span style={{ color: "#0078d4" }}>{Math.round(day.temp_max)}°C</span>
              <span style={{ color: "#888", marginLeft: 4, fontSize: "0.95em" }}>
                / {Math.round(day.temp_min)}°C
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}