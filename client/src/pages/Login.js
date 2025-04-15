import React, { useState,useEffect } from 'react';
import { auth, provider } from "../firebase-config";
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();

  
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setIsAuth(true);
        localStorage.setItem("isAuth", true);
        navigate("/profile");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };

  const handleEmailPasswordAuth = (e) => {
    e.preventDefault();
    const authFn = isNewUser
      ? createUserWithEmailAndPassword
      : signInWithEmailAndPassword;

    authFn(auth, email, password)
      .then((result) => {
        setIsAuth(true);
        localStorage.setItem("isAuth", true);
        navigate("/profile");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Authentication error:", error);
      });
  };

    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }, []);
  

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>{isNewUser ? "Create an Account" : "Welcome Back"}</h2>

        <button className="google-btn" onClick={signInWithGoogle}>
          Continue with Google
        </button>

        <div className="divider">or</div>

        <form onSubmit={handleEmailPasswordAuth} className="auth-form">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="submit-btn">
            {isNewUser ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="toggle-auth">
          {isNewUser ? "Already have an account?" : "New here?"}
          <span onClick={() => setIsNewUser(!isNewUser)}>
            {isNewUser ? " Log In" : " Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
