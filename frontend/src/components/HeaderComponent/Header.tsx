import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { Trip } from "../../types/models";
import "./Header.css";

export default function Header() {
  const [showBell, setShowBell] = useState(false);

  useEffect(() => {
    api.get("/trips").then(res => {
      const today = new Date();
      const hasUpcoming = res.data.some((trip: Trip) => {
        const start = new Date(trip.startDate);
        const diff = Math.ceil((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diff >= 0 && diff <= 7;
      });
      setShowBell(hasUpcoming);
    });
  }, []);

  return (
    <header className="app-header">
      <div className="header-container">
        <h1 className="app-title">Reiseplaner</h1>
        <nav className="app-nav">
          <Link to="/" className="nav-link">Startseite</Link>
          <Link to="/trips/new" className="nav-link">Neue Reise</Link>
          <Link to="/trips/by/destination" className="nav-link">Reisen</Link>
          <Link to="/destinations" className="nav-link">Ziele</Link>
          {showBell && (
            <div className="navbar-bell-hint">
              <span role="img" aria-label="bell" className="bell-emoji">🔔</span>
              <span>Bald startet eine Reise!</span>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}