import { Outlet } from "react-router-dom";
import Header from "./components/HeaderComponent/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}