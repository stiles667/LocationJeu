import "./App.css";
import { Routes, Route } from "react-router-dom";
import Inscr from "./composant/Inscription";
import Connexion from "./composant/Connexion";
import Panier from "./composant/panier";
import Accueil from "./composant/Accuel";
import Panier from "./composant/Panier";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/inscription" element={<Inscr />} />
        <Route path="/Connexion" element={<Connexion />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/Accueil" element={<Accueil />} />
        <Route path="/Panier" element={<Panier />} />
      </Routes>
    </div>
  );
}

export default App;
