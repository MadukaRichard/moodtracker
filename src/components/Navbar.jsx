import React, { useEffect, useState } from 'react';
import { FiSearch, FiBell, FiMoon, FiSun, FiUser, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains('dark')
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-4 lg:px-6">

        {/* Logo */}
        <p className="text-[rgb(89,81,232)] text-2xl md:text-3xl font-bold tracking-tight">
          MoodMate
        </p>

        {/* Centre username — hidden on mobile */}

        {/* Desktop right controls */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-600 rounded-full px-3 py-1.5 bg-gray-50 dark:bg-gray-700">
            <FiSearch size={16} className="text-gray-500 dark:text-gray-300 shrink-0" />
            <input
              type="text"
              placeholder="Search entries"
              className="outline-none bg-transparent text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 w-36 lg:w-48"
            />
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FiBell size={20} />
          </button>

          <button
            type="button"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <button
            type="button"
            aria-label="Profile"
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FiUser size={20} />
          </button>
        </div>

        {/* Mobile right controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            aria-label="Toggle search"
            onClick={() => setIsSearchOpen((v) => !v)}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FiSearch size={20} />
          </button>

          <button
            type="button"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((v) => !v)}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile expandable search */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-600 rounded-full px-3 py-2 bg-gray-50 dark:bg-gray-700">
            <FiSearch size={16} className="text-gray-500 dark:text-gray-300 shrink-0" />
            <input
              type="text"
              placeholder="Search entries"
              autoFocus
              className="outline-none bg-transparent text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 w-full"
            />
          </div>
        </div>
      )}

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-700 px-4 py-3 flex flex-col gap-1 bg-white dark:bg-gray-800">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Signed in as <span className="text-gray-800 dark:text-gray-100">Dhukar</span>
          </p>
          <button
            type="button"
            className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <FiBell size={18} />
            <span className="font-medium">Notifications</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <FiUser size={18} />
            <span className="font-medium">Profile</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
