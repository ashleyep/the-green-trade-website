import React from 'react'
import {auth, provider} from "../firebase-config";
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom';


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
        <p>Sign In With Google to Continue</p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
            Sign in With Google
        </button>
    </div>
  )
}

export default Login