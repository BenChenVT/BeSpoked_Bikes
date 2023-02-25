import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import '../App.css';


const Commission = () => {

  return (
    <div className="commission">
      <form>
        <div className="left">
          <label for="input1">First Name</label>
          <input type="text" id="input1" placeholder="i.e. Ben"/>
          <label for="input2">Last Name</label>
          <input type="text" id="input2" placeholder="i.e. Chen"/>
          <label for="input3">Starting Month</label>
          <input type="month" id="input3" placeholder="i.e. Spring"/>
          <p>* Choose a starting month, and see the commission report for the next 4 month.</p>
          <button className="greenButton" type="submit">Search</button>
          <button className="redButton">Clear All</button>
        </div>
      </form>
      <div className="right">
        <canvas id="bar-chart"></canvas>
      </div>
    </div>
  )
}

export default Commission;