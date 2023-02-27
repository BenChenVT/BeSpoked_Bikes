import React from 'react';
import '../App.css'
import { auth, googleProvider } from '../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


/**
 * This page allow user to login
 * @returns 
 */
const LogIn = () => {

  // all the hooks initialized
  let navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      navigate(`/home/${String(user.uid)}`)
      console.log(user);
    })
    .catch((err) => {
      const errCode = err.code;
      const errMessage = err.message;
      console.log(errCode, errMessage);
    })
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  }

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  }

  // renderring this page
  return (
    <div>
      <div className="up">
        <div className="input">
          <label>UserName:&nbsp;</label>
          <input
            id="username"
            placeholder="Username"
            onChange={(e) => setEmail(e.target.value)} /></div>
        <div className="input">
          <label>Passowrd:&nbsp;</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} /></div>
      </div>
      <div className="down">
        <button 
          className="greenButton" 
          onClick={onLogin}>Log In</button>
        <button 
          className="greenButton" 
          onClick={signInWithGoogle}>sign in with google</button>
        <button 
          className="greenButton" 
          onClick={() => {navigate("/")}}> go to home page </button>
        <button 
          className="redButton" 
          onClick={logOut} >log out</button>
      </div>
    </div>
  )

}

export default LogIn;