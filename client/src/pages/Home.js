import React from 'react';
import '../styles/Home.css';
import HandEarth from '../assets/hand-earth.png';
// import post1 from './assets/post1.JPG';
// import post2 from './assets/post2.jpg';

function Home() {


  return (
  <div className='body'>
  <h1 class='about'>Promoting sustainable fashion by facilitating the exchange of clothes through our online trading platform.</h1>
  <img class='about-img' src={HandEarth}></img> 
  </div>
 
  )
}

export default Home;