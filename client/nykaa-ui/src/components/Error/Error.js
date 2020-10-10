import React from "react";
import svg from "../../nykaa_logo.svg";
import "./Error.css";

const Error = () => {
  return (
    <div className="errorContainer">
      <img src={svg} alt="Nykaa" />
      <h1>Error !</h1>
      <p>
        Something is technically wrong, we are going to fix it up and have
        things back to normal soon.
      </p>
    </div>
  );
};

export default Error;
