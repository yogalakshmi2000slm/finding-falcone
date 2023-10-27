import React, { useState, useEffect } from 'react';
import './Planet.css';

function PlanetDropdown({ onPlanetSelect }) {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanets, setSelectedPlanets] = useState(["", "", "", ""]);

  useEffect(() => {
    fetch("https://findfalcone.geektrust.com/planets")
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data);
      })
      .catch((error) => console.error("Error fetching planets:", error));
  }, []);

  const handlePlanetSelection = (planet, index) => {
    const newSelectedPlanets = [...selectedPlanets];
    newSelectedPlanets[index] = planet;
    setSelectedPlanets(newSelectedPlanets);
    onPlanetSelect(planet); 
  }

  return (
    <div className="destination-dropdowns-horizontal">
      {selectedPlanets.map((selectedPlanet, index) => (
        <select
          key={index}
          value={selectedPlanet}
          onChange={(e) => handlePlanetSelection(e.target.value, index)}
        >
          <option value="">Select a planet</option>
          {planets.map((planet) => (
            <option key={planet.name} value={planet.name}>
              {planet.name}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}

export default PlanetDropdown;
