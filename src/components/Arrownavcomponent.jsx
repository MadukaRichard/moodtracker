import React from 'react';
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const Arrownavcomponent = ({ className }) => {
  const navigate = useNavigate();
  return (
    <div className={`flex justify-between items-center ${className || ''}`}>
      <button onClick={() => navigate(-1)} aria-label="Go back">
        <FiArrowLeft size={24} />
      </button>
      <button
        onClick={() => navigate('/dashboard')}
        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        Skip
      </button>
    </div>
  );
};

export default Arrownavcomponent;
