import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Arrownavcomponent from './Arrownavcomponent';
import { IoMdMale } from "react-icons/io";
import { IoFemaleSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { HiMiniUserGroup, HiOutlineSparkles } from "react-icons/hi2";
import { GrLinkNext } from "react-icons/gr";
import { MdDiversity3, MdOutlineVerifiedUser } from "react-icons/md";

const genderOptions = [
  { value: 'female', label: 'Female', icon: IoFemaleSharp, color: 'hover:bg-pink-50' },
  { value: 'male', label: 'Male', icon: IoMdMale, color: 'hover:bg-blue-50' },
  { value: 'non-binary', label: 'Non-binary', icon: HiMiniUserGroup, color: 'hover:bg-purple-50' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say', icon: BsFillEyeSlashFill, color: 'hover:bg-gray-50' },
];

const Dashboardwidget2 = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState('');
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
      if (isDesktop && selectedGender && e.key === 'Enter') {
        navigate('/dashboard/step3');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedGender, navigate, isDesktop]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50">
      {/* Main Container */}
      <div className={`
        mx-auto transition-all duration-300
        ${isDesktop ? 'container px-8 py-12 max-w-7xl' : 'w-full max-w-lg p-6 sm:p-10'}
      `}>
        <Arrownavcomponent className="mb-5" />
        
        {/* Desktop: 2-Column Grid, Mobile: Single Column */}
        <div className={isDesktop ? 'grid lg:grid-cols-2 gap-12 items-start mt-8' : ''}>
          
          {/* Left Column - Desktop Only */}
          {isDesktop && (
            <div className="sticky top-12 space-y-6">
              <div>
                <h1 className="text-7xl bg-gradient-to-r from-[#4c55b6] to-[#6b73d4] bg-clip-text text-transparent font-bold tracking-tight leading-tight">
                  Tell us about yourself
                </h1>
                <p className="text-xl text-gray-600 mt-4 leading-relaxed">
                  Help us personalize your experience
                </p>
              </div>
              
              {/* Information Cards */}
              <div className="space-y-4">
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                    <MdDiversity3 className="text-2xl text-indigo-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Inclusive Experience</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We celebrate all identities and provide personalized insights that respect your unique perspective.
                  </p>
                </div>
                
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <HiOutlineSparkles className="text-2xl text-purple-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Better Recommendations</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Understanding your identity helps us provide more relevant mood tracking and wellness suggestions.
                  </p>
                </div>
                
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <MdOutlineVerifiedUser className="text-2xl text-green-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Privacy Matters</h3>
                  <p className="text-gray-600 leading-relaxed">
                    This information is completely optional and will never be shared without your consent.
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
                  Tell us about yourself
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                  Help us personalize your experience
                </p>
              </div>
            )}
            
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  Question 2 of 3
                </span>
                {isDesktop && (
                  <span className="text-sm text-gray-500">
                    Step 2/3
                  </span>
                )}
              </div>
              <h2 className={`${isDesktop ? 'text-3xl' : 'text-4xl'} font-bold text-gray-800 mt-2`}>
                What is your gender identity?
              </h2>
              {isDesktop && (
                <p className="text-gray-500 mt-2">
                  Select the option that best describes you
                </p>
              )}
            </div>

            {/* Gender Options - Desktop Grid Layout */}
            <div className={`grid gap-4 my-8 ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {genderOptions.map(({ value, label, icon: Icon, color }) => (
                <div
                  key={value}
                  className={`
                    group relative rounded-2xl p-5 cursor-pointer transition-all duration-300
                    ${selectedGender === value
                      ? 'bg-[#4c55b6] text-white shadow-lg ring-2 ring-[#4c55b6] ring-offset-2'
                      : `bg-white border-2 border-gray-200 ${color} hover:border-[#4c55b6] hover:shadow-md`
                    }
                  `}
                  onClick={() => setSelectedGender(value)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                        ${selectedGender === value
                          ? 'bg-white/20'
                          : 'bg-gray-100 group-hover:bg-[#4c55b6]/10'
                        }
                      `}>
                        <Icon className={`
                          text-2xl transition-all duration-300
                          ${selectedGender === value ? 'text-white' : 'text-gray-600 group-hover:text-[#4c55b6]'}
                        `} />
                      </div>
                      <p className={`font-bold text-lg ${selectedGender === value ? 'text-white' : 'text-gray-800'}`}>
                        {label}
                      </p>
                    </div>
                    <input
                      type="radio"
                      name="gender"
                      value={value}
                      checked={selectedGender === value}
                      onChange={() => setSelectedGender(value)}
                      className={`
                        w-5 h-5 cursor-pointer transition-all duration-300
                        ${selectedGender === value 
                          ? 'accent-white' 
                          : 'accent-[#4c55b6]'
                        }
                      `}
                      aria-label={label}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Button */}
            <button
              disabled={!selectedGender}
              onClick={() => navigate('/dashboard/step3')}
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
                    <div className="w-8 h-8 bg-[#4c55b6] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div className="h-0.5 w-12 bg-gray-200"></div>
                    <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedGender ? `${genderOptions.find(g => g.value === selectedGender)?.label} selected` : 'Select your gender identity'}
                  </div>
                </div>
              </div>
            )}
            
            {/* Mobile Progress Bar */}
            {!isDesktop && (
              <div className="mt-6 pt-4">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-[#4c55b6] h-2 rounded-full transition-all duration-500"
                    style={{ width: '66.66%' }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Step 2 of 3
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Keyboard Shortcut Hint - Desktop Only */}
      {isDesktop && selectedGender && (
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

export default Dashboardwidget2;