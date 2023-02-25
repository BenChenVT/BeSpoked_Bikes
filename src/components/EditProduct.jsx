import React from 'react';
import '../App.css'
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../config/firebase'
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { auth } from '../config/firebase';

const EditProduct = () => {

  let navigate = useNavigate();
  const [product, setProduct] = React.useState({ 
    name: '', 
    manufacture: '', 
    style: '', 
    purchasePrice: 0, 
    salePrice: 0,
    commissionRate:0,
    Qty:0 });
  const  Id = useParams();
  const id = String(Id.ProductId);
    
  React.useEffect(() => {
    const getProducts = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      setProduct((prevPro) => ({
        ...prevPro,
        style: String(docSnap.data().style),
        name: String(docSnap.data().name),
        manufacture: String(docSnap.data().manufacture),
        purchasePrice: Number(docSnap.data().purchasePrice),
        salePrice: Number(docSnap.data().salePrice),
        Qty: Number(docSnap.data().Qty),
        commissionRate: Number(docSnap.data().commissionRate),
      }))
    }
    getProducts()
  }, [])


  const updateUser = async () => {
    const changeRef = doc(db, "products", id);
    const newProduct = product;
    const changeSnap = await updateDoc(changeRef, newProduct);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser();
    navigate(`/home/product`);
  };

  const handleChange = (event) => {
    setProduct((prevFormData => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    })))
  }

  return (
    <div className="addSale">
      <h1>You are editing the value of {Id.ProductId}</h1>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label>name:&nbsp;</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>manufacture:&nbsp;</label>
          <input
            type="text"
            id="manufacture"
            name="manufacture"
            value={product.manufacture}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>style:&nbsp;</label>
          <input
            type="text"
            id="style"
            name="style"
            value={product.style}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Purchase Price:&nbsp;</label>
          <input
            type="number"
            placeholder='please type a number'
            id="purchasePrice"
            name="purchasePrice"
            value={product.purchasePrice}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Sale Price:&nbsp;</label>
          <input
            type="number"
            id="salePrice"
            name="salePrice"
            value={product.salePrice}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Quantity:&nbsp;</label>
          <input
            type="number"
            id="Qty"
            name="Qty"
            value={product.Qty}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Commission Percentage:&nbsp;</label>
          <input
            type="number"
            id="commissionRate"
            name="commissionRate"
            value={product.commissionRate}
            onChange={handleChange}
          />
        </div>
        <button className="greenButton" type="submit">Submit</button>
        <button className="greenButton" onClick={() => { navigate(`/home/product`) }}>Cancel</button>
      </form>
    </div>
  )
}

export default EditProduct;