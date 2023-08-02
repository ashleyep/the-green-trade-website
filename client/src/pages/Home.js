import React from "react";
import "../styles/Home.css";
import celina from "../assets/celina.png";
import ashley from "../assets/ashley.png";
import jennifer from "../assets/jennifer.png";
import jane from "../assets/jane.png";
import joan from "../assets/joan.png";
import { Link } from "react-router-dom";
import TeamMember from "../components/TeamMember"; // Import the TeamMember component

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
      <div className="header-container">
        <h1 class="header">Our Team</h1>
      </div>
      <div className="imageBox">
        <TeamMember
          name="Ashley"
          image={ashley}
          description="Project Lead: Developer"
        />
        <TeamMember name="Celina" image={celina} description="Developer" />
        <TeamMember name="Jane" image={jane} description="Developer & Designer" />
        <TeamMember name="Joan" image={joan} description="UI/UX Design" />
        <TeamMember name="Jennifer" image={jennifer} description="Developer" />
      </div>
        {/* <img class ='profile' src = {HandEarth}></img> */}
      </div>
  );
}

export default Home;
