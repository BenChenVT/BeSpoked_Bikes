import React from 'react';
import '../App.css'
import { db } from '../config/firebase'
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';


const Salesperson = () => {

  let navigate = useNavigate();
  const [salesperson, setSalesperson] = React.useState([]);
  const customerRef = collection(db, "salesperson");

  React.useEffect(() => {
    const getCustomers = async () => {
      const data = await getDocs(customerRef);
      setSalesperson(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getCustomers()
  }, [])


    return (
      <div>
        <button
          className="greenButton"
          onClick={() => { navigate(`/home/${String(auth.lastNotifiedUid)}`) }}>
          Home
        </button>
        {salesperson.map((salesperson) => {
          return (
            <div key={salesperson.id} className="productCard">
              <div>First Name: {salesperson.firstName}</div>
              <div>Last Name: {salesperson.lastName}</div>
              <div>Address: {salesperson.address}</div>
              <div>Phone: {salesperson.phone}</div>
              <div>From: {new Date(salesperson.startDate).toLocaleDateString("en-US")}</div>
              {salesperson.isTerminated ? 
                <div>To: {new Date(salesperson.terminationDate)
                  .toLocaleDateString("en-US")}</div> : <div>To: Now</div>}
              <div>Manager: {salesperson.manager}</div>
              <button onClick={() => { navigate(`/home/EditSalesperson/${String(salesperson.id)}`) }}>Edit</button>
            </div>
          )
        })}
      </div>
    )
}

export default Salesperson;