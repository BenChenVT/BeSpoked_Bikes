import React from 'react';
import '../App.css'
import { db } from '../config/firebase'
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

const Product = () => {

  let navigate = useNavigate();
  const [product, setProduct] = React.useState([]);
  const productRef = collection(db, "products");

  React.useEffect(()=>{
    const getProduct = async () => {
      const data = await getDocs(productRef);
      setProduct(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      console.log(data); 
    }

    getProduct()
  }, [])


    return (
      <div>
        <button 
          className="greenButton" 
          onClick={() => { navigate(`/home/${String(auth.lastNotifiedUid)}`) }}>
            Home
        </button>
        {product.map((pro) => {
          return (
          <div key={pro.id} className="productCard">
            <div>name: {pro.name}</div>
            <div>Manufacture: {pro.manufacture}</div>
            <div>Style: {pro.style}</div>
            <div>Purchase Price: ${pro.purchasePrice}</div>
            <div>Sale Price: ${pro.salePrice}</div>
            <div>Qty: {pro.Qty}</div>
              <button onClick={() => { navigate(`/home/EditProduct/${String(pro.id)}`)}}>Edit</button>
          </div>
          )
        })}
      </div>
    )
}

export default Product;