import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import { auth } from '../config/firebase';
import BarChart from './BarChart'
import { db } from '../config/firebase'
import { collection, getDocs, query, where, getDoc, doc, deleteDoc } from 'firebase/firestore';

const Commission = () => {

  let navigate = useNavigate();
  const [input, setInput] = React.useState({
    firstName:'', 
    lastName:'',
    startingMonth:''
  });

  const salespersonRef = collection(db, "salesperson");
  const productRef = collection(db, "products");
  const saleRef = collection(db, "sales");

  const [salesperson, setSalesperson] = React.useState([]);
  const [product, setProduct] = React.useState([]);
  const [sale, setSale] = React.useState([]);

  const [result, setResult] = React.useState([{
    commission: 0, 
    products:[], 
    customers:[]
  }]);

  //--------------------- pull date logic ---------------------
  // 1. we need to find if this person exists
  React.useEffect(() => {
    const qSalesperson = query(salespersonRef,
      where("firstName", "==", String(input.firstName)),
      where("lastName", "==", String(input.lastName)));
    const getQuerySalesperson = async () => {
      const salesperson_item = await getDocs(qSalesperson);
      setSalesperson(salesperson_item.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })));
    }
    getQuerySalesperson();
  }, [input])

  const isValidSalesperson = () => {
    if(input.firstName===''){
      return false;
    }
    return salesperson.length === 0 ? false : true
  }

  // 2. we need to FIND ALL SALES associate with this person
  React.useEffect(() => {
    const qSale = query(saleRef,
      where("salesperson", "==", String(input.firstName)));
    const getQuerySale = async () => {
      const sale_item = await getDocs(qSale);
      setSale(sale_item.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })));
    }
    getQuerySale();
  }, [input])

  const findAllSale = () => {
    // need to see if the time fit.
    const YM = input.startingMonth.split("-");
    const startArr = [Number(YM[0]), Number(YM[1])];
    const endArr = [-1, -1]
    if (startArr[1] > 10){
      endArr[0] = startArr[0] + 1;
      endArr[1] = startArr[1] + 2 - 12;
    }else{
      endArr[0] = startArr[0];
      endArr[1] = startArr[1] + 2;
    }

    const saleArr = sale.filter((element) => {
      const arr = element.saleDate.split("-");
      const dateArr = [Number(arr[0]), Number(arr[1])];
      if (dateArr[0] >= startArr[0] && 
        dateArr[0] <= endArr[0] && 
        dateArr[1] >= startArr[1] && 
        dateArr[1] <= endArr[1]){
          return element;
        }
    });
    return saleArr;
  }

  // 3. we need to find the each commission rate for every bike from 2
  const allProducts = findAllSale().map(element => element.product);
  const productArr = [...new Set(allProducts)];
  const uniqueProduct = new Set();
  productArr.forEach(element => uniqueProduct.add(element));
  const productReactElement = productArr.map(element => <li key={element}>{element}</li>)

  const allCustomer = findAllSale().map(element => element.customer);
  const customerArr = [...new Set(allCustomer)];
  const uniqueCustomer = new Set();
  customerArr.forEach(element => uniqueCustomer.add(element));
  const customerReactElement = customerArr.map(element => <li key={element}>{element}</li>)

  React.useEffect(() => {
    const getProduct = async () => {
      const product_item = await getDocs(productRef);
      setProduct(product_item.docs.map((doc) => ({ 
        ...doc.data(), 
        id: doc.id 
      })));
    }
    getProduct();
  }, [])

  const commissionArr = product.map((element) => {
    if (uniqueProduct.has(element.name)){
      const commission = Math.ceil((element.salePrice -
        element.purchasePrice) *
        element.commissionRate * 100) / 100;
      return commission;
    }
    else{
      return 0;
    }
  })


  const totalCommission = () =>{
    if(commissionArr.length < 2){
      console.log("I am here")
      return commissionArr.length === 0 ? 
          0 : commissionArr[1];
    }
    else{
      return commissionArr.reduce((a, b) => {
        return Number(a) + Number(b)
      })
    }
  }
  
  console.log(productReactElement);
  //--------------------- end of logic ---------------------
  
  
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setInput((prevFormData => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    })))
  }

  const handleSubmit = (event) => {
    if (isValidSalesperson()){
      if(sale.length === 0){
        alert("This salesperson does has any sale yet.");
      }else{
        event.preventDefault();
        setResult({
          commission: totalCommission(),
          products: productReactElement,
          customers: customerReactElement
        });
      }
    }else{
      alert("This salesperson does not exists. Please go to View Salesperson.");
      setInput({
        firstName: '',
        lastName: '',
        startingMonth: ''
      });
    }
  };


  

  return (
    <div className="commission">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <button className="greenButton"
            onClick={() => { navigate(`/home/${String(auth.lastNotifiedUid)}`) }}
            type="button">Home
          </button>
          <label htmlFor="firstName">First Name</label>
          <input 
            type="text" 
            id="firstName"
            name="firstName"
            placeholder="i.e. Ben"
            onChange={handleChange}/>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="i.e. Chen"
            onChange={handleChange} />
          <label htmlFor="startingMonth">Starting Month</label>
          <input 
            type="month" 
            id="startingMonth" 
            name="startingMonth"
            placeholder="i.e. May 2023"
            onChange={handleChange}/>
          <p>* Choose a starting month, and see 
            the commission report for the next 3 month.</p>
          <button 
            className="greenButton" 
            type="submit">Search</button>
        </div>
      </form>
      <div className="right">
        <div className="report">
          <div>
            <h3>Totoal commission earned: ${result.commission}</h3></div>
          <div>
            <h3>Products sold:</h3>
            <p>{result.products}</p></div>
          <div>
            <h3>Customer connections:</h3>
            <p>{result.customers}</p></div>
          <div>
            <h3>Coming Soon . . . </h3></div>
        </div>
      </div>
    </div>
  )
}

export default Commission;