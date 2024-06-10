import React, { useState } from 'react';
import './HLComponent.css';
import Carousel from 'react-bootstrap/Carousel';

const HeatLoadCalculator = () => {
  const [roomAreaSqFt, setRoomAreaSqFt] = useState('');
  const [occupants, setOccupants] = useState('');
  const [lightFixtures, setLightFixtures] = useState('');
  const [equipment, setEquipment] = useState('');
  const [roofOpen, setRoofOpen] = useState('No');
  const [heatLoad, setHeatLoad] = useState(null);
  const [acCapacity, setAcCapacity] = useState(null);
  const [acTon, setAcTon] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Convert room area from sq.ft to sq.m
    const roomAreaSqM = roomAreaSqFt * 0.092903;

    // Adjusted factors for heat load calculation
    const areaHeatLoad = roomAreaSqM * 15; // Adjusted area heat load factor
    const occupantHeatLoad = occupants * 150; // Adjusted occupant heat load factor

    // Other factors remain the same
    const lightingHeatLoad = lightFixtures * 50;
    const equipmentHeatLoad = equipment * 4;
    const roofHeatLoad = roofOpen === 'Yes' ? roomAreaSqM * 300 : 0;

    // Calculate total heat load
    const totalHeatLoad = areaHeatLoad + occupantHeatLoad + lightingHeatLoad + equipmentHeatLoad + roofHeatLoad;

    // Example: 1 watt = 3.41 BTU/h
    const capacity = totalHeatLoad * 3.41;
    const tonnage = capacity / 12000;

    // Update state with calculated values
    setHeatLoad(totalHeatLoad.toFixed(2));
    setAcCapacity(capacity.toFixed(2));
    setAcTon(tonnage.toFixed(2));
  };

  return (
    <div className="container">
      <div className='input-el'>
        <h2>Fill all the fields</h2>
        <hr></hr>
        <form onSubmit={handleSubmit}>
          <label htmlFor="roomAreaSqFt">Room Area (in square feet):</label>
          <input
            type="number"
            id="roomAreaSqFt"
            value={roomAreaSqFt}
            onChange={(e) => setRoomAreaSqFt(e.target.value)}
            placeholder="Enter room area in square feet"
            required
          />

          <label htmlFor="occupants">Number of Occupants:</label>
          <input
            type="number"
            id="occupants"
            value={occupants}
            onChange={(e) => setOccupants(e.target.value)}
            placeholder="Enter number of occupants"
            required
          />

          <label htmlFor="lightFixtures">Number of Light Fixtures:</label>
          <input
            type="number"
            id="lightFixtures"
            value={lightFixtures}
            onChange={(e) => setLightFixtures(e.target.value)}
            placeholder="Enter number of light fixtures"
            required
          />

          <label htmlFor="equipment">Total Equipment Load (in watts):</label>
          <input
            type="number"
            id="equipment"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            placeholder="Enter total equipment load"
            required
          />

          <label htmlFor="roofOpen">Is the roof open to sunlight?</label>
          <select
            id="roofOpen"
            value={roofOpen}
            onChange={(e) => setRoofOpen(e.target.value)}
            required
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          
          <br></br>
          <br></br>
          <button type="submit">Calculate Heat Load</button>
        </form>
      </div>
      <div className='right-el'>
        <div className='c-edit'>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="src/assets/HVAC-Cooling-Load-.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="src/assets/cooling-load-components.png"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="src/assets/cooling-load-calculations.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        
        <div className='result-el'>
          {heatLoad !== null && (
            <div id="result">
              <h3>Results:</h3>
              <hr></hr>
              <p>Heat Load: <span id="heatLoad">{heatLoad}</span> Watts</p>
              <p>Suggested Air Conditioner Capacity: <span id="acCapacity">{acCapacity}</span> BTU/h</p>
              <p>Tonage of Air-conditioner Required: <span id='acTon'>{acTon}</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeatLoadCalculator;
