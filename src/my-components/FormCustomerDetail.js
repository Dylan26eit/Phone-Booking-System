import { useState } from 'react';

//Function Component
function FormCustomerDetail({ passDataToParent, updateCustomerDetails }) {
    const [customerType, setCustomerType] = useState('customer');
    const [customerData, setCustomerData] = useState({ 
        title: 'Mr',
        firstName: '',
        lastName: '',
        street: '',
        suburb: '',
        city: '',
        postcode: '',
        phoneNumber: '',
        email: '',

    })

    const handleCustomerTypeChange = (event) => {
        setCustomerType(event.target.value);
        passDataToParent(event.target.value); // Pass the selected customer type to the parent
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setCustomerData((prevData) => {
            const newData = { ...prevData, [id]: value };
            updateCustomerDetails(newData);
            return newData;
        });
    };

    //Component UI: HTML Rendering
    return (<>
        <h2>Customer Details</h2>
        {/*Customer type*/}
        <div className="row">
            <fieldset className="border border-primary col-12 col-lg-11 ms-2 me-4">
                <legend className="col-11 float-none w-auto">Customer type *</legend>
                <div>
                    <label className="col-12 col-md-12 col-lg-4">Customer</label>
                    <input type="radio" id="customerType" name="customer-type" value="customer"
                        checked={customerType === 'customer'}
                        onChange={handleCustomerTypeChange} />
                </div>
                <div>
                    <label className="col-12 col-md-12 col-lg-4">Business</label>
                    <input type="radio" id="businessType" name="customer-type" value="business"
                        checked={customerType === 'business'}
                        onChange={handleCustomerTypeChange} />
                </div>
            </fieldset>
        </div>

        {/*Details*/}
        <div className="row mt-2">
            <label className="col-12 col-md-12 col-lg-4">Title *</label>
            <select className="col-12 col-md-12 col-lg-7" id="title" value={customerData.title} onChange={handleInputChange}>
                <option value="Mr" selected>Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Miss">Miss</option>
                <option value="Dr">Dr</option>
            </select>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">First Name: *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" id="firstName" required pattern="[A-Za-z\s\-]+"
                title="First name can only contain letters, spaces, and dashes."
                onInvalid={(e) => e.target.setCustomValidity('Please enter a valid first name. It should only contain letters, spaces, or dashes.')}
                onInput={(e) => e.target.setCustomValidity('')}
                value={customerData.firstName} onChange={handleInputChange} />
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Last Name: *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" id="lastName" required pattern="[A-Za-z\s\-]+"
                title="Last name can only contain letters, spaces, and dashes."
                onInvalid={(e) => e.target.setCustomValidity('Please enter a valid Last name. It should only contain letters, spaces, or dashes.')}
                onInput={(e) => e.target.setCustomValidity('')}
                value={customerData.lastName} onChange={handleInputChange} />
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Street: *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" id="street" required
            value={customerData.street} onChange={handleInputChange} />
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Suburb:</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" id="suburb"
            value={customerData.suburb} onChange={handleInputChange} />
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">City: *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" id="city" required 
            value={customerData.city} onChange={handleInputChange} />
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Post Code:</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" id="postcode" minLength={4} maxLength={4} pattern="\d{4}"
                title="Postcode must be 4 Digits Long"
                onInvalid={(e) => e.target.setCustomValidity('Postcode must be 4 Digits Long')}
                onInput={(e) => e.target.setCustomValidity('')} 
                value={customerData.postcode} onChange={handleInputChange}/>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Phone Number: *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" id="phoneNumber" required pattern="[0-9\s\(\)\-\+]+"
                title="Phone number can only contain numbers, spaces, and the symbols (, ), -, +"
                onInvalid={(e) => e.target.setCustomValidity('Phone number can only contain numbers, spaces, and the symbols (, ), -, +')}
                onInput={(e) => e.target.setCustomValidity('')} 
                value={customerData.phoneNumber} onChange={handleInputChange}/>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Email: *</label>
            <input className="col-12 col-md-12 col-lg-7" type="email" id="email" required
            value={customerData.email} onChange={handleInputChange} />
        </div>
    </>);
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormCustomerDetail; 