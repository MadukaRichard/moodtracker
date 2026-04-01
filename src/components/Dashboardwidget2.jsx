import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Arrownavcomponent from './Arrownavcomponent';
import { IoMdMale } from "react-icons/io";
import { IoFemaleSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { HiMiniUserGroup } from "react-icons/hi2";
import { GrLinkNext } from "react-icons/gr";

const genderOptions = [
  { value: 'female', label: 'Female', icon: IoFemaleSharp },
  { value: 'male', label: 'Male', icon: IoMdMale },
  { value: 'non-binary', label: 'Non-binary', icon: HiMiniUserGroup },
  { value: 'prefer-not-to-say', label: 'Prefer not to say', icon: BsFillEyeSlashFill },
];

const Dashboardwidget2 = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState('');

  return (
    <div className='p-4 bg-[linear-gradient(135deg,_rgba(140,149,251,0.2)_0%,_rgba(234,221,255,0.2)_100%)] min-h-screen'>
      <Arrownavcomponent className="mb-5" />
      <span className="font-label text-xs uppercase tracking-[0.1em] text-outline font-bold mt-2">Step 02 of 3</span>
      <h1 className="font-headline text-4xl font-bold tracking-tight text-on-surface leading-tight">
        What is your gender identity?
      </h1>

      {genderOptions.map(({ value, label, icon: Icon }) => (
        <div
          key={value}
          className={`rounded-full shadow-md p-7 mt-6 flex items-center justify-between cursor-pointer transition-colors duration-200
            ${selectedGender === value
              ? 'bg-[#4c55b6] text-white'
              : 'bg-white dark:bg-gray-800'
            }`}
          onClick={() => setSelectedGender(value)}
        >
          <div className='flex gap-3 items-center'>
            <Icon className='text-xl' />
            <p className='font-bold'>{label}</p>
          </div>
          <input
            type="radio"
            name="gender"
            value={value}
            checked={selectedGender === value}
            onChange={() => setSelectedGender(value)}
            className="w-5 h-5 accent-[#4c55b6] cursor-pointer transition-all duration-200 hover:scale-110 focus:ring-[#4c55b6] focus:ring-offset-2"
          />
        </div>
      ))}

      <div className="flex justify-center mt-8 mb-3 ">
        <button
          className='text-white bg-[linear-gradient(135deg,_#8c95fb_0%,_#eaddff_100%)] px-6 py-4 rounded-full font-semibold hover:bg-[#3a449c] transition-colors duration-300 w-full text-xl shadow-lg'
          onClick={() => navigate('/dashboard/step3')}
        >
          <div className='flex items-center gap-2 justify-center'>
            Continue <GrLinkNext />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Dashboardwidget2;