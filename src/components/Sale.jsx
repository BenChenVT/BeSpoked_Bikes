import React from 'react';
import '../App.css'
import { db } from '../config/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

/**
 * this component allow user to see the sales
 */
const Sale = () => {

  // all the hooks initialized
  let navigate = useNavigate();
  const [sales, setSales] = React.useState([]);
  const saleRef = collection(db, "sales");
  const [reverseOrder, setReverseOrder] = React.useState(true);

  React.useEffect(()=>{
    const getSales = async () => {
      const data = await getDocs(saleRef);
      setSales(data.docs.map((doc) => ({
        ...doc.data(), 
        id: doc.id
      })));         
    }
    getSales()
  }, [])

  // ------------- handle to order logic -------------
  const handleOrder = () => {
    const orderQ = reverseOrder ? 
      query(saleRef, orderBy("saleDate")) : 
      query(saleRef, orderBy("saleDate", "desc"));
    const getOrderQuery = async () => {
      const sale_item = await getDocs(orderQ);
      setSales(sale_item.docs.map((doc) => ({
          ...doc.data(), 
          id: doc.id 
        })));
    }
    getOrderQuery();
    reverse();
  }
  
  const reverse = () => {
    setReverseOrder(prevOrder => !prevOrder);
    console.log(reverseOrder);
  }
  // ------------- end of the logic -------------
  
  // renderring this page
  return (
    <div>
      <button 
        className="greenButton" 
        onClick={() => { 
          navigate(`/home/${String(auth.lastNotifiedUid)}`) 
          }}>Home</button>
      <button
        type="button"
        onClick={() => {handleOrder()}}
        className="greenButton">
        Filter by Date {reverseOrder ? "(latest first)" : "(oldest first)"}</button>
      {sales.map((sale) => {
        return (
          <div key={sale.id} className="productCard">
            <div>Sale Date: 
              {new Date(sale.saleDate).toLocaleDateString("en-US")}</div>
            <div>Product: {sale.product}</div>
            <div>Salesperson: {sale.salesperson}</div>
            <div>Customer: {sale.customer}</div>
            <button onClick={() => { 
                navigate(`/home/SaleDetail/${String(sale.id)}`) 
              }}>See detail</button>
          </div>
        )
      })}
    </div>
  )
}

export default Sale;