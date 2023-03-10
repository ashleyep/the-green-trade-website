import React from 'react';
import Logo from '../assets/placeholder_logo.png';
import {Link} from 'react-router-dom';
import '../styles/Navbar.css'
// import { isAuth } from './/App.js';

function Navbar() {
  return (
    <div className = "navbar">
        <div className="leftSide">
            <img src = {Logo}/>
        </div>
        <div className="rightSide">
            <Link to='/'> Home </Link>
            <Link to='/createPost'> Post </Link>
            {<Link to='/login'> Login </Link>}
        </div>
    </div>
  );
}

export default Navbar