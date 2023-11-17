import "./App.css";
import { Routes, Route } from "react-router-dom";
import Inscr from "./composant/Inscription";
import Connexion from "./composant/Connexion";
import Accueil from "./composant/Accueil";
import Panier from "./composant/panier";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/inscription" element={<Inscr />} />
        <Route path="/Connexion" element={<Connexion />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/Accueil" element={<Accueil />} />
      </Routes>
    </div>
  );
}

export default App;
