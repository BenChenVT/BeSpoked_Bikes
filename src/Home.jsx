import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth } from './config/firebase';
import { signOut } from 'firebase/auth';
import './App.css'


const Home = () => {

    let navigate = useNavigate();
    let { username } = useParams();
    console.log({username});



    // const routeChange = () => {
    //     let path = "/home/"+String(username)+"/sale";
    //     navigate(path);
    //     console.log("the path is " + path);
    // }


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
                <h1>Welcome to BeSpoked Bikes Sales Tracking System No name follow</h1>
                <button onClick={() => { navigate("/login") }}>Log In</button>
                <button onClick={() => { navigate("/signup") }}>Sign Up</button>
            </div>
        )
    }
    return(
        <div>
            <button onClick={handleLogout}>Log out</button>
            <h1>Welcome to BeSpoked Bikes Sales Tracking System, Ben</h1>
            <div className="grid-container">
                <button onClick={() => { navigate("/home/customer") }} className="grid-item">Customer</button>
                <button onClick={() => { navigate("/home/product") }} className="grid-item">Product</button>
                <button onClick={() => { navigate("/home/sale") }} className="grid-item">SalesPerson</button>
                <button onClick={() => { navigate("/home/salesperson") }} className="grid-item">Sale</button>
            </div>
            
        </div>
    )
}

export default Home;