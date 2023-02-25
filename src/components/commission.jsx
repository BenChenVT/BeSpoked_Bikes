import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import { auth } from '../config/firebase';


const Commission = () => {
  let navigate = useNavigate();
  return (
    <div className="commission">
      <form>
        <div className="left">
          <button className="greenButton"
            onClick={() => { navigate(`/home/${String(auth.lastNotifiedUid)}`) }}
            type="button">Home
          </button>
          <label htmlFor="input1">First Name</label>
          <input type="text" id="input1" placeholder="i.e. Ben"/>
          <label htmlFor="input2">Last Name</label>
          <input type="text" id="input2" placeholder="i.e. Chen"/>
          <label htmlFor="input3">Starting Month</label>
          <input type="month" id="input3" placeholder="i.e. Spring"/>
          <p>* Choose a starting month, and see the commission report for the next 4 month.</p>
          <button className="greenButton" type="submit">Search</button>
          <button className="redButton" type="button">Clear All</button>
        </div>
      </form>
      <div className="right">
        <canvas id="bar-chart"></canvas>
      </div>
    </div>
  )
}

export default Commission;