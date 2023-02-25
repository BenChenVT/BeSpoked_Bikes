import React from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

const CreateSale = () => {

    let navigate = useNavigate();
    const [sale, setSale] = React.useState({product: '', salesperson:'', customer:'', saleDate:''});


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`${sale.product}, ${sale.salesperson}, ${sale.customer}, ${sale.saleDate}`);
    };

    const handleChange = (event) => {
        setSale((prevFormData => ({
            ...prevFormData,
            [event.target.name]: event.target.value
        })))
    }

    return (
        <div className="addSale">
            <h1>Add a new sale, please put information below</h1>
            <form onSubmit={handleSubmit}>
                <div className="input">
                    <label>Product:&nbsp;</label>
                    <input
                        type="text"
                        id="product"
                        name="product"
                        value={sale.product}
                        onChange={handleChange}
                    />
                </div>
                <div className="input">
                    <label>Salesperson:&nbsp;</label>
                    <input
                        type="text"
                        id="salesperson"
                        name="salesperson"
                        value={sale.salesperson}
                        onChange={handleChange}
                    />
                </div>
                <div className="input">
                    <label>Customer:&nbsp;</label>
                    <input
                        type="text"
                        id="customer"
                        name="customer"
                        value={sale.customer}
                        onChange={handleChange}
                    />
                </div>
                <div className="input">
                    <label>Sale Date:&nbsp;</label>
                    <input
                        type="text"
                        id="saleDate"
                        name="saleDate"
                        value={sale.saleDate}
                        onChange={handleChange}
                    />
                </div>
                <button className="greenButton" type="submit">Submit</button>
                <button className="greenButton" onClick={() => { navigate(`/home/${String(auth.lastNotifiedUid)}`) }}>Cancel</button>
            </form>
        </div>

    )
}

export default CreateSale;