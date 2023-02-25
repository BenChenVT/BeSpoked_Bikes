import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { db } from '../config/firebase'
import { collection, addDoc } from 'firebase/firestore';

const CreateSale = () => {

  let navigate = useNavigate();
  const [sale, setSale] = React.useState({product: '', salesperson:'', customer:'', saleDate:''});

  const createNewSale = async () => {
    const saleRef = collection(db, "sales");
    const newSale = sale;
    addDoc(saleRef, newSale);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createNewSale();
    console.log(`${sale.product}, ${sale.salesperson}, ${sale.customer}, ${sale.saleDate}`);
    navigate(`/home/${String(auth.lastNotifiedUid)}`)
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
            type="date"
            id="saleDate"
            name="saleDate"
            value={sale.saleDate}
            onChange={handleChange}
          />
        </div>
        <button 
          className="greenButton" type="submit">Submit</button>
        <button 
          className="greenButton" 
          onClick={() => { navigate(`/home/${String(auth.lastNotifiedUid)}`) }}>Cancel</button>
      </form>
    </div>
  )
}

export default CreateSale;