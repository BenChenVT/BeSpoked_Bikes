import { useState } from 'react'
import './App.css'
import Home from './Home'
import SignUp from './components/SignUp'
import LogIn from './components/logIn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customer from './components/Customer'
import Product from './components/Product'
import Sale from './components/Sale'
import Salesperson from './components/SalesPerson'
import AddEntity from './components/AddEntity'


function App() {

  return (
    <Router>
      <div>header</div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home/:username" element={<Home />}/>
        <Route path="/home/customer" element={<Customer />} />
        <Route path="/home/product" element={<Product />} />
        <Route path="/home/sale" element={<Sale />} />
        <Route path="/home/salesperson" element={<Salesperson />} />
        <Route path="/home/addEntity" element={<AddEntity />} />
        {/* <Route path="/home/EditEntity" element={<AddEntity />} /> */}
        <Route path="*" element={<h1>Error page</h1>} />
      </Routes>
      <div>footer</div>
    </Router>
  )
}

export default App
