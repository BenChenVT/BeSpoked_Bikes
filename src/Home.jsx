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
      <button className="redButton" onClick={handleLogout}>Log out</button>
      <h1>Welcome to BeSpoked Bikes Sales Tracking System</h1>
      <div className="grid-container">
        <button 
          onClick={() => { navigate("/home/customer") }} 
          className="grid-item">View Customer
        </button>
        <button 
          onClick={() => { navigate("/home/product") }} 
          className="grid-item">View Product</button>
        <button 
          onClick={() => { navigate("/home/salesperson") }} 
          className="grid-item">View SalesPerson</button>
        <button 
          onClick={() => { navigate("/home/sale") }} 
          className="grid-item">View Sale</button>
        <button 
          onClick={() => { navigate("/home/CreateSale") }} 
          className="grid-item">Create Sale</button>
        <button 
          onClick={() => { navigate("/home/Commission") }} 
          className="grid-item">Commission Report</button>
      </div>
        
    </div>
  )
}

export default Home;