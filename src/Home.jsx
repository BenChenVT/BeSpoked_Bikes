import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const Home = () => {

    let navigate = useNavigate();
    let { username } = useParams();
    console.log({username});

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