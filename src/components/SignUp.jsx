import React from 'react';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
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

    return (
        <div>
            <input
                placeholder="Username"
                onChange={(e) => setEmail(e.target.value)} />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} />

            <button onClick={createUser} >Sign In</button>
            <button onClick={() => { navigate("/") }}> go to home page </button>
            <button onClick={() => { navigate(`/home/${"ben"}`) }}>Successfully logged in TestButton</button>
        </div>
    )

}

export default SignUp;