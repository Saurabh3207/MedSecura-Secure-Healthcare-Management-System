import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ text }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back one step
  };

  return (
    <button onClick={goBack} className="flex items-center space-x-2 text-purple-700">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <path fill="currentColor" d="M13 19L2 12l11-7l-3.425 6H22v2H9.575z"/>
      </svg>
      <span>{text}</span>
    </button>
  );
};

export default BackButton;
