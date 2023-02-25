import React from 'react';
import '../App.css';
import { db } from '../config/firebase'
import { collection, getDocs, query, where, getDoc, updateDoc, doc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';


const SaleDetail = () => {

  let navigate = useNavigate();
  const Id = useParams();
  const id = String(Id.SaleId);

  const salespersonRef = collection(db, "salesperson");
  const productRef = collection(db, "products");
  
  const [salesperson_q, setSalesperson] = React.useState([]);
  const [product, setProduct] = React.useState([]); // here we get a query of the Mountain Bike
  
  const [sale, setSale] = React.useState({
    productName: '',
    salesperson: '',
  });

  React.useEffect(() => {
    const getSale = async () => {
      const docRef = doc(db, "sales", id);
      const docSnap = await getDoc(docRef);
      setSale((prevSale) => ({
        ...prevSale,
        productName: String(docSnap.data().product),
        salesperson: String(docSnap.data().salesperson)
      }))
    }
    getSale()
  }, [])

  React.useEffect(() => {
    const qSalesperson = query(salespersonRef, where("firstName", "==", sale.salesperson)); // hard code for now

    const getQuerySalesperson = async () => {
      const saleperson_item = await getDocs(qSalesperson);
      setSalesperson(saleperson_item.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getQuerySalesperson();
  }, [sale.salesperson])


  React.useEffect(() => {
    const qProduct = query(productRef, where("name", "==", sale.productName)); // hard code for now

    const getQueryProduct = async () => {
      const product_item = await getDocs(qProduct);
      setProduct(product_item.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getQueryProduct();
  }, [sale.productName])


  console.log(product[0]?.name);

  // can be simplified by function and map()
  return(
    <div>
      <button className="greenButton" onClick={() => { navigate(`/home/sale`) }}>Back to Sale List</button>
      <div className="saleDetail">
        <div className="item">
          <h3>Product</h3>
        </div>
        <div className="item">
          <h3>Salesperson</h3>
        </div>
        <div className="item">
          <h3>Name: {product[0]?.name}</h3>
        </div>
        <div className="item">
          <h3>First Name: {salesperson_q[0]?.firstName}</h3>
        </div>
        <div className="item">
          <h3>Manufacture: {product[0]?.manufacture}</h3>
        </div>
        <div className="item">
          <h3>Last Name: {salesperson_q[0]?.lastName}</h3>
        </div>
        <div className="item">
          <h3>Style: {product[0]?.style}</h3>
        </div>
        <div className="item">
          <h3>Address: {salesperson_q[0]?.address}</h3>
        </div>
        <div className="item">
          <h3>Sale Price: {product[0]?.salePrice}</h3>
        </div>
        <div className="item">
          <h3>Phone: {salesperson_q[0]?.phone}</h3>
        </div>
        <div className="item">
          <h3>Purchase Price: {product[0]?.purchasePrice}</h3>
        </div>
        <div className="item">
          <h3>Manager: {salesperson_q[0]?.manager}</h3>
        </div>
        <div className="item">
          <h3>Qantity: {product[0]?.Qty}</h3>
        </div>
        <div className="item">
          <h3>Start Date: {salesperson_q[0]?.startDate}</h3>
        </div>
        <div className="item">
          <h3>Commission: ${(product[0]?.salePrice - product[0]?.purchasePrice) * product[0]?.commissionRate}</h3>
        </div>
        <div className="item">
          {salesperson_q[0]?.isTerminated ? <h3>Termination Date: {salesperson_q[0]?.terminationDate}</h3> : <h3>Active SalesPerson</h3>}
        </div>
      </div>
    </div>
    
  )
}

export default SaleDetail;