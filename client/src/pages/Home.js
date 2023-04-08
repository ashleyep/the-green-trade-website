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
  <h1 class = 'header'> Who Are We ?</h1>
  <div className = "info">
    <p> We believe that fashion should not come at the expense of our planet. That's why we're committed to promoting the reuse and recycling of clothes.
        Our platform allows people to trade clothes with people nearby, preventing high clothing consumption while still allowing people to revamp their wardrobe. 
        By promoting a culture of conscious consumption, we hope to reduce the environmental impact of the fashion industry and create a more sustainable future for all.</p>
  </div>
  <div className = 'imageBox'>
    <img class ='profile' src = {HandEarth}></img>
    <img class ='profile' src = {HandEarth}></img>
    <img class ='profile' src = {HandEarth}></img>
    <img class ='profile' src = {HandEarth}></img>
    <img class ='profile' src = {HandEarth}></img>
  </div>
  </div>

  
    
 
  )
}

export default Home;