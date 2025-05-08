import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404 - Seite nicht gefunden</h1>
      <p className="notfound-message">
        Die Seite, die Sie suchen, existiert nicht oder wurde verschoben.
      </p>
      <Link to="/" className="notfound-link">
        Zurück zur Startseite
      </Link>
    </div>
  );
}