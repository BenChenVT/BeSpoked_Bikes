import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth } from './config/firebase';
import { signOut } from 'firebase/auth';
import './App.css'


const Home = () => {

  let navigate = useNavigate();
  let { username } = useParams();
  console.log({username});


  const handleLogout = () => {
    signOut(auth).then(()=> {
      navigate("/")
    }).catch((err) => {
      //  has error
    })
  }

  console.log(auth);
  if(username === undefined){
    return (
      <div>
        <h1>Please login or sign up to use the system</h1>
        <button 
          className="greenButton" 
          onClick={() => { navigate("/login") }}>Log In</button>
        <button 
          className="greenButton" 
          onClick={() => { navigate("/signup") }}>Sign Up</button>
      </div>
    )
  }
  return(
    <div>
      <h1>Welcome to BeSpoked Bikes Sales Tracking System</h1>
      <div className="grid-container">
        <button 
          onClick={() => { navigate("/home/customer") }} 
          className="grid-item_view">View Customer
        </button>
        <button 
          onClick={() => { navigate("/home/product") }} 
          className="grid-item_view">View Product</button>
        <button 
          onClick={() => { navigate("/home/salesperson") }} 
          className="grid-item_view">View SalesPerson</button>
        <button 
          onClick={() => { navigate("/home/sale") }} 
          className="grid-item_view">View Sale</button>
        <button 
          onClick={() => { navigate("/home/CreateSale") }} 
          className="grid-item_add">Create Sale</button>
        <button
          onClick={() => { navigate("/home/AddProduct") }}
          className="grid-item_add">Add Product</button>
        <button
          onClick={() => { navigate("/home/AddSalesperson") }}
          className="grid-item_add">Add Salesperson</button>
        <button
          onClick={() => { navigate("/home/Commission") }}
          className="grid-item_add">Commission Report</button>
      </div>
      <button className="redButton" onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default Home;