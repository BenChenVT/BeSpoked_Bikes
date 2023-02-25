import React from 'react';
import '../App.css'
import { db } from '../config/firebase'
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';


const Customer = () => {

  let navigate = useNavigate();
  const [customers, setCustomers] = React.useState([]);
  const customerRef = collection(db, "customers");

  React.useEffect(() => {
    const getCustomers = async () => {
      const data = await getDocs(customerRef);
      setCustomers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
      {customers.map((customer) => {
        return (
          <div key={customer.id} className="productCard">
            <div>First Name: {customer.firstName}</div>
            <div>Last Name: {customer.lastName}</div>
            <div>Address: {customer.address}</div>
            <div>Phone: {customer.phone}</div>
            <div>StartDate: {new Date(customer.startDate).toLocaleDateString("en-US")}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Customer;