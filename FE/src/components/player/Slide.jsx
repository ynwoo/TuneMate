import React, { useState } from "react";
import "animate.css/animate.min.css";

const SlideUpComponent = () => {
  const [isSlideUp, setIsSlideUp] = useState(false);

  const handleClick = () => {
    setIsSlideUp((prev) => !prev);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: "16px",
        backgroundColor: "#fff", // Adjust as needed
        transition: "bottom 0.5s ease-in-out",
        bottom: isSlideUp ? "100%" : "0", // Set to the height of your container
      }}
      className="animate__animated animate__slideInUp"
      onClick={handleClick}
    >
      player
    </div>
  );
};

export default SlideUpComponent;
