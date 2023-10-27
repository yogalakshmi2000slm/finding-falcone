import "./App.css";
import Header from "./Components/Header/Header";
import PlanetDropdown from "./Components/Planets/PlanetDropdowns";
import FalconeSelection from "./Components/Vehicle/Vehicle";
import React, { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuccessPage from "./Components/Success";

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  function onPlanetSelect(selectedPlanet) {
    setSelectedPlanet(selectedPlanet);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <PlanetDropdown onPlanetSelect={onPlanetSelect} />
              <FalconeSelection selectedPlanet={selectedPlanet} />
            </>
          }
        />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
