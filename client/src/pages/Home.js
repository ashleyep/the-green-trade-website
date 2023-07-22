import React from "react";
import "../styles/Home.css";
import celina from "../assets/celina.png";
import ashley from "../assets/ashley.png";
import jennifer from "../assets/jennifer.png";
import jane from "../assets/jane.png";
import joan from "../assets/joan.png";
import { Link } from "react-router-dom";
// import post1 from './assets/post1.JPG';
// import post2 from './assets/post2.jpg';

function Home() {
  return (
    <div className="body">
      <div className="about-container">
        <h1 class="about">A NO COST, GREEN ALTERNATIVE TO SHOPPING</h1>
      </div>
      <div className="button-container">
        <Link to="/login" className="startedBtn" href="Login.js">
          {" "}
          LET'S GET STARTED{" "}
        </Link>
      </div>
      <div className="header-container">
        <h1 class="header">About Us</h1>
      </div>
      <div className="info-container">
        <div className="info">
          <p>
            {" "}
            We believe that fashion should not come at the expense of our
            planet. That's why we're committed to promoting the reuse and
            recycling of clothes. Our platform allows people to trade clothes
            with people nearby, preventing high clothing consumption while still
            allowing people to revamp their wardrobe.
          </p>
        </div>
      </div>
      {/* By promoting a culture of conscious consumption, we hope to reduce the environmental impact of the fashion industry and create a more sustainable future for all.   */}
      <div className="imageBox">
        <div class="profileCard">
          <h3>Ashley</h3>
          <p> Project Lead: Developer</p>
          <img class="profile" src={ashley}></img>
        </div>
        <div class="profileCard">
          <h3>Celina</h3>
          <p>Developer</p>
          <img class="profile" src={celina}></img>
        </div>
        <div class="profileCard">
          <h3>Jane</h3>
          <p>Developer & Designer</p>
          <img class="profile" src={jane}></img>
        </div>
        <div class="profileCard">
          <h3>Joan</h3>
          <p>UI/UX Design</p>
          <img class="profile" src={joan}></img>
        </div>
        <div class="profileCard">
          <h3>Jennifer</h3>
          <p>Developer</p>
          <img class="profile" src={jennifer}></img>
        </div>

        {/* <img class ='profile' src = {HandEarth}></img> */}
      </div>
    </div>
  );
}

export default Home;
