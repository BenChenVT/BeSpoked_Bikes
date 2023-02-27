import { useState } from 'react'
import React from 'react'
import './App.css'
import Home from './Home'
import SignUp from './components/SignUp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customer from './components/Customer'
import Product from './components/Product'
import Sale from './components/Sale'
import Salesperson from './components/SalesPerson'
import CreateSale from './components/CreateSale'
import EditProduct from './components/EditProduct'
import Commission from './components/Commission.jsx'
import EditSalesperson from './components/EditSalesperson'
import SaleDetail from './components/SaleDetail'
import AddProduct from './components/AddProduct'
import AddSalesperson from './components/AddSalesperson'
import LogIn from './components/logIn'

function App() {
  return (
    <Router>
      {/* <div>header</div> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home/:username" element={<Home />}/>
        <Route path="/home/customer" element={<Customer />} />
        <Route path="/home/product" element={<Product />} />
        <Route path="/home/sale" element={<Sale />} />
        <Route path="/home/salesperson" element={<Salesperson />} />
        <Route path="/home/saleDetail/:SaleId" element={<SaleDetail />} />
        <Route path="/home/CreateSale" element={<CreateSale />} />
        <Route path="/home/EditProduct/:ProductId" element={<EditProduct />} />
        <Route path="/home/EditSalesperson/:SalespersonId" element={<EditSalesperson />} />
        <Route path="/home/AddProduct" element={<AddProduct />} />
        <Route path="/home/AddSalesperson" element={<AddSalesperson />} />
        <Route path="/home/Commission" element={<Commission />} />
        <Route path="*" element={<h1>Error page</h1>} />
      </Routes>
      {/* <div>footer</div> */}
    </Router>
  )
}

export default App
