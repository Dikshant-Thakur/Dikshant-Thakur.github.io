import React from "react";
import "../styles/preloader.scss";

const Preloader = ({ isHiding }) => {
  return (
    // Agar isHiding true hoga, toh 'zoom-out' class add ho jayegi
    <div className={`preloader-container ${isHiding ? "zoom-out" : ""}`}>
      <h1 className="animated-text">Dikshant Thakur</h1>
    </div>
  );
};

export default Preloader;