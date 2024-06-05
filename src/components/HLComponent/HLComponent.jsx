import React, { useState } from 'react';
import './HLComponent.css'; // Assuming you have a CSS file for styling

const HeatLoadCalculator = () => {
  const [roomAreaSqFt, setRoomAreaSqFt] = useState('');
  const [occupants, setOccupants] = useState('');
  const [lighting, setLighting] = useState('');
  const [equipment, setEquipment] = useState('');
  const [heatLoad, setHeatLoad] = useState(null);
  const [acCapacity, setAcCapacity] = useState(null);
  const [acTon, setAcTon] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Convert room area from sq.ft to sq.m
    const roomAreaSqM = roomAreaSqFt * 0.092903;

    // Assuming some calculations for heat load
    const areaHeatLoad = roomAreaSqM * 10; // Example calculation
    const occupantHeatLoad = occupants * 100; // Example calculation
    const totalHeatLoad = areaHeatLoad + occupantHeatLoad + parseInt(lighting) + parseInt(equipment);

    // Example: 1 watt = 3.41 BTU/h
    const capacity = totalHeatLoad * 3.41;
    const tonage = capacity / 12000
    setHeatLoad(totalHeatLoad);
    setAcCapacity(capacity);
    setAcTon(tonage)
  };

  return (
    <div className="container">
      <h2>Fill all the fields</h2>
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

        <label htmlFor="lighting">Total Lighting Load (in watts):</label>
        <input
          type="number"
          id="lighting"
          value={lighting}
          onChange={(e) => setLighting(e.target.value)}
          placeholder="Enter total lighting load"
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

        <button type="submit">Calculate Heat Load</button>
      </form>

      {heatLoad !== null && (
        <div id="result">
          <h3>Results:</h3>
          <p>Heat Load: <span id="heatLoad">{heatLoad}</span> Watts</p>
          <p>Suggested Air Conditioner Capacity: <span id="acCapacity">{acCapacity}</span> BTU/h</p>
          <p>Tonage of Air-conditioner Required: <span id='acTon'>{acTon}</span></p>
        </div>
      )}
    </div>
  );
};

export default HeatLoadCalculator;
