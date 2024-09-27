import React, { useEffect, useState, useCallback } from 'react';

// Function Component
function FormRepairDetail({ passDataToParent, updateRepairDetails }) {
    const [repairData, setRepairData] = useState({
        purchaseDate: '',
        repairDate: '',
        repairTime: '',
        warranty: false,
        imei: '',
        make: 'apple',
        modelNumber: '',
        faultCategory: 'screen',
        description: '',
        image: null,
    });

    const [purchaseDateMax, setPurchaseDateMax] = useState('');
    const [repairDateMin, setRepairDateMin] = useState('');
    const [isWarrantyDisabled, setIsWarrantyDisabled] = useState(false);

    // Function to handle image selection
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type (optional)
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file');
                return;
            }

            // Read the file using FileReader
            const reader = new FileReader();
            reader.onloadend = () => {
                setRepairData((prevData) => {
                    const newData = { ...prevData, image: reader.result };
                    updateRepairDetails(newData); // Pass the updated data to the parent
                    return newData;
                });
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        // Set max for purchaseDate to today
        const today = new Date().toISOString().split('T')[0];
        setPurchaseDateMax(today);

        // Set min for repairDate to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setRepairDateMin(tomorrow.toISOString().split('T')[0]);
        if (repairData.repairDate) {
            // Generate a random time between 8 AM and 3 PM
            const randomHour = Math.floor(Math.random() * (15 - 8 + 1)) + 8; // Random hour between 8 and 15
            const randomMinute = Math.floor(Math.random() * 60); // Random minute between 0 and 59
            const repairTime = `${String(randomHour).padStart(2, '0')}:${String(randomMinute).padStart(2, '0')}`;

            setRepairData((prevData) => {
                const newData = { ...prevData, repairTime };
                updateRepairDetails(newData); // Update parent with new repair data
                return newData;
            });
        }
    }, [repairData.repairDate, updateRepairDetails]);

    useEffect(() => {
        if (repairData.repairDate) {
            // Generate a random time between 8 AM and 3 PM
            const randomHour = Math.floor(Math.random() * (15 - 8 + 1)) + 8; // Random hour between 8 and 15
            const randomMinute = Math.floor(Math.random() * 60); // Random minute between 0 and 59
            const repairTime = `${String(randomHour).padStart(2, '0')}:${String(randomMinute).padStart(2, '0')}`;

            setRepairData((prevData) => {
                const newData = { ...prevData, repairTime };
                updateRepairDetails(newData); // Update parent with new repair data
                return newData;
            });
        }
    }, [repairData.repairDate, updateRepairDetails]);

    const handleInputChange = useCallback(
        (event) => {
            const { id, value, type, checked } = event.target;
            const newValue = type === 'checkbox' ? checked : value;

            setRepairData((prevData) => {
                const newData = { ...prevData, [id]: newValue };

                // If the warranty checkbox changed, pass the value up to the parent
                if (id === 'warranty') {
                    passDataToParent(newValue);
                }

                // Update the parent with the new repair details
                updateRepairDetails(newData);
                return newData;
            });
        },
        [passDataToParent, updateRepairDetails]
    );

    useEffect(() => {
        const checkWarranty = () => {
            const purchaseDate = new Date(repairData.purchaseDate);
            const twoYearsAgo = new Date();
            twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

            if (purchaseDate < twoYearsAgo) {
                setIsWarrantyDisabled(true);
                // Uncheck warranty if it was checked
                if (repairData.warranty) {
                    handleInputChange({
                        target: { id: 'warranty', type: 'checkbox', checked: false },
                    });
                }
            } else {
                setIsWarrantyDisabled(false);
            }
        };

        if (repairData.purchaseDate) {
            checkWarranty();
        }
    }, [repairData.purchaseDate, handleInputChange, repairData.warranty]);



    // Component UI: HTML Rendering
    return (
        <>
            <h2>Repair Details</h2>
            {/* Purchase Date */}
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Purchase Date: *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="date"
                    id="purchaseDate"
                    required
                    max={purchaseDateMax}
                    value={repairData.purchaseDate}
                    onChange={handleInputChange}
                />
            </div>
            {/* Repair Date */}
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Repair Date: *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="date"
                    id="repairDate"
                    required
                    min={repairDateMin}
                    value={repairData.repairDate}
                    onChange={handleInputChange}
                />
            </div>
            {/* Warranty Checkbox */}
            <div className="row">
                <fieldset className="border border-primary col-12 col-lg-11 ms-1 me-4 mb-3">
                    <legend className="col-11 float-none w-auto">Under Warranty</legend>
                    <div>
                        <label className="col-12 col-md-12 col-lg-4">Warranty:</label>
                        <input
                            type="checkbox"
                            id="warranty"
                            onChange={handleInputChange}
                            checked={repairData.warranty}
                            disabled={isWarrantyDisabled}
                        />
                    </div>
                </fieldset>
            </div>
            {/* IMEI Number */}
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">IMEI Number: *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    id="imei"
                    minLength={15}
                    maxLength={15}
                    pattern="\d{15}"
                    title="IMEI number must be 15 digits long"
                    required
                    onInvalid={(e) => e.target.setCustomValidity('IMEI number must be 15 digits long')}
                    onInput={(e) => e.target.setCustomValidity('')}
                    value={repairData.imei}
                    onChange={handleInputChange}
                />
            </div>
            {/* Make */}
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Make: *</label>
                <select
                    className="col-12 col-md-12 col-lg-7"
                    id="make" // Changed from "makeList" to "make"
                    value={repairData.make}
                    onChange={handleInputChange}
                >
                    <option value="apple">Apple</option>
                    <option value="lg">LG</option>
                    <option value="motorola">Motorola</option>
                    <option value="nokia">Nokia</option>
                    <option value="samsung">Samsung</option>
                    <option value="sony">Sony</option>
                    <option value="other">Other</option>
                </select>
            </div>
            {/* Model Number */}
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Model Number:</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    id="modelNumber"
                    value={repairData.modelNumber}
                    onChange={handleInputChange}
                />
            </div>
            {/* Fault Category */}
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Fault Category: *</label>
                <select
                    className="col-12 col-md-12 col-lg-7"
                    id="faultCategory" // Changed from "faultList" to "faultCategory"
                    value={repairData.faultCategory}
                    onChange={handleInputChange}
                >
                    <option value="screen">Screen</option>
                    <option value="battery">Battery</option>
                    <option value="camera">Camera</option>
                    <option value="speaker">Speaker</option>
                    <option value="charging">Charging</option>
                    <option value="other">Other</option>
                </select>
            </div>
            {/* Description */}
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Description *</label>
                <textarea
                    className="col-12 col-md-12 col-lg-7"
                    id="description"
                    required
                    value={repairData.description}
                    onChange={handleInputChange}
                ></textarea>
            </div>
            {/* Image Upload */}
            <div className="row mt-3">
                <label className="col-12 col-md-12 col-lg-4">Upload Image:</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>

            {/* Display Image Preview */}
            {repairData.image && (
                <div className="row mt-3">
                    <div className="col-12 col-md-12 col-lg-4">Image Preview:</div>
                    <div className="col-12 col-md-12 col-lg-7">
                        <img
                            src={repairData.image}
                            alt="Repair Device"
                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default FormRepairDetail;
