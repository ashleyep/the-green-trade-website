import React from 'react';
import LogoActual from '../assets/logo.png';
import {Link} from 'react-router-dom';
import '../styles/Navbar.css'
// import { isAuth } from './/App.js';

function Navbar() {
  // return (
  //   <div className = "navbar">
  //       <div className="leftSide">
  //           <img src = {Logo}/>
  //       </div>
  //       <div className="rightSide">
  //           <Link to='/'> Home </Link>
  //           <Link to='/createPost'> Post </Link>
  //           <Link to= '/display'> Display </Link>
  //           {<Link to='/login'> Login </Link>}
  //       </div>
  //   </div>
  // );
  return (
    <div className = "navbar">

      <div className = "leftSide" >
            <Link to='/' className='navButton'> HOME </Link>
            <Link to='/about' className='navButton'> ABOUT </Link>
            <Link to='/contact' className='navButton'> CONTACT </Link>
      </div>
      <div className = "middle">
          <img className='logoImg' src = {LogoActual}/>
      </div>
      <div className = "rightSide">
            <Link to='/post' className='navButton'> POST </Link>
            <Link to='/profile' className='navButton'> PROFILE </Link>
            <Link to='/login' className='navButton'> LOGIN </Link>
      </div> 
    </div>
  );
}

export default Navbar