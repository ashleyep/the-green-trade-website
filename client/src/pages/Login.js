import React, { useState, useEffect } from 'react';
import { auth, provider } from "../firebase-config";
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login({ setIsAuth }) {
  const [user, setUser] = useState({ name: "", email: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false); // Track whether user is signing up or logging in
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setIsAuth(true);
        localStorage.setItem("isAuth", true);
        setUser({
          name: result.user.displayName,
          email: result.user.email,
        });
        navigate("/profile");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };

  const handleEmailPasswordAuth = (e) => {
    e.preventDefault();
    if (isNewUser) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          setIsAuth(true);
          localStorage.setItem("isAuth", true);
          setUser({
            name: result.user.displayName || "User",
            email: result.user.email,
          });
          navigate("/profile");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error signing up with email/password:", error);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          setIsAuth(true);
          localStorage.setItem("isAuth", true);
          setUser({
            name: result.user.displayName || "User",
            email: result.user.email,
          });
          navigate("/profile");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error logging in with email/password:", error);
        });
    }
  };

  useEffect(() => {
    console.log("Display Name:", user.name);
    console.log("Email:", user.email);
  }, [user]);

  return (
    <div className="body">
      <div className="loginPage">
        <div className="text">
          <h2>LOGIN OR SIGN UP</h2>
        </div>
        <div className="button-container2">
          <div className="login-with-google-btn" onClick={signInWithGoogle}>
            Login/Sign Up with Google
          </div>
        </div>
        <form onSubmit={handleEmailPasswordAuth} className="email-password-form">
          <input
            type="email"
            placeholder="Email"
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
          <button type="submit">
            {isNewUser ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="toggle-auth-mode">
          <span onClick={() => setIsNewUser(!isNewUser)}>
            {isNewUser ? "Already have an account? Login" : "New user? Sign up"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
