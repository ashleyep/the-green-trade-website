import React from 'react'
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { getAuth, signOut } from "firebase/auth";
import { useState, useEffect } from "react";

function Login({ setIsAuth }) {
  const [user, setUser] = useState({ name: "", email: "" });
  let navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setIsAuth(true);
        localStorage.setItem("isAuth", true);
        console.log("User signed in successfully!");
        setUser({
          name: result.user.displayName,
          email: result.user.email,
        });
        console.log("Display Name:", user.name);
        console.log("Email:", user.email);
        navigate("/profile"); // Navigate the user to the profile
        window.location.reload(); // Reload the page after successful login
      })
      .catch((error) => {
        // Handle any errors that occur during the sign-in process
        console.error("Error signing in with Google:", error);
      });
  };
  // Check to see if the user's name and email have been saved
  useEffect(() => {
    // This effect will run after the component renders and whenever the 'user' state changes
    console.log("Display Name:", user.name);
    console.log("Email:", user.email);
  }, [user]); // The effect will re-run whenever 'user' state changes
  return (
    <div className="body">
      <div className="loginPage">
        <div className="text">
          <h2>LOGIN OR SIGN UP WITH GOOGLE</h2>
        </div>
        <div className="button-container2">
          <div className="login-with-google-btn" onClick={signInWithGoogle}>
            Login/Sign Up
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
