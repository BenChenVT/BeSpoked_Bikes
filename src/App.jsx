import { useState } from 'react'
import Auth from './Auth'
import './App.css'
import test from './test'
import Home from './Home'
import SignUp from './components/SignUp'
import LogIn from './components/logIn'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div>header</div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home/:username" element={<Home />}/>
        <Route path="*" element={<h1>Error page</h1>} />
      </Routes>
      <div>footer</div>
    </Router>
  )
}

export default App
