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
        <div>
            <h2>Sign In With Google To Continue</h2>
        </div>
        <div>
            {/* <Link to='/post' className='navButton'> POST </Link> */}
            <div className="login-with-google-btn" onClick={signInWithGoogle}>Sign In</div>

        </div>
        
    </div>
  )
}

export default Login