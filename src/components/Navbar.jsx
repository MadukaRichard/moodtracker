import React, { useEffect, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { FiBell, FiMoon, FiSun, FiUser } from "react-icons/fi";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
    <p className='text-[rgb(89,81,232)] text-3xl font-semibold'>MoodMate</p>

    <div className="centre">
      {/* Client's Username */}
      <p className='text-lg font-semibold'>Dhukar</p>
    </div>

    <div className="end flex items-center gap-4">
      <div className="search-input flex items-center gap-2 border  rounded-4xl px-2 py-1">
    <button className="p-2 rounded-md hover:bg-gray-100">
      <FiSearch size={20} />
    </button>
    <input type="text"  placeholder='Search entries' className='outline-0'/>
      </div>
    <div className="end-end flex items-center gap-2">
      <button
        type="button"
        aria-label="Notifications"
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <FiBell size={20} />
      </button>
      <button
        type="button"
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={() => setIsDarkMode((prev) => !prev)}
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>
      <button
        type="button"
        aria-label="Profile"
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <FiUser size={20} />
      </button>
    </div>
    </div>
    </div>
  )
}

export default Navbar