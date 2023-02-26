import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { db } from '../config/firebase'
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';


/**
 * This component will add a new product with out a 
 * duplicate based on the field: name
 * @returns 
 */
const AddProduct = () => {

  // all the hooks initialized
  let navigate = useNavigate();
  const [product, setProduct] = React.useState({ 
    name: '', manufacture: '', style: '', purchasePrice: 0,
    salePrice: 0, Qty: 0, commissionRate: 0 });

  //-------------------- handle duplicate---------------------
  // this section of code is dealing with duplicate item,
  // if the name of the product is duplicated, then we
  // will find it in the firestore
  const productRef = collection(db, "products");
  const [productLookUp, setProductLookUp] = React.useState([]); 
  React.useEffect(() => {
    const qProduct = query(productRef, where("name", "==", String(product.name)));
    const getQueryProduct = async () => {
      const product_item = await getDocs(qProduct);
      setProductLookUp(product_item.docs.map((doc) => ({
         ...doc.data(), 
         id: doc.id 
        })));
    }
    getQueryProduct();
    // console.log(productLookUp)
    // productLookUp.length will be 1 if there is a duplicate item
  }, [product]) // this product is user input

  const checkDuplicate = () => {
    return productLookUp.length === 0 ? true : false
  }
  // -------------------- end of the logic --------------
  

  const createNewProduct = async () => {
    const prodRef = collection(db, "products");
    const newProd = product;
    addDoc(prodRef, newProd);
  }

  
  const handleSubmit = (event) => {
    if(checkDuplicate()){
      event.preventDefault();
      createNewProduct();
      navigate(`/home/${String(auth.lastNotifiedUid)}`)
    }
    else{
      alert("This product already exists. No duplicate Please.")
      setProductLookUp([]); // need to reset the list
    }
    
  };

  const handleChange = (event) => {
    setProduct((prevFormData => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    })))
  }


  // rendering for the add product page
  return (
    <div className="addSale">
      <h1>Add a new product, please put information below</h1>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label>Name:&nbsp;</label>
          <input
            type="text"
            placeholder='i.e. Mountain Bike'
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
          /></div>
        <div className="input">
          <label>Manufacture:&nbsp;</label>
          <input
            type="text"
            placeholder='i.e. Walmart'
            id="manufacture"
            name="manufacture"
            value={product.manufacture}
            onChange={handleChange}
          /></div>
        <div className="input">
          <label>Style:&nbsp;</label>
          <input
            type="text"
            id="style"
            placeholder='i.e. off-road'
            name="style"
            value={product.style}
            onChange={handleChange}
          /></div>
        <div className="input">
          <label>Purchase Price:&nbsp;</label>
          <input
            type="number"
            id="purchasePrice"
            name="purchasePrice"
            value={product.purchasePrice}
            onChange={handleChange}
          /></div>
        <div className="input">
          <label>Sale Price:&nbsp;</label>
          <input
            type="number"
            id="salePrice"
            name="salePrice"
            value={product.salePrice}
            onChange={handleChange}
          /></div>
        <div className="input">
          <label>Quantity:&nbsp;</label>
          <input
            type="number"
            id="Qty"
            name="Qty"
            value={product.Qty}
            onChange={handleChange}
          /></div>
        <div className="input">
          <label>Commission Rate:&nbsp;</label>
          <input
            type="number"
            id="commissionRate"
            name="commissionRate"
            value={product.commissionRate}
            onChange={handleChange}
          />
        </div>
        <button
          className="greenButton" type="submit">Add</button>
        <button
          className="redButton"
          onClick={() => { navigate(`/home/${String(auth.lastNotifiedUid)}`) }}>discard</button>
      </form>
    </div>
  )
}

export default AddProduct;