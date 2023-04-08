import React from 'react'
import {auth, provider} from "../firebase-config";
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom';
import '../styles/Login.css';


function Login({setIsAuth}) {
    let navigate = useNavigate();
    const signInWithGoogle = () => {
        signInWithPopup(auth,provider).then((result) => {
            setIsAuth(true); 
            localStorage.setItem("isAuth",true);
            navigate("/");
        });  
    };
  return (
    <div className ="loginPage">
        <p >SIGN IN WITH GOOGLE TO CONTINUE...</p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
            Sign In
        </button>
    </div>
  )
}

export default Login