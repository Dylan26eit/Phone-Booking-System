import { useEffect } from 'react';

//Function Component
function FormCost(props) {
    // Helper function to format numbers as currency
    const { sharedPropBond, sharedPropWarranty, customerType, updateCostDetails } = props;
    const formatCurrency = (value) => {
        return `$${parseFloat(value).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    const bond = customerType === 'business' ? 0 : sharedPropBond;
    const serviceFee = sharedPropWarranty ? 0 : 85;
    const total = bond + serviceFee;
    const gst = total * 0.15;
    const totalWithGst = total + gst;


    useEffect(() => {
        updateCostDetails({ bond, serviceFee, total, gst, totalWithGst });
    }, [bond, serviceFee, total, gst, totalWithGst, updateCostDetails]);



    //Component UI: HTML Rendering
    return (
        <>
            <h2>Cost</h2>
            <div className="row mt-2 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Bond:</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" value={formatCurrency(bond)} id="bond" readOnly />
            </div>
            <div className="row mt-1 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Service Fee:</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" id="serviceFee" value={formatCurrency(serviceFee)} readOnly />
            </div>
            <div className="row mt-1 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Total:</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" id="totalFee" value={formatCurrency(total)} readOnly />
            </div>
            <div className="row mt-1 ms-3">
                <label className="col-12 col-md-12 col-lg-4">GST:</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" id="gst" value={formatCurrency(gst)} readOnly />
            </div>
            <div className="row mt-1 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Total(+GST):</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" id="total" value={formatCurrency(totalWithGst)} readOnly />
            </div>
        </>
    );
}

//Export this component to the entire app, can be re-used or hooked into other Components
export default FormCost;
