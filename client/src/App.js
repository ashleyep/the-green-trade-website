import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Logo from './assets/logo.png';
import HandEarth from './assets/hand-earth.png';
import Title from './assets/title.png';
import Display from './pages/Display';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useState} from "react"
import {signOut} from 'firebase/auth';
import {auth} from "./firebase-config";
import {Link} from 'react-router-dom';
import React from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(()=> {
      localStorage.clear();
      setIsAuth(false); //set to false
      window.location.pathname = "the-green-trade/login";
    });
  };

  return (
    <div className="App">
      
      {/* <Router> */}
        <nav>
        <div className = "navbar">
          <div className="left">
            <Link to='/' className="button"> Home </Link>
            {!isAuth ? (
                <Link to="/login" className="button"> Login </Link>
              ) : (
                <>
                <Link to='/createPost'className="button"> Create Post </Link>
                <div id = "logout">
                <button onClick ={signUserOut}> Logout </button>
                </div>
                </>
              )}

          </div>
          <div className="middle">
              <img id="logo" src = {Logo}/>
              <strong>THE GREEN TRADE</strong>
          </div>
          <div className="right">
            <Link to= '/posts' className="button" > Posts </Link>
            <Link to= '/contact' className="button" > Contact </Link>
            {isAuth ?  <Link to= '/profile' className="button" > Profile </Link>: null }
          </div>   
        </div>
        </nav>
        
        <Routes>
          <Route path = '/'  element={<Home/>}/>
          <Route path = '/login'  element={<Login setIsAuth = {setIsAuth}/>}/>
          <Route path = '/contact'  element={<Contact/>}/>
          <Route path = '/createPost'  element={<CreatePost isAuth={isAuth}/>}/>
          <Route path = '/posts'  element={<Display isAuth ={isAuth}/>}/>
          <Route path = '/profile'  element={<Profile isAuth ={isAuth}/>}/>
        </Routes>
      {/* </Router> */}
   
    </div>
  );
}

export default App;
