import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Logo from './assets/logo.png';
import HandEarth from './assets/hand-earth.png';
import Title from './assets/title.png';
import Display from './pages/Display';
import Contact from './pages/Contact';

import CreatePost from './pages/CreatePost';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useState} from "react"
import {signOut} from 'firebase/auth';
import {auth} from "./firebase-config";
import {Link} from 'react-router-dom';


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(()=> {
      localStorage.clear();
      setIsAuth(false); //set to false
      window.location.pathname = "/login";
    });
  };

  return (
    <div className="App">
      
      <Router>
        <nav>
        <div className = "navbar">
          <div className="left">
            <Link to='/' class="button"> Home </Link>
            {!isAuth ? (
                <Link to="/login" class="button"> Login </Link>
              ) : (
                <>
                <Link to='/createPost'> Create Post </Link>
                <button onClick ={signUserOut}> Logout </button>
                </>
              )}

          </div>
          <div className="middle">
              <img id="logo" src = {Logo}/>
              <img id="title" src = {Title}/>
          </div>
          <div className="right">
            <Link to= '/display' class="button" > Display </Link>
            <Link to= '/contact' class="button" > Contact </Link>
          </div>   
        </div>
        </nav>
        <Routes>
          <Route path = '/'  element={<Home/>}/>
          <Route path = '/login'  element={<Login setIsAuth = {setIsAuth}/>}/>
          <Route path = '/contact'  element={<Contact/>}/>
          <Route path = '/createPost'  element={<CreatePost isAuth={isAuth}/>}/>
          <Route path = '/display'  element={<Display isAuth ={isAuth}/>}/>
        </Routes>
      </Router>
   
    </div>
  );
}

export default App;
