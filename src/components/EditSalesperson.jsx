import React from 'react';
import '../App.css'
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../config/firebase'
import { getDoc, updateDoc, doc } from 'firebase/firestore';

const EditSalesperson = () => {

  let navigate = useNavigate();
  const [salesperson, setSalesperson] = React.useState({
    firstName: '',
    lastName: '',
    address: '',
    isTerminated: false,
    manager:'',
    phone:0,
    startDate:'',
    terminationDate:''
  });
  const Id = useParams();
  const id = String(Id.SalespersonId);

  React.useEffect(() => {
    const getSalesperson = async () => {
      const docRef = doc(db, "salesperson", id);
      const docSnap = await getDoc(docRef);
      setSalesperson((prevPerson) => ({
        ...prevPerson,
        firstName: String(docSnap.data().firstName),
        lastName: String(docSnap.data().lastName),
        address: String(docSnap.data().address),
        phone: Number(docSnap.data().phone),
        startDate: String(docSnap.data().startDate),
        terminationDate: String(docSnap.data().terminationDate),
        isTerminated: Boolean(docSnap.data().isTerminated),
        manager: String(docSnap.data().manager)
      }))
    }
    getSalesperson()
  }, [])


  const updateSalesperson = async () => {
    const changeRef = doc(db, "salesperson", id);
    const newSalesperson = salesperson;
    const changeSnap = await updateDoc(changeRef, newSalesperson);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSalesperson();
    navigate(`/home/salesperson`);
  };

  const handleChange = (event) => {
    const {name, value, type, checked} = event.target;
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
            name="manager"
            value={salesperson.manager}
            onChange={handleChange}
          />
        </div>
        <button className="greenButton" type="submit">Submit</button>
        <button className="greenButton" onClick={() => { navigate(`/home/salesperson`) }}>Cancel</button>
      </form>
    </div>
  )
}

export default EditSalesperson;