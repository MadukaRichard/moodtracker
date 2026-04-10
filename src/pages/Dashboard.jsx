import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FiHome, FiClock, FiMessageCircle, FiUser, FiSettings, FiHelpCircle, FiPlusCircle, FiChevronRight, FiTrendingUp, FiCalendar, FiSmile, FiActivity, FiCheckCircle } from 'react-icons/fi';
import { MdOutlineDashboard } from 'react-icons/md';

const sidebarLinks = [
  { label: 'Dashboard', icon: MdOutlineDashboard, active: true, path: '/dashboard' },
  { label: 'History', icon: FiClock, path: '/history' },
  { label: 'Chat', icon: FiMessageCircle, path: '/chat' },
  { label: 'Profile', icon: FiUser, path: '/profile' },
];

const utilityLinks = [
  { label: 'Settings', icon: FiSettings, path: '/settings' },
  { label: 'Help', icon: FiHelpCircle, path: '/help' },
];

const Dashboard = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mock data for charts
  const moodData = [7, 8, 6, 9, 7, 8, 9];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50/30 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <div className={`
        mx-auto transition-all duration-300
        ${isDesktop ? 'container px-6 py-4 max-w-7xl' : 'p-3'}
      `}>
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_340px] gap-6 min-h-[calc(100vh-88px)]">
          
          {/* LEFT SIDEBAR - Enhanced Desktop Version */}
          <aside className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-lg border border-white/70 dark:border-gray-700 p-5 flex flex-col justify-between h-full sticky top-24 transition-all duration-300 hover:shadow-xl">
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[rgb(89,81,232)] font-semibold">MoodMate</p>
                <h1 className="mt-2 text-2xl font-bold bg-gradient-to-r from-[rgb(89,81,232)] to-indigo-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
              </div>

              <nav className="space-y-2">
                {sidebarLinks.map(({ label, icon: Icon, active }) => (
                  <button
                    key={label}
                    type="button"
                    className={`
                      w-full flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-300
                      ${active
                        ? 'bg-gradient-to-r from-[rgb(89,81,232)] to-indigo-600 text-white shadow-md scale-[1.02]'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 hover:translate-x-1'
                      }
                    `}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className={`text-lg ${active ? 'text-white' : ''}`} />
                      <span className="font-medium">{label}</span>
                    </span>
                    {active && <FiChevronRight className="text-lg animate-pulse" />}
                  </button>
                ))}
              </nav>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              {/* Quick Mood Log Button */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[rgb(89,81,232)] to-indigo-600 px-4 py-3 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <FiPlusCircle className="text-lg" />
                Log Mood
              </button>

              {/* Desktop Tip */}
              {isDesktop && (
                <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl p-4 mt-4">
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-1">💡 Pro Tip</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Log your mood daily for better insights and personalized recommendations.
                  </p>
                </div>
              )}

              <div className="space-y-1">
                {utilityLinks.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    type="button"
                    className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:translate-x-1"
                  >
                    <Icon className="text-lg text-[rgb(89,81,232)]" />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT - Enhanced */}
          <main className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-lg border border-white/70 dark:border-gray-700 p-6 md:p-8 transition-all duration-300">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[rgb(89,81,232)] flex items-center gap-2">
                  <FiCalendar className="inline" />
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  How are you feeling?
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-lg">
                  Track your mood, review your progress, and keep your routine consistent.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 dark:border-gray-700 px-5 py-2.5 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <FiHome className="text-lg text-[rgb(89,81,232)]" />
                Overview
              </button>
            </div>

            {/* Stats Cards with Hover Effects */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: 'Mood Check-ins', value: '12', trend: '+3 from last week', description: 'This week', icon: FiClock, color: 'from-blue-500 to-cyan-500' },
                { title: 'Support Chats', value: '5', trend: '+2 from last week', description: 'Completed', icon: FiMessageCircle, color: 'from-purple-500 to-pink-500' },
                { title: 'Profile Completeness', value: '84%', trend: '+16% this month', description: 'Updated details', icon: FiUser, color: 'from-green-500 to-emerald-500' },
              ].map(({ title, value, trend, description, icon: Icon, color }, idx) => (
                <div
                  key={title}
                  className="group relative rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
                      <h3 className="mt-2 text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        {value}
                      </h3>
                      {isDesktop && hoveredCard === idx && (
                        <p className="mt-2 text-xs text-green-600 dark:text-green-400 animate-fadeIn">
                          {trend}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgb(89,81,232)]/10 to-indigo-500/10 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="text-2xl text-[rgb(89,81,232)]" />
                    </div>
                  </div>
                  
                  {/* Progress bar for profile completeness */}
                  {title === 'Profile Completeness' && (
                    <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[rgb(89,81,232)] to-indigo-600 rounded-full transition-all duration-1000"
                        style={{ width: value }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mood Trend Chart - Desktop Only */}
            {isDesktop && (
              <div className="mt-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800 p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <FiTrendingUp className="text-[rgb(89,81,232)]" />
                      Mood Trend (Last 7 Days)
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Your emotional journey this week</p>
                  </div>
                  <select className="text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-800">
                    <option>This Week</option>
                    <option>Last Month</option>
                    <option>Last 3 Months</option>
                  </select>
                </div>
                
                {/* Simple Bar Chart */}
                <div className="flex items-end justify-between gap-3 h-64">
                  {moodData.map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                      <div 
                        className="w-full bg-gradient-to-t from-[rgb(89,81,232)] to-indigo-500 rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer relative"
                        style={{ height: `${(value / 10) * 100}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Mood Score: {value}/10
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{days[index]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Action Banner - Enhanced */}
            <section className="mt-8 rounded-3xl bg-gradient-to-r from-[rgb(89,81,232)] via-indigo-600 to-purple-600 p-6 text-white shadow-xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
              <div className="relative z-10 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-white/80 flex items-center gap-2">
                    <FiSmile className="text-lg" />
                    Quick action
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">Log a mood in under 10 seconds</h3>
                  <p className="mt-2 text-white/85">Keep your streak alive and get more accurate insights.</p>
                </div>
                <button 
                  type="button" 
                  className="rounded-2xl bg-white px-6 py-3 font-semibold text-[rgb(89,81,232)] shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Start now →
                </button>
              </div>
            </section>
          </main>

          {/* RIGHT SIDEBAR - Enhanced */}
          <aside className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-lg border border-white/70 dark:border-gray-700 p-6 h-full sticky top-24 transition-all duration-300 hover:shadow-xl">
            {/* Profile Section */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[rgb(89,81,232)] flex items-center gap-2">
                <FiUser className="text-sm" />
                Profile
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[rgb(89,81,232)] to-indigo-600 text-2xl font-bold text-white shadow-lg">
                    D
                  </div>
                  {isDesktop && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold">Dhukar</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Member since {new Date().getFullYear()}</p>
                  {isDesktop && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                      <FiActivity className="text-xs" />
                      Active today
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Summary - Desktop */}
            {isDesktop && (
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl p-3 text-center">
                  <p className="text-2xl font-bold text-[rgb(89,81,232)]">12</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Total Logs</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 rounded-2xl p-3 text-center">
                  <p className="text-2xl font-bold text-purple-600">7</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Day Streak</p>
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div className="mt-8 space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                Recent activity
              </h4>
              <div className="space-y-2">
                {[
                  { text: 'Mood logged this morning', time: '2 hours ago', icon: FiSmile },
                  { text: 'Completed onboarding questions', time: 'Yesterday', icon: FiCheckCircle },
                  { text: 'Opened support chat', time: '2 days ago', icon: FiMessageCircle },
                ].map(({ text, time, icon: Icon }) => (
                  <div 
                    key={text} 
                    className="rounded-2xl border border-gray-200 dark:border-gray-700 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="text-[rgb(89,81,232)] mt-0.5 text-sm" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">{text}</p>
                        <p className="text-xs text-gray-500 mt-1">{time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Quote - Desktop */}
            {isDesktop && (
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-4">
                  <p className="text-xs text-gray-500 italic">
                    "Your mood is your greatest teacher. Listen to it daily."
                  </p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;