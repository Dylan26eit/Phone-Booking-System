// FormCourtesyPhone2.js
import React, { useState, useEffect } from 'react';
import DraggableItem from './DraggableItem';
import DropZone from './DropZone';

// Define the courtesy list outside the component to prevent re-creation on each render
const courtesyList = [
  { id: 1, type: 'phone', name: 'iPhone 10', bond: 275 }, 
  { id: 2, type: 'phone', name: 'iPhone 14', bond: 300 }, 
  { id: 3, type: 'phone', name: 'iPhone 16', bond: 500 }, 
  { id: 4, type: 'phone', name: 'Samsung Galaxy', bond: 200 }, 
  { id: 5, type: 'phone', name: 'Nokia', bond: 150 }, 
  { id: 6, type: 'phone', name: 'Xiaomi', bond: 100 },
  { id: 7, type: 'charger', name: 'iPhone Charger', bond: 45 }, 
  { id: 8, type: 'charger', name: 'Samsung Charger', bond: 30 }, 
  { id: 9, type: 'charger', name: 'Nokia Charger', bond: 25 }, 
  { id: 10, type: 'charger', name: 'Xiaomi Charger', bond: 25 } // Renamed for clarity
];

function FormCourtesyPhone2({ passDataToParent, updateCourtesyPhoneDetails }) {
  // Declare state variables
  const [phoneBorrow, setPhoneBorrow] = useState(null); // null represents 'none'
  const [chargerBorrow, setChargerBorrow] = useState(null); // null represents 'none'

  // Handle drop for phone
  const handlePhoneDrop = (item) => {
    const phone = courtesyList.find((c) => c.id === item.id && c.type === 'phone');
    if (phone) {
      setPhoneBorrow(phone);
    } else {
      console.warn(`Dropped item is not a phone: ${item.name}`);
    }
  };

  // Handle drop for charger
  const handleChargerDrop = (item) => {
    const charger = courtesyList.find((c) => c.id === item.id && c.type === 'charger');
    if (charger) {
      setChargerBorrow(charger);
    } else {
      console.warn(`Dropped item is not a charger: ${item.name}`);
    }
  };

  // Handle removal of phone
  const handleRemovePhone = () => {
    setPhoneBorrow(null);
  };

  // Handle removal of charger
  const handleRemoveCharger = () => {
    setChargerBorrow(null);
  };

  // useEffect to update bond and notify parent components whenever selections change
  useEffect(() => {
    const phoneBond = phoneBorrow ? phoneBorrow.bond : 0;
    const chargerBond = chargerBorrow ? chargerBorrow.bond : 0;
    const totalBond = phoneBond + chargerBond; // Total bond of both items
    console.log(`Total Bond: ${totalBond}`);
    passDataToParent(totalBond); // Send the total bond to the parent (Home.js)
    updateCourtesyPhoneDetails({
      phoneBorrow: phoneBorrow ? phoneBorrow.id : 0,
      chargerBorrow: chargerBorrow ? chargerBorrow.id : 0,
    });
  }, [phoneBorrow, chargerBorrow, passDataToParent, updateCourtesyPhoneDetails]);

  // Prepare lists for draggable items
  const phoneItems = courtesyList.filter((item) => item.type === 'phone');
  const chargerItems = courtesyList.filter((item) => item.type === 'charger');

  return (
    <div>
      <h2>Courtesy Phone Selection</h2>

      <div className="row mt-4">
        {/* Draggable Phones */}
        <div className="col-md-6">
          <h4>Available Phones</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {phoneItems.map((phone) => (
              <DraggableItem key={phone.id} item={phone} type="phone" />
            ))}
          </div>
        </div>

        {/* Draggable Chargers */}
        <div className="col-md-6">
          <h4>Available Chargers</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {chargerItems.map((charger) => (
              <DraggableItem key={charger.id} item={charger} type="charger" />
            ))}
          </div>
        </div>
      </div>

      <div className="row mt-4">
        {/* Drop Zone for Phone */}
        <div className="col-md-6">
          <h4>Selected Phone</h4>
          <DropZone
            onDrop={handlePhoneDrop}
            acceptedTypes={['phone']}
            currentItem={phoneBorrow}
            label="Phone"
            onRemove={handleRemovePhone}
          />
          {phoneBorrow && (
            <button className="btn btn-danger mt-2" onClick={handleRemovePhone}>
              Remove Selected Phone
            </button>
          )}
        </div>

        {/* Drop Zone for Charger */}
        <div className="col-md-6">
          <h4>Selected Charger</h4>
          <DropZone
            onDrop={handleChargerDrop}
            acceptedTypes={['charger']}
            currentItem={chargerBorrow}
            label="Charger"
            onRemove={handleRemoveCharger}
          />
          {chargerBorrow && (
            <button className="btn btn-danger mt-2" onClick={handleRemoveCharger}>
              Remove Selected Charger
            </button>
          )}
        </div>
      </div>

      {/* Display Selected Items and Bond */}
      <div className="row mt-4">
        <div className="col-12">
          <h4>Selected Items</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Item</th>
                <th>Cost ($)</th>
              </tr>
            </thead>
            <tbody>
              {phoneBorrow && (
                <tr>
                  <td>{phoneBorrow.name}</td>
                  <td>{phoneBorrow.bond}</td>
                </tr>
              )}
              {chargerBorrow && (
                <tr>
                  <td>{chargerBorrow.name}</td>
                  <td>{chargerBorrow.bond}</td>
                </tr>
              )}
              <tr>
                <td><strong>Total Bond</strong></td>
                <td>
                  <strong>
                    {phoneBorrow && chargerBorrow
                      ? phoneBorrow.bond + chargerBorrow.bond
                      : phoneBorrow
                      ? phoneBorrow.bond
                      : chargerBorrow
                      ? chargerBorrow.bond
                      : 0}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FormCourtesyPhone2;