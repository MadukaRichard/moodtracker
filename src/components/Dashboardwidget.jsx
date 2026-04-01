import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Arrownavcomponent from './Arrownavcomponent';
import { GrLinkNext } from "react-icons/gr";

const AGE_RANGES = ['18-24', '25-34', '35-44', '45-54', '55+'];

const Dashboardwidget = () => {
  const navigate = useNavigate();
  const [selectedAge, setSelectedAge] = useState('');

  return (
    <div className='p-4 bg-[linear-gradient(135deg,_rgba(140,149,251,0.2)_0%,_rgba(234,221,255,0.2)_100%)] min-h-screen'>
      <Arrownavcomponent className="mb-5" />

      <h1 className="font-plus-jakarta text-5xl text-[rgb(76,85,181)] font-bold tracking-tight leading-tight mt-5">
        Welcome to MoodMate
      </h1>
      <p className='text-lg text-gray-600 dark:text-gray-300'>
        Let's personalize your journey.
      </p>

      <div className="flex flex-col gap-2 my-4">
        <span className="font-label text-xs uppercase tracking-[0.1em] text-outline font-bold">
          Question 1 of 3
        </span>
        <h2 className="text-2xl font-bold py-1">How old are you?</h2>
      </div>

      <div className="flex gap-3 flex-wrap my-6">
        {AGE_RANGES.map((age) => (
          <button
            key={age}
            onClick={() => setSelectedAge(age)}
            className={`basis-1/2 flex-1 min-w-[45%] py-2 px-6 rounded-full font-medium transition-colors duration-300
              ${selectedAge === age
                ? 'bg-[#4c55b6] text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
          >
            {age}
          </button>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          disabled={!selectedAge}
          onClick={() => navigate('/dashboard/step2')}
          className='text-white bg-[#4c55b6] px-6 py-4 rounded-full font-semibold 
            transition-colors duration-300 w-full text-xl flex items-center justify-center gap-2
            hover:bg-[#3a449c] disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Continue <GrLinkNext />
        </button>
      </div>
    </div>
  );
};

export default Dashboardwidget;