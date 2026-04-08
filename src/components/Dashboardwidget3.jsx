  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import Arrownavcomponent from './Arrownavcomponent';
  import { BsEmojiSmile, BsListCheck } from "react-icons/bs";
  import { MdSelfImprovement, MdAutorenew } from "react-icons/md";
  import { GiMeditation } from "react-icons/gi";
  import { RiMentalHealthLine, RiSparklingLine } from "react-icons/ri";
  import { GrLinkNext } from "react-icons/gr";
  import { FaCheckCircle } from "react-icons/fa";

  const goalOptions = [
    { value: 'track-moods', label: 'Track Moods', category: 'MOOD', icon: BsEmojiSmile, color: 'hover:bg-yellow-50', borderColor: 'hover:border-yellow-400' },
    { value: 'manage-stress', label: 'Manage Stress', category: 'WELLNESS', icon: MdSelfImprovement, color: 'hover:bg-green-50', borderColor: 'hover:border-green-400' },
    { value: 'daily-motivation', label: 'Daily Motivation', category: 'SPIRIT', icon: GiMeditation, color: 'hover:bg-purple-50', borderColor: 'hover:border-purple-400' },
    { value: 'talk-therapist', label: 'Talk to a Therapist', category: 'SUPPORT', icon: RiMentalHealthLine, color: 'hover:bg-blue-50', borderColor: 'hover:border-blue-400' },
  ];

  const Dashboardwidget3 = () => {
    const navigate = useNavigate();
    const [selectedGoals, setSelectedGoals] = useState([]);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 1024);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleGoal = (value) => {
      setSelectedGoals((prev) =>
        prev.includes(value) ? prev.filter((g) => g !== value) : [...prev, value]
      );
    };

    // Handle keyboard navigation
    useEffect(() => {
      const handleKeyPress = (e) => {
        if (isDesktop && selectedGoals.length > 0 && e.key === 'Enter') {
          navigate('/');
        }
      };
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedGoals, navigate, isDesktop]);

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
                    Set Your Goals
                  </h1>
                  <p className="text-xl text-gray-600 mt-4 leading-relaxed">
                    Choose what matters most to you
                  </p>
                </div>
                
                {/* Information Cards */}
                <div className="space-y-4">
                  <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                      <BsListCheck className="text-2xl text-indigo-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Multiple Goals</h3>
                    <p className="text-gray-600 leading-relaxed">
                      You can choose one or more goals. We'll tailor your experience based on your selections.
                    </p>
                  </div>
                  
                  <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                      <RiSparklingLine className="text-2xl text-purple-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Personalized Journey</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Your goals will shape your personalized mood tracking and wellness recommendations.
                    </p>
                  </div>
                  
                  <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                      <MdAutorenew className="text-2xl text-green-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">You Can Always Change</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Don't worry - you can update your goals anytime in your profile settings.
                    </p>
                  </div>
                </div>
                
                {/* Selected Goals Counter */}
                {selectedGoals.length > 0 && (
                  <div className="bg-[#4c55b6]/10 backdrop-blur-sm rounded-xl p-4 border border-[#4c55b6]/20">
                    <p className="text-sm font-semibold text-[#4c55b6]">
                      Selected Goals: {selectedGoals.length}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedGoals.map(goal => {
                        const goalOption = goalOptions.find(g => g.value === goal);
                        return (
                          <span key={goal} className="text-xs bg-white rounded-full px-3 py-1 text-[#4c55b6] font-medium">
                            {goalOption?.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
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
                    Set Your Goals
                  </h1>
                  <p className="text-lg text-gray-600 mt-2">
                    Choose what matters most to you
                  </p>
                </div>
              )}
              
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    Question 3 of 3
                  </span>
                  {isDesktop && (
                    <span className="text-sm text-gray-500">
                      Final Step
                    </span>
                  )}
                </div>
                <h2 className={`${isDesktop ? 'text-3xl' : 'text-4xl'} font-bold text-gray-800 mt-2`}>
                  What are your primary goals?
                </h2>
                {isDesktop && (
                  <p className="text-gray-500 mt-2">
                    Select one or more goals (you can choose multiple)
                  </p>
                )}
              </div>

              {/* Goal Options - Desktop Grid Layout */}
              <div className={`grid gap-4 my-8 ${isDesktop ? 'grid-cols-1' : 'grid-cols-1'}`}>
                {goalOptions.map(({ value, label, category, icon: Icon, color, borderColor }) => (
                  <div
                    key={value}
                    onClick={() => toggleGoal(value)}
                    className={`
                      group relative rounded-2xl p-5 cursor-pointer transition-all duration-300
                      ${selectedGoals.includes(value)
                        ? 'bg-[#4c55b6] text-white shadow-lg ring-2 ring-[#4c55b6] ring-offset-2'
                        : `bg-white border-2 border-gray-200 ${color} hover:shadow-md ${borderColor} hover:border-2`
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4 items-center flex-1">
                        <div className={`
                          w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300
                          ${selectedGoals.includes(value)
                            ? 'bg-white/20'
                            : 'bg-gray-100 group-hover:bg-[#4c55b6]/10'
                          }
                        `}>
                          <Icon className={`
                            text-3xl transition-all duration-300
                            ${selectedGoals.includes(value) ? 'text-white' : 'text-gray-600 group-hover:text-[#4c55b6]'}
                          `} />
                        </div>
                        <div className="flex-1">
                          <span className={`
                            text-xs font-bold uppercase tracking-wider
                            ${selectedGoals.includes(value) ? 'text-white/80' : 'text-gray-500'}
                          `}>
                            {category}
                          </span>
                          <p className={`font-bold text-xl ${selectedGoals.includes(value) ? 'text-white' : 'text-gray-800'}`}>
                            {label}
                          </p>
                          {isDesktop && selectedGoals.includes(value) && (
                            <p className="text-sm text-white/80 mt-1">
                              Click to remove
                            </p>
                          )}
                        </div>
                      </div>
                      {selectedGoals.includes(value) && (
                        <FaCheckCircle className={`
                          text-2xl transition-all duration-300
                          ${isDesktop ? 'text-white' : 'text-white'}
                        `} />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote Section - Enhanced for Desktop */}
              <div className={`
                rounded-2xl shadow-md text-center transition-all duration-300
                ${isDesktop 
                  ? 'bg-gradient-to-r from-[#4c55b6]/5 to-purple-500/5 p-6 my-6' 
                  : 'bg-white/40 p-6 my-4'
                }
              `}>
                <p className="italic text-gray-600 dark:text-gray-300 text-lg">
                  "Every journey begins with a single step towards your own inner peace"
                </p>
                {isDesktop && (
                  <p className="text-sm text-gray-400 mt-2">
                    - Your journey starts here
                  </p>
                )}
              </div>

              {/* Continue Button */}
              <button
                disabled={selectedGoals.length === 0}
                onClick={() => navigate('/')}
                className={`
                  group relative bg-[#4c55b6] text-white px-8 py-4 rounded-xl font-semibold
                  transition-all duration-200 w-full flex items-center justify-center gap-3
                  hover:bg-[#3a449c] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
                  active:scale-95
                  ${isDesktop ? 'text-lg max-w-md mx-auto' : 'text-xl'}
                `}
              >
                {selectedGoals.length === 0 ? 'Select at least one goal' : 'Complete Journey'}
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
                      <div className="h-0.5 w-12 bg-[#4c55b6]"></div>
                      <div className="w-8 h-8 bg-[#4c55b6] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedGoals.length === 0 
                        ? 'Select your goals' 
                        : `✓ ${selectedGoals.length} goal${selectedGoals.length > 1 ? 's' : ''} selected`
                      }
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
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Final Step
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Keyboard Shortcut Hint - Desktop Only */}
        {isDesktop && selectedGoals.length > 0 && (
          <div className="fixed bottom-6 right-6 animate-pulse">
            <div className="bg-gray-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center gap-2">
              <kbd className="px-2 py-1 bg-gray-700 rounded text-xs font-mono">⏎</kbd>
              <span>Press Enter to complete</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Dashboardwidget3;