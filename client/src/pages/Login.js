import React from 'react'
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { getAuth, signOut } from "firebase/auth";


function Login({ setIsAuth }) {
    let navigate = useNavigate();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            setIsAuth(true);
            localStorage.setItem("isAuth", true);
            navigate("/");
            window.location.reload(); // Reload the page after successful login
        });
    };

    return (
        <div className="body">
            <div className="loginPage">
                <div className='text'>
                    <h2>LOGIN OR SIGN UP WITH GOOGLE</h2>
                </div>
                <div className='button-container2'>
                    <div className="login-with-google-btn" onClick={signInWithGoogle}>
                        Login/Sign Up
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
