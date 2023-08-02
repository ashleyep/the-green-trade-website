import React, { useState } from "react";

const TeamMember = ({ name, image, description }) => {
  const [showText, setShowText] = useState(false);

  const toggleText = () => {
    setShowText(!showText);
  };

  return (
    <div className="profileCard" onClick={toggleText}>
      <h3>{name}</h3>
      <img className="profile" src={image} alt={name} />
      {showText && <p>{description}</p>}
    </div>
  );
};

export default TeamMember;
