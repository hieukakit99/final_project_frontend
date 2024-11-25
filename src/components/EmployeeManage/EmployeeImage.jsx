import React from "react";
import "./EmployeeImage.css";

const EmployeeImage = ({ imageUrl, name }) => {
  return (
    <div className="employee-image-container">
      <img src={imageUrl} alt={name} className="employee-image" />
    </div>
  );
};

export default EmployeeImage;
