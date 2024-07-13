import React, { useState } from 'react';
import './HLComponent.css';
import Carousel from 'react-bootstrap/Carousel';

const appliances = [
  { name: 'TV', power: 150 },
  { name: 'Refrigerator', power: 200 },
  { name: 'Computer', power: 300 },
  { name: 'Microwave', power: 1000 },
  { name: 'Fan', power: 75 },
];

const HeatLoadCalculator = () => {
  const [roomAreaSqFt, setRoomAreaSqFt] = useState('');
  const [occupants, setOccupants] = useState('');
  const [lightFixtures, setLightFixtures] = useState('');
  const [equipment, setEquipment] = useState(appliances.map(() => ""));
  const [roofOpen, setRoofOpen] = useState('No');
  const [heatLoad, setHeatLoad] = useState(null);
  const [acCapacity, setAcCapacity] = useState(null);
  const [acTon, setAcTon] = useState(null);

  const handleEquipmentChange = (index, value) => {
    const newEquipment = [...equipment];
    newEquipment[index] = parseInt(value) || 0;
    setEquipment(newEquipment);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const roomAreaSqM = roomAreaSqFt * 0.092903;
    const areaHeatLoad = roomAreaSqM * 60;
    const occupantHeatLoad = occupants * 120;
    const lightingHeatLoad = lightFixtures * 80;

    const equipmentHeatLoad = equipment.reduce((total, quantity, index) => {
      return total + (quantity * appliances[index].power);
    }, 0);

    const roofHeatLoad = roofOpen === 'Yes' ? roomAreaSqM * 100 : roomAreaSqM * 75;

    const totalHeatLoad = areaHeatLoad + occupantHeatLoad + lightingHeatLoad + equipmentHeatLoad + roofHeatLoad;

    const capacity = totalHeatLoad * 3.41;
    const tonnage = capacity / 12000;

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

          <label htmlFor="equipment">Appliances:</label>
          {appliances.map((appliance, index) => (
            <div key={index}>
              <label htmlFor={`appliance-${index}`}>{appliance.name}:</label>
              <input
                type="number"
                id={`appliance-${index}`}
                value={equipment[index]}
                onChange={(e) => handleEquipmentChange(index, e.target.value)}
                placeholder={`Enter number of ${appliance.name}s`}
              />
            </div>
          ))}

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
