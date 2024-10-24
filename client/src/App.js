import './App.css';
import Navbar from './components/Navbar';
import NavbarComp from './components/NavbarComp';
import Home from './pages/Home';
import Login from './pages/Login';
import Logo from './assets/logo.png';
import HandEarth from './assets/hand-earth.png';
import Title from './assets/title.png';
import Display from './pages/Display';
import Contact from './pages/Contact';
import Profile from "./pages/Profile";
import CreatePost from './pages/CreatePost';
import Matching from './pages/Matching';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useState} from "react"
import {signOut} from 'firebase/auth';
import {auth} from "./firebase-config";
import {Link} from 'react-router-dom';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import { LinkContainer } from "react-router-bootstrap";


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false); //set to false
      window.location.pathname = "the-green-trade-website/login";
    });
  };
  return (
    <div className="App">
      <NavbarComp />{" "}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/createPost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/posts" element={<Display isAuth={isAuth} />} />
        <Route path="/profile" element={<Profile isAuth={isAuth} />} />
        <Route path="/matching" element={<Matching isAuth={isAuth} />} />
      </Routes>
    </div>
  );

}
export default App;
