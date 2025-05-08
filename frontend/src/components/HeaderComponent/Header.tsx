import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <h1 className="app-title">Reiseplaner</h1>
        <nav className="app-nav">
          <Link to="/" className="nav-link">Startseite</Link>
          <Link to="/trips/new" className="nav-link">Neue Reise</Link>
          <Link to="/trips/by/destination" className="nav-link">Reisen</Link>
          <Link to="/destinations" className="nav-link">Ziele</Link>
        </nav>
      </div>
    </header>
  );
}