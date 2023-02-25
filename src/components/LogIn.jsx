import React from 'react';
import { auth, googleProvider } from '../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    let navigate = useNavigate();
    // let { username } = useParams();
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

    return (
        <div>
            <input
                placeholder="Username"
                onChange={(e) => setEmail(e.target.value)} />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} />

            <button onClick={onLogin}>Sign In</button>
            <button onClick={signInWithGoogle} >sign in with google</button>
            <button onClick={() => { navigate("/") }}> go to home page </button>
            <button onClick={logOut} >log out</button>
        </div>
    )

}

export default LogIn;