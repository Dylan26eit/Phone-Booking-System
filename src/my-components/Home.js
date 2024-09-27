import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Import all dependencies, other Components
import FormCustomerDetail from './FormCustomerDetail';
import FormRepairDetail from './FormRepairDetail';
import FormCourtesyPhone from './FormCourtesyPhone';
import FormCost from './FormCost';
import FormButtons from './FormButtons';
import ReviewModal from './ReviewModal'; // Import the modal component

function Home() {
    // Parent Component "Home"
    const [customerType, setCustomerType] = useState('customer');
    const [sharedBond, setSharedBond] = useState(0);
    const [sharedWarranty, setSharedWarranty] = useState(false);

    const updateCustomerType = (type) => setCustomerType(type);
    const updateSharedState = (value) => setSharedBond(value);
    const updateWarranty = (value) => {
        setSharedWarranty(value);
    };

    // Invoice stuff
    const [customerDetails, setCustomerDetails] = useState({});
    const [repairDetails, setRepairDetails] = useState({});
    const [courtesyPhoneDetails, setCourtesyPhoneDetails] = useState({});
    const [costDetails, setCostDetails] = useState({
        bond: 0,
        serviceFee: 0,
        total: 0,
        gst: 0,
        totalWithGst: 0,
    });

    const navigate = useNavigate();

    // State for the modal
    const [showModal, setShowModal] = useState(false);

    // Function to handle form submission
    const handleFormSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        setShowModal(true); // Show the modal for review
    };

    // Function to handle modal close (edit details)
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Function to handle modal confirm (submit form)
    const handleConfirmModal = () => {
        setShowModal(false);
        // Proceed with form submission
        const formData = {
            customerDetails,
            repairDetails,
            courtesyPhoneDetails,
            costDetails,
            jobNumber: generateJobNumber(),
            invoiceDate: new Date(),
        };
        navigate('/invoice', { state: { formData } });
    };

    const generateJobNumber = () => {
        let jobNumber = localStorage.getItem('jobNumber');
        jobNumber = jobNumber ? parseInt(jobNumber) + 1 : 1;
        localStorage.setItem('jobNumber', jobNumber);
        return jobNumber;
    };

    // Update functions with useCallback to prevent unnecessary re-renders
    const updateCustomerDetails = useCallback((newData) => {
        setCustomerDetails((prevDetails) => ({ ...prevDetails, ...newData }));
    }, []);

    const updateRepairDetails = useCallback((newData) => {
        setRepairDetails((prevDetails) => ({ ...prevDetails, ...newData }));
    }, []);

    const updateCourtesyPhoneDetails = useCallback((newData) => {
        setCourtesyPhoneDetails((prevDetails) => ({ ...prevDetails, ...newData }));
    }, []);

    const updateCostDetails = useCallback((newData) => {
        setCostDetails((prevDetails) => ({ ...prevDetails, ...newData }));
    }, []);

    // Component UI: HTML Rendering
    return (
        <>
            <form className="row w-100 m-0" style={{ minHeight: '60vh', overflowX: 'hidden' }} onSubmit={handleFormSubmit}>
                {/* Customer Details */}
                <div className="col-12 col-lg-4 p-4 m-0" style={{ minHeight: '30vh', backgroundColor: '#FCF3CF' }}>
                    <FormCustomerDetail
                        passDataToParent={updateCustomerType}
                        updateCustomerDetails={updateCustomerDetails}
                    />
                </div>
                {/* Repair Details */}
                <div className="col-12 col-lg-4 p-4 m-0" style={{ minHeight: '30vh', backgroundColor: '#D5F5E3' }}>
                    <FormRepairDetail passDataToParent={updateWarranty} updateRepairDetails={updateRepairDetails} />
                </div>
                {/* Courtesy Phone & Cost */}
                <div className="col-12 col-lg-4 p-0 m-0" style={{ backgroundColor: '#EDBB99' }}>
                    <div className="p-4" style={{ minHeight: '30vh', backgroundColor: '#2874A6' }}>
                        <FormCourtesyPhone
                            passDataToParent={updateSharedState}
                            updateCourtesyPhoneDetails={updateCourtesyPhoneDetails}
                        />
                    </div>
                    <div className="p-4" style={{ minHeight: '20vh', backgroundColor: '#EDBB99' }}>
                        <FormCost
                            sharedPropBond={sharedBond}
                            sharedPropWarranty={sharedWarranty}
                            customerType={customerType}
                            updateCostDetails={updateCostDetails}
                        />
                    </div>
                </div>
                {/* Button Area */}
                <div className="p-4 text-center w-100" style={{ minHeight: '10vh', backgroundColor: '#EDBB99' }}>
                    <FormButtons />
                </div>
            </form>

            {/* Review Modal */}
            <ReviewModal
                show={showModal}
                handleClose={handleCloseModal}
                handleConfirm={handleConfirmModal}
                formData={{ customerDetails, repairDetails, courtesyPhoneDetails, costDetails }}
            />
        </>
    );
}

export default Home;
