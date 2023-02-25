import React from 'react';
import '../App.css'
import { db } from '../config/firebase'
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';


const Sale = () => {

  let navigate = useNavigate();
  const [sales, setSales] = React.useState([]);
  const saleRef = collection(db, "sales");

  React.useEffect(()=>{
    const getSales = async () => {
      const data = await getDocs(saleRef);
      setSales(data.docs.map((doc) => ({...doc.data(), id: doc.id})));         
    }
    getSales()
  }, [])

  return (
    <div>
      <button 
        className="greenButton" 
        onClick={() => { navigate(`/home/${String(auth.lastNotifiedUid)}`) }}>
          Home
      </button>
      <button
        className="greenButton">
        Filter by Date
      </button>
      {sales.map((sale) => {
        return (
          <div key={sale.id} className="productCard">
            <div>Product: {sale.product}</div>
            <div>Salesperson: {sale.salesperson}</div>
            <div>Customer: {sale.customer}</div>
            <div>Sale Date: {new Date(sale.saleDate).toLocaleDateString("en-US")}</div>
            <button onClick={() => { navigate(`/home/SaleDetail/${String(sale.id)}`) }}>See detail</button>
          </div>
        )
      })}
    </div>
  )
}

export default Sale;