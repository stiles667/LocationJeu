import "./App.css";
import { Routes, Route } from "react-router-dom";
import Inscr from "./composant/Inscription";
import Connexion from "./composant/Connexion";
import Accueil from "./composant/Accuel";
import Panier from "./composant/Panier";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/inscription" element={<Inscr />} />
        <Route path="/" element={<Connexion />} />
        <Route path="/Accueil" element={<Accueil />} />
        <Route path="/Panier" element={<Panier />} />
      </Routes>
    </div>
  );
}

export default App;
