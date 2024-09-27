// ReviewModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ReviewModal({ show, handleClose, handleConfirm, formData }) {
  const {
    customerDetails,
    repairDetails,
    courtesyPhoneDetails,
    costDetails,
  } = formData;

  const courtesyList = [
    { id: 0, type: 'none', name: 'None', bond: 0 },
    { id: 1, type: 'phone', name: 'Iphone', bond: 275 },
    { id: 2, type: 'phone', name: 'Samsung Galaxy', bond: 100 },
    { id: 3, type: 'phone', name: 'Nokia', bond: 100 },
    { id: 4, type: 'charger', name: 'Iphone Charger', bond: 30 },
    { id: 5, type: 'charger', name: 'Samsung Charger', bond: 30 },
    { id: 6, type: 'charger', name: 'Nokia Charger', bond: 30 },
  ];

  const getCourtesyItemName = (id) => {
    const item = courtesyList.find((item) => item.id === parseInt(id, 10));
    return item ? item.name : 'None';
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Review Booking Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Display the booking details here */}
        <h5>Customer Details</h5>
        <p>
          {customerDetails.title} {customerDetails.firstName} {customerDetails.lastName}<br />
          {customerDetails.street}, {customerDetails.suburb}, {customerDetails.city}, {customerDetails.postcode}<br />
          Phone: {customerDetails.phoneNumber}<br />
          Email: {customerDetails.email}
        </p>

        <h5>Repair Details</h5>
        <p>
          Purchase Date: {repairDetails.purchaseDate}<br />
          Repair Date: {repairDetails.repairDate}<br />
          Warranty: {repairDetails.warranty ? 'Yes' : 'No'}<br />
          IMEI Number: {repairDetails.imei}<br />
          Make: {repairDetails.make}<br />
          Model Number: {repairDetails.modelNumber}<br />
          Fault Category: {repairDetails.faultCategory}<br />
          Description: {repairDetails.description}
        </p>

        <h5>Courtesy Phone Details</h5>
        <p>
        Phone Borrowed: {getCourtesyItemName(courtesyPhoneDetails.phoneBorrow)}<br />
        Charger Borrowed: {getCourtesyItemName(courtesyPhoneDetails.chargerBorrow)}
        </p>

        <h5>Cost Details</h5>
        <p>
          Bond: ${costDetails.bond.toFixed(2)}<br />
          Service Fee: ${costDetails.serviceFee.toFixed(2)}<br />
          Total: ${costDetails.total.toFixed(2)}<br />
          GST: ${costDetails.gst.toFixed(2)}<br />
          Total (incl. GST): ${costDetails.totalWithGst.toFixed(2)}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Edit Details
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm and Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReviewModal;
