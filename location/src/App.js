import "./App.css";
import { Routes, Route } from "react-router-dom";
import Inscr from "./composant/Inscription";
import Connexion from "./composant/Connexion";
import Accueil from "./composant/Accueil";
import Panier from "./composant/Panier";
import Avis from "./composant/Avis";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/inscription" element={<Inscr />} />
        <Route path="/" element={<Connexion />} />
        <Route path="/Accueil" element={<Accueil />} />
        <Route path="/Panier" element={<Panier />} />
        <Route path="/Avis" element={<Avis />} />
      </Routes>
    </div>
  );
}

export default App;
