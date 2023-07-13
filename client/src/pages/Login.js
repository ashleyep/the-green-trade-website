import React from 'react'
import {auth, provider} from "../firebase-config";
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom';
import '../styles/Login.css';
import { getAuth, signOut } from "firebase/auth";


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
    <div className = "fullPage" style={{ backgroundImage: "url('..assets/login.png')" }}>
    <div className ="loginPage">
        <div>
            <h2>Sign In With Google To Continue</h2>
        </div>
        <div>
            {/* <Link to='/post' className='navButton'> POST </Link> */}
            <div className="login-with-google-btn" onClick={signInWithGoogle}>Sign In</div>

        </div>
        
    </div>
    </div>
  )
}

signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});

export default Login