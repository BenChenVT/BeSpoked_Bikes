import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { db } from '../config/firebase'
import { collection, addDoc } from 'firebase/firestore';


/**
 * This functional component is in charge of create a new sale
 */
const CreateSale = () => {

  // all the hooks initialized
  let navigate = useNavigate();
  const [sale, setSale] = React.useState({
    product: '', 
    salesperson:'', 
    customer:'', 
    saleDate:''});

  const createNewSale = async () => {
    const saleRef = collection(db, "sales");
    const newSale = sale;
    addDoc(saleRef, newSale);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createNewSale();
    navigate(`/home/${String(auth.lastNotifiedUid)}`)
  };

  const handleChange = (event) => {
    setSale((prevFormData => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    })))
  }

  // rendering for create sale page
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
          className="greenButton" type="submit">Add</button>
        <button 
          className="redButton" 
          onClick={() => { navigate(`/home/${String(auth.lastNotifiedUid)}`) }}>Discard</button>
      </form>
    </div>
  )
}

export default CreateSale;