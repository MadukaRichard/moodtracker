import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Arrownavcomponent from './Arrownavcomponent';
import { GrLinkNext } from "react-icons/gr";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineVerifiedUser } from "react-icons/md";

const AGE_RANGES = ['18-24', '25-34', '35-44', '45-54', '55+'];

const Dashboardwidget = () => {
  const navigate = useNavigate();
  const [selectedAge, setSelectedAge] = useState('');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isDesktop && selectedAge && e.key === 'Enter') {
        navigate('/dashboard/step2');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedAge, navigate, isDesktop]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50">
      {/* Main Container */}
      <div className={`
        mx-auto transition-all duration-300
        ${isDesktop ? 'container px-8 py-12 max-w-7xl' : 'w-full max-w-lg p-6 sm:p-10'}
      `}>
        <Arrownavcomponent className="mb-5" />
        
        {/* Responsive Grid */}
        <div className={isDesktop ? 'grid lg:grid-cols-2 gap-12 items-start mt-8' : ''}>
          
          {/* Left Column - Desktop Only */}
          {isDesktop && (
            <div className="sticky top-12 space-y-6 animate-fade-in">
              <div>
                <h1 className="text-7xl bg-gradient-to-r from-[#4c55b6] to-[#6b73d4] bg-clip-text text-transparent font-bold tracking-tight leading-tight">
                  Welcome to MoodMate
                </h1>
                <p className="text-xl text-gray-600 mt-4 leading-relaxed">
                  Let's personalize your journey.
                </p>
              </div>
              
              {/* Feature Cards */}
              <div className="space-y-4">
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                    <HiOutlineLightBulb className="text-2xl text-indigo-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Why we ask?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your age helps us provide more relevant mood tracking insights 
                    and personalized recommendations tailored to your life stage.
                  </p>
                </div>
                
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <MdOutlineVerifiedUser className="text-2xl text-purple-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Privacy First</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your data is completely anonymous and used only to improve your experience.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Right Column - Question Card */}
          <div className={`
            ${isDesktop 
              ? 'bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8' 
              : ''
            }
          `}>
            {/* Mobile Header */}
            {!isDesktop && (
              <div className="mb-6">
                <h1 className="text-5xl bg-gradient-to-r from-[#4c55b6] to-[#6b73d4] bg-clip-text text-transparent font-bold tracking-tight leading-tight">
                  Welcome to MoodMate
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                  Let's personalize your journey.
                </p>
              </div>
            )}
            
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  Question 1 of 3
                </span>
                {isDesktop && (
                  <span className="text-sm text-gray-500">
                    Step 1/3
                  </span>
                )}
              </div>
              <h2 className={`${isDesktop ? 'text-3xl' : 'text-2xl'} font-bold text-gray-800 mt-2`}>
                How old are you?
              </h2>
            </div>

            {/* Age Options */}
            <div className={`grid gap-3 mb-8 ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {AGE_RANGES.map((age) => (
                <button
                  key={age}
                  onClick={() => setSelectedAge(age)}
                  className={`
                    group relative py-4 px-6 rounded-xl font-medium text-center
                    transition-all duration-200
                    ${selectedAge === age
                      ? 'bg-[#4c55b6] text-white shadow-lg ring-2 ring-[#4c55b6] ring-offset-2'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                    }
                    ${isDesktop ? 'text-lg' : 'text-base'}
                  `}
                >
                  {age}
                  {selectedAge === age && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Continue Button */}
            <button
              disabled={!selectedAge}
              onClick={() => navigate('/onboarding/gender')}
              className={`
                group relative bg-[#4c55b6] text-white px-8 py-4 rounded-xl font-semibold
                transition-all duration-200 w-full flex items-center justify-center gap-3
                hover:bg-[#3a449c] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
                active:scale-95
                ${isDesktop ? 'text-lg max-w-md mx-auto' : 'text-xl'}
              `}
            >
              Continue
              <GrLinkNext className="text-xl group-hover:translate-x-1 transition-transform" />
            </button>
            
            {/* Desktop Progress Steps */}
            {isDesktop && (
              <div className="mt-10 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#4c55b6] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div className="h-0.5 w-12 bg-[#4c55b6]"></div>
                    <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div className="h-0.5 w-12 bg-gray-200"></div>
                    <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedAge ? '✓ Age selected' : 'Select your age'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Keyboard Shortcut Hint */}
      {isDesktop && selectedAge && (
        <div className="fixed bottom-6 right-6 animate-pulse">
          <div className="bg-gray-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center gap-2">
            <kbd className="px-2 py-1 bg-gray-700 rounded text-xs font-mono">⏎</kbd>
            <span>Press Enter to continue</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboardwidget;