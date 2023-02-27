import React from 'react';
import '../App.css'
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


/**
 * this component allow user to sign up and store the 
 * username and password in firebase authentication
 * @returns 
 */
const SignUp = () => {

  // all the hooks initialized
  let navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const createUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
    // username must be an email, password is at least 6 digit(000000)
  }

  // render the page
  return (
    <div>
      <div className='input'>
        <label>Username:&nbsp;</label>
        <input
          placeholder="Username"
          onChange={(e) => setEmail(e.target.value)} /></div>
      <div className='input'>
        <label>Password:&nbsp;</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} /></div>
      <div className='down'>
        <button 
          className="greenButton" 
          onClick={createUser} >Sign Up</button>
        <button 
          className="greenButton" 
          onClick={() => { navigate("/") }}>go to home page </button>
      </div>
    </div>
  )
}

export default SignUp;