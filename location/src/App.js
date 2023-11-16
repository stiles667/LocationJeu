import "./App.css";
import { Routes, Route } from "react-router-dom";
import Inscr from "./composant/Inscription";
import Connexion from "./composant/Connexion";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/inscription" element={<Inscr />} />
        <Route path="/Connexion" element={<Connexion />} />
      </Routes>
    </div>
  );
}

export default App;
