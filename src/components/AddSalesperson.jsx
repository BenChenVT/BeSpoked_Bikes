import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { db } from '../config/firebase'
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';

const AddSalesperson = () => {

  let navigate = useNavigate();
  const [salesperson, setSalesperson] = React.useState({ 
    firstName: '', lastName: '', address: '', manager: '', 
    phone:0, startDate:'', terminationDate:'', isTerminated:false });

  const createNewSalesperson = async () => {
    const salepersonRef = collection(db, "salesperson");
    const newSalesperson = salesperson;
    addDoc(salepersonRef, newSalesperson);
  }


  //-------------------- handle duplicate---------------------
  // this section of code is dealing with duplicate item,
  // if the name of the product is duplicated, then we
  // will find it in the firestore
  const salesPRef = collection(db, "salesperson");
  const [salespersonLookUp, setLookUp] = React.useState([]);
  React.useEffect(() => {
    const qProduct = query(salesPRef, 
      where("firstName", "==", String(salesperson.firstName)), 
      where("lastName", "==", String(salesperson.lastName)));
    const getQuerySalesp = async () => {
      const salesperson_item = await getDocs(qProduct);
      setLookUp(salesperson_item.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })));
    }
    getQuerySalesp();
    // console.log(productLookUp)
    // productLookUp.length will be 1 if there is a duplicate item
  }, [salesperson]) // this product is user input

  const checkDuplicate = () => {
    return salespersonLookUp.length === 0 ? true : false
  }

  const handleSubmit = (event) => {
    if(checkDuplicate()){
      event.preventDefault();
      createNewSalesperson();
      navigate(`/home/${String(auth.lastNotifiedUid)}`);
    }
    else{
      alert("This salesperson already exists. No duplicate Please.");
      setLookUp([]);
    }
    
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSalesperson((prevFormData => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value
    })))
  }

  return (
    <div className="addSale">
      <h1>You are editing salesperson {salesperson.firstName}'s profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label>First Name:&nbsp;</label>
          <input
            type="text"
            id="firstName"
            placeholder='i.e. Ben'
            name="firstName"
            value={salesperson.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Last Name:&nbsp;</label>
          <input
            type="text"
            id="lastName"
            placeholder='i.e. Chen'
            name="lastName"
            value={salesperson.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Address:&nbsp;</label>
          <input
            type="text"
            id="address"
            placeholder='i.e. Atlanta'
            name="address"
            value={salesperson.address}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Phone:&nbsp;</label>
          <input
            type="number"
            placeholder='please type a number'
            id="phone"
            name="phone"
            value={salesperson.phone}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Start Date:&nbsp;</label>
          <input
            type="text"
            id="startDate"
            placeholder='i.e. 2022-01-23'
            name="startDate"
            value={salesperson.startDate}
            onChange={handleChange}
          />
        </div>
        {salesperson.isTerminated ? <div className="input">
          <label>Termination Date:&nbsp;</label>
          <input
            type="text"
            id="terminationDate"
            placeholder='i.e. 2023-2-25'
            name="terminationDate"
            value={salesperson.terminationDate}
            onChange={handleChange}
          />
        </div> : <div className="input">
          <label>He is an active salesperson&nbsp;</label>
        </div>}
        <div className="input">
          <label>Has Terminated:&nbsp;</label>
          <input
            type="checkbox"
            id="isTerminated"
            name="isTerminated"
            checked={salesperson.isTerminated}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Manager:&nbsp;</label>
          <input
            type="text"
            id="manager"
            placeholder='i.e. Mr. K'
            name="manager"
            value={salesperson.manager}
            onChange={handleChange}
          />
        </div>
        <button className="greenButton" type="submit">Add</button>
        <button 
          className="redButton" 
          onClick={() => { navigate(`/home/${String(auth.lastNotifiedUid)}`) }}>
            Discard
        </button>
      </form>
    </div>
  )
}

export default AddSalesperson;