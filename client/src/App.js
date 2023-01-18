import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Logo from './assets/placeholder_logo.png';

import CreatePost from './pages/CreatePost';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useState} from "react"
import {signOut} from 'firebase/auth';
import {auth} from "./firebase-config";
import {Link} from 'react-router-dom';

function App() {
  const [isAuth, setIsAuth] = useState(false);

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
            <Link to='/createPost'> Post </Link>
            {!isAuth ? (
              <Link to="/login"> Login </Link>
            ) : (
              <button onClick ={signUserOut}> Logout </button>
            )}
        {/* </div> */}
    </div>
        </nav>
        <Routes>
          <Route path = '/'  element={<Home/>}/>
          <Route path = '/login'  element={<Login setIsAuth = {setIsAuth}/>}/>
          <Route path = '/createPost'  element={<CreatePost/>}/>
        </Routes>
      </Router>
   
    </div>
  );
}

export default App;
