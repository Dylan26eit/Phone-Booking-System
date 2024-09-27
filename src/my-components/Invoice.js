import { useLocation } from 'react-router-dom';

function Invoice() {
    const location = useLocation();
    const formData = location.state?.formData;

    if (!formData) {
        return <div>No data available</div>;
    }

    const {
        customerDetails,
        repairDetails,
        courtesyPhoneDetails,
        costDetails,
        jobNumber,
        invoiceDate,
    } = formData;

    // In Invoice.js
const formatDateTime12 = (dateInput, timeStr) => {
    let dateObj;

    if (dateInput instanceof Date) {
        dateObj = dateInput; // dateInput is already a Date object
    } else if (typeof dateInput === 'string' && timeStr) {
        // Parse date and time strings into components
        const [year, month, day] = dateInput.split('-').map(Number);
        const [hours, minutes] = timeStr.split(':').map(Number);

        // Create Date object in local time
        dateObj = new Date(year, month - 1, day, hours, minutes);
    } else if (typeof dateInput === 'string') {
        // Parse date string into components
        const [year, month, day] = dateInput.split('-').map(Number);
        dateObj = new Date(year, month - 1, day);
    } else {
        return 'Invalid Date';
    }

    if (isNaN(dateObj)) return 'Invalid Date';

    let formattedDate = dateObj.toDateString();

    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const strTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    formattedDate += ` ${strTime}`;

    return formattedDate;
};


    const repairDateTime12 = formatDateTime12(
        repairDetails.repairDate,
        repairDetails.repairTime
    );

    const invoiceDateTime12 = formatDateTime12(invoiceDate);

    const warrantySymbol = repairDetails.warranty ? '✔' : '✖';

    const courtesyList = [
        { id: 0, type: 'none', name: 'None', bond: 0 },
        { id: 1, type: 'phone', name: 'Iphone', bond: 275 },
        { id: 2, type: 'phone', name: 'Samsung galaxy', bond: 100 },
        { id: 3, type: 'phone', name: 'Nokia', bond: 100 },
        { id: 4, type: 'charger', name: 'Iphone charger', bond: 30 },
        { id: 5, type: 'charger', name: 'Samsung charger', bond: 30 },
        { id: 6, type: 'charger', name: 'Nokia charger', bond: 30 },
    ];

    const getCourtesyItemName = (id) => {
        const item = courtesyList.find((item) => item.id === id);
        return item ? item.name : 'None';
    };

    return (
        <div style={{ minHeight: '60vh', color: 'black', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', padding: '20px' }}>
            <div
                style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                {/* Business Header */}
                <div style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '2px solid #333', paddingBottom: '20px' }}>
                    <h1 style={{ margin: '0', fontSize: '28px', fontWeight: 'bold' }}>Dylan's Awesome Repairs</h1>
                    <p style={{ margin: '5px 0' }}>123 Emerson Street, Napier, New Zealand</p>
                    <p style={{ margin: '5px 0' }}>Phone: (123) 456-7890 | Email: info@DylansRepairs.com</p>
                </div>

                {/* Invoice Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div>
                        <h2 style={{ margin: '0', fontSize: '22px' }}>Repair Booking Job Sheet</h2>
                        <p style={{ margin: '5px 0' }}>Job Number: {jobNumber}</p>
                        <p style={{ margin: '5px 0' }}>Invoice Date: {invoiceDateTime12}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <h2 style={{ margin: '0', fontSize: '22px', fontWeight: 'bold' }}>Amount Due</h2>
                        <p style={{ fontSize: '22px', fontWeight: 'bold' }}>${costDetails.totalWithGst.toFixed(2)}</p>
                    </div>
                </div>

                {/* Customer Details */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Customer Details</h3>
                    <p style={{ margin: '5px 0' }}>
                        {customerDetails.title} {customerDetails.firstName} {customerDetails.lastName}<br />
                        {customerDetails.street}, {customerDetails.suburb}, {customerDetails.city}, {customerDetails.postcode}<br />
                        Phone: {customerDetails.phoneNumber}<br />
                        Email: {customerDetails.email}
                    </p>
                </div>

                {/* Repair Details */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Repair Details</h3>
                    <p style={{ margin: '5px 0' }}>
                        Purchase Date: {repairDetails.purchaseDate}<br />
                        Repair Date/Time: {repairDateTime12}<br />
                        Warranty: {warrantySymbol}<br />
                        IMEI Number: {repairDetails.imei}<br />
                        Make: {repairDetails.make}<br />
                        Model Number: {repairDetails.modelNumber}<br />
                        Fault Category: {repairDetails.faultCategory}<br />
                        Description: {repairDetails.description}
                    </p>
                </div>

                {/* Courtesy Phone Details */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Courtesy Phone Details</h3>
                    <p style={{ margin: '5px 0' }}>
                        Phone Borrowed: {getCourtesyItemName(courtesyPhoneDetails.phoneBorrow)}<br />
                        Charger Borrowed: {getCourtesyItemName(courtesyPhoneDetails.chargerBorrow)}
                    </p>
                </div>

                {/* Cost Details */}
                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Cost Details</h3>
                    <p style={{ margin: '5px 0' }}>
                        Bond: ${costDetails.bond.toFixed(2)}<br />
                        Service Fee: ${costDetails.serviceFee.toFixed(2)}<br />
                        Total: ${costDetails.total.toFixed(2)}<br />
                        GST: ${costDetails.gst.toFixed(2)}<br />
                        Total (incl. GST): ${costDetails.totalWithGst.toFixed(2)}
                    </p>
                </div>

                {/* Footer */}
                <div style={{ textAlign: 'center', borderTop: '2px solid #333', paddingTop: '10px', fontSize: '12px' }}>
                    <p style={{ margin: '0' }}>Thank you for your business!</p>
                    <p style={{ margin: '5px 0' }}>Dylan's Awesome Reapirs | 123 Emerson Street | Contact Us: (123) 456-7890</p>
                </div>
            </div>
        </div>
    );
}

export default Invoice;
