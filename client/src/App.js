import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Logo from './assets/placeholder_logo.png';
import Display from './pages/Display';

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
      <h1>The Green Trade</h1>
      {/* <p> We will eventually have a cooler name</p> */}
      <Router>
        {/* <Navbar/> */}
        <nav>
        <div className = "navbar">
        <div className="leftSide">
            <img src = {Logo}/>
        </div>
        {/* <div className="rightSide"> */}
            <Link to='/'> Home </Link>
            <Link to= '/display'> Display </Link>
            {!isAuth ? (
              <Link to="/login"> Login </Link>
            ) : (
              <>
               <Link to='/createPost'> Create Post </Link>
              <button onClick ={signUserOut}> Logout </button>
              </>
            )}
        {/* </div> */}
    </div>
        </nav>
        <Routes>
          <Route path = '/'  element={<Home/>}/>
          <Route path = '/login'  element={<Login setIsAuth = {setIsAuth}/>}/>
          <Route path = '/createPost'  element={<CreatePost isAuth={isAuth}/>}/>
          <Route path = '/display'  element={<Display isAuth ={isAuth}/>}/>
        </Routes>
      </Router>
   
    </div>
  );
}

export default App;
