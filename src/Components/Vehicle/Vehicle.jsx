import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Vehicle.css";

function FalconeSelection({ selectedPlanet }) {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState(["", "", "", ""]);
  const [selectedPlanets, setSelectedPlanets] = useState(["", "", "", ""]);

  const [planetData, setPlanetData] = useState([]);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  

  useEffect(() => {
    fetch("https://findfalcone.geektrust.com/vehicles")
      .then((response) => response.json())
      .then((data) => {
        setVehicles(data);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
      });

      fetch("https://findfalcone.geektrust.com/planets")
      .then((response) => response.json())
      .then((data) => {
        setPlanetData(data);
       
        setSelectedPlanets([selectedPlanet, selectedPlanet, selectedPlanet, selectedPlanet]);
      })
      .catch((error) => console.error("Error fetching planets:", error));
  }, [selectedPlanet])

  const calculateTimeTaken = (planet, vehicle) => {
    if (planet && vehicle) {
      const planetObj = planetData.find((p) => p.name === planet);
      const vehicleObj = vehicles.find((v) => v.name === vehicle);

      if (planetObj && vehicleObj) {
        return planetObj.distance / vehicleObj.speed;
      }
    }
    return 0;
  };

  const handleVehicleSelect = (columnIndex, vehicle) => {
    const selectedVehiclesCopy = [...selectedVehicles];
    selectedVehiclesCopy[columnIndex] = vehicle;
    setSelectedVehicles(selectedVehiclesCopy);

    const timeTaken = calculateTimeTaken(selectedPlanet, vehicle);
    setTotalTimeTaken(
      totalTimeTaken -
        calculateTimeTaken(selectedPlanet, selectedVehicles[columnIndex]) +
        timeTaken
    );
  };
  const navigate = useNavigate();
  const handleFindFalconeClick = async () => {
    const allVehiclesSelected = selectedVehicles.every(
      (vehicle) => vehicle !== ""
    );
  
    if (!allVehiclesSelected) {
      alert("Please select all the required fields before finding Falcone.");
      return;
    }
    

    console.log("Selected Planets:", selectedPlanets);
    console.log("Selected Vehicles:", selectedVehicles);

    const data = {
      token: "aCVRJnQerLxQIFokvWypoxsIFcytSfKt",
      planet_names: selectedPlanets,
      vehicle_names: selectedVehicles,
    };

    try {
      const response = await fetch("https://findfalcone.geektrust.com/find", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);

        if (result.status === "false") {
          console.log("Falcone not found.");
          console.log("Details:", result);
          alert(
            "Falcone was not found on this mission. Please try again or explore other options."
          );
        } else if (result.status === "success") {
          console.log("Falcone found!");
          const successMessage = `Congratulations! You found Falcone on ${result.planet_name} planet in ${totalTimeTaken} hours.`;
          console.log(successMessage);
          alert(successMessage);
          navigate("/success", { state: { successMessage } });
        } else if (
          result.error === 
          "token not initialized. please get a new token with the /token API"
        ) {
          console.log("Token error:", result.error);
          alert("Token error: Please get a new token with the /token API.");
        } else {
          console.log("Unknown response status:", result.status);
          alert("An unexpected response was received.");
        }
      } else {
        console.error("Failed to retrieve data from the API");
        alert("An error occurred while finding Falcone. Please try again.");
      }
    } catch (error) {
      console.error("Error finding Falcone:", error);
      alert("An error occurred while finding Falcone. Please try again.");
    }
  };

  return (
    <div className="vehicle-sets-container">
      <div className="time-container">
        <p>Total Time Taken: {totalTimeTaken} </p>
      </div>

      {[0, 1, 2, 3].map((setIndex) => (
        <div key={setIndex} className="vehicle-set">
          <form>
            {vehicles.map((vehicle, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name={`vehicle-set-${setIndex}`}
                  value={vehicle.name}
                  id={`vehicle-${setIndex}-${index}`}
                  onChange={() => handleVehicleSelect(setIndex, vehicle.name)}
                  checked={selectedVehicles[setIndex] === vehicle.name}
                />
                <label htmlFor={`vehicle-${setIndex}-${index}`}>
                  {vehicle.name}
                </label>
              </div>
            ))}
          </form>
        </div>
      ))}

      <button onClick={handleFindFalconeClick}>Find Falcone</button>
    </div>
  );
}

export default FalconeSelection;

