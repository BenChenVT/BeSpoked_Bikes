import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth } from './config/firebase';
import { signOut } from 'firebase/auth';

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
            <h1>Welcome to BeSpoked Bikes Sales Tracking System {username}</h1>
            <li>SalesPerson</li>
            <li>product</li>
            <li>customer</li>
            <li>sale</li>
            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default Home;



// import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const Home = () => {


//     let { username } = useParams();

//     return (

//         <div>
//             <h1>This is home page of {username} </h1>

//         </div>
//     )
// }

// export default Home;