import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import {
  FiHome, FiClock, FiMessageCircle, FiUser, FiSettings, FiHelpCircle,
  FiPlusCircle, FiChevronRight, FiTrendingUp, FiCalendar, FiSmile,
  FiActivity, FiCheckCircle, FiX,
} from 'react-icons/fi';
import { MdOutlineDashboard } from 'react-icons/md';
import Moodinput from './Moodinput';

const sidebarLinks = [
  { label: 'Dashboard', icon: MdOutlineDashboard, active: true, path: '/dashboard' },
  { label: 'History',   icon: FiClock,            path: '/history' },
  { label: 'Chat',      icon: FiMessageCircle,    path: '/chat' },
  { label: 'Profile',   icon: FiUser,             path: '/profile' },
];

const utilityLinks = [
  { label: 'Settings', icon: FiSettings,  path: '/settings' },
  { label: 'Help',     icon: FiHelpCircle, path: '/help' },
];

const moodData = [7, 8, 6, 9, 7, 8, 9];
const days    = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Dashboard = () => {
  const [hoveredCard, setHoveredCard]   = useState(null);
  const [sidebarOpen, setSidebarOpen]   = useState(false);

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    const handler = (e) => {
      if (sidebarOpen && !e.target.closest('#mobile-sidebar') && !e.target.closest('#sidebar-toggle')) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [sidebarOpen]);

  const SidebarContent = ({ onNavigate }) => (
    <div className="flex flex-col justify-between h-full">
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
              onClick={onNavigate}
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
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[rgb(89,81,232)] to-indigo-600 px-4 py-3 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
        >
          <FiPlusCircle className="text-lg" />
          Log Mood
        </button>

        <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl p-4">
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-1">💡 Pro Tip</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Log your mood daily for better insights and personalized recommendations.
          </p>
        </div>

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
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50/30 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      {/* ── Mobile sidebar overlay ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" aria-hidden="true" />
      )}

      {/* ── Mobile slide-in sidebar ── */}
      <aside
        id="mobile-sidebar"
        className={`
          fixed top-0 left-0 z-50 h-full w-72 bg-white dark:bg-gray-800 shadow-2xl p-5
          transform transition-transform duration-300 lg:hidden
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <FiX size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
        <div className="mt-10 h-[calc(100%-3rem)] overflow-y-auto">
          <SidebarContent onNavigate={() => setSidebarOpen(false)} />
        </div>
      </aside>

      <div className="w-full mx-auto px-4 py-4 md:px-6">

        {/* ── Mobile top bar (hamburger + Log Mood) ── */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <button
            id="sidebar-toggle"
            type="button"
            aria-label="Open navigation"
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <MdOutlineDashboard className="text-[rgb(89,81,232)] text-lg" />
            Menu
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[rgb(89,81,232)] to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-md transition-all active:scale-95"
          >
            <FiPlusCircle />
            Log Mood
          </button>
        </div>

        {/* ── 3-column layout on lg+ ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] xl:grid-cols-[280px_1fr_340px] gap-5">

          {/* LEFT SIDEBAR — desktop only */}
          <aside className="hidden lg:flex flex-col bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-lg border border-white/70 dark:border-gray-700 p-5 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto transition-all duration-300 hover:shadow-xl">
            <SidebarContent onNavigate={() => {}} />
          </aside>

          {/* MAIN CONTENT */}
          <main className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-lg border border-white/70 dark:border-gray-700 p-4 sm:p-6 md:p-8 transition-all duration-300 min-w-0">

            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(89,81,232)] flex items-center gap-2">
                  <FiCalendar className="inline shrink-0" />
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  How are you feeling?
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-lg">
                  Track your mood, review your progress, and keep your routine consistent.
                </p>
              </div>
              <button
                type="button"
                className="self-start inline-flex items-center gap-2 rounded-2xl border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 active:scale-95 shrink-0 text-gray-700 dark:text-gray-200"
              >
                <FiHome className="text-[rgb(89,81,232)]" />
                Overview
              </button>
            </div>

            {/* Stats cards */}
            <div className="mt-6 sm:mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: 'Mood Check-ins',        value: '12',  trend: '+3 from last week',  description: 'This week',       icon: FiClock,          color: 'from-blue-500 to-cyan-500' },
                { title: 'Support Chats',          value: '5',   trend: '+2 from last week',  description: 'Completed',       icon: FiMessageCircle,  color: 'from-purple-500 to-pink-500' },
                { title: 'Profile Completeness',   value: '84%', trend: '+16% this month',    description: 'Updated details', icon: FiUser,           color: 'from-green-500 to-emerald-500' },
              ].map(({ title, value, trend, description, icon: Icon }, idx) => (
                <div
                  key={title}
                  className="group relative rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 p-5 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium truncate">{title}</p>
                      <h3 className="mt-2 text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        {value}
                      </h3>
                      {hoveredCard === idx && (
                        <p className="mt-2 text-xs text-green-600 dark:text-green-400">{trend}</p>
                      )}
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>
                    </div>
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgb(89,81,232)]/10 to-indigo-500/10 group-hover:scale-110 transition-transform duration-300 shrink-0">
                      <Icon className="text-xl sm:text-2xl text-[rgb(89,81,232)]" />
                    </div>
                  </div>
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

            {/* Mood trend chart */}
            <div className="mt-6 sm:mt-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800 p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
                    <FiTrendingUp className="text-[rgb(89,81,232)] shrink-0" />
                    Mood Trend (Last 7 Days)
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Your emotional journey this week</p>
                </div>
                <select className="self-start text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-[rgb(89,81,232)]/40">
                  <option>This Week</option>
                  <option>Last Month</option>
                  <option>Last 3 Months</option>
                </select>
              </div>

              <div className="flex items-end justify-between gap-1 sm:gap-3 h-40 sm:h-56 md:h-64">
                {moodData.map((val, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1 sm:gap-2 group min-w-0">
                    <div
                      className="w-full bg-gradient-to-t from-[rgb(89,81,232)] to-indigo-500 rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer relative"
                      style={{ height: `${(val / 10) * 100}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {val}/10
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{days[index]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick action banner */}
            <section className="mt-6 sm:mt-8 rounded-3xl bg-gradient-to-r from-[rgb(89,81,232)] via-indigo-600 to-purple-600 p-5 sm:p-6 text-white shadow-xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000 pointer-events-none" />
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/80 flex items-center gap-2">
                    <FiSmile className="text-base sm:text-lg shrink-0" />
                    Quick action
                  </p>
                  <h3 className="mt-2 text-xl sm:text-2xl font-bold">Log a mood in under 10 seconds</h3>
                  <p className="mt-2 text-sm sm:text-base text-white/85">Keep your streak alive and get more accurate insights.</p>
                </div>
                <button
                  type="button"
                  className="self-start sm:self-center rounded-2xl bg-white px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-[rgb(89,81,232)] shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base shrink-0"
                >
                  Start now →
                </button>
              </div>
            </section>
          </main>

          <Moodinput />


          {/* RIGHT SIDEBAR */}
          <aside className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-lg border border-white/70 dark:border-gray-700 p-4 sm:p-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto transition-all duration-300 hover:shadow-xl min-w-0">

            {/* Profile */}
            <div>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[rgb(89,81,232)] flex items-center gap-2">
                <FiUser className="text-sm shrink-0" />
                Profile
              </p>
              <div className="mt-4 flex items-center gap-4 flex-wrap">
                <div className="relative shrink-0">
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-r from-[rgb(89,81,232)] to-indigo-600 text-xl sm:text-2xl font-bold text-white shadow-lg">
                    D
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">Dhukar</h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Member since {new Date().getFullYear()}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                    <FiActivity className="text-xs shrink-0" />
                    Active today
                  </p>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl p-3 text-center">
                <p className="text-2xl font-bold text-[rgb(89,81,232)]">12</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Total Logs</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-2xl p-3 text-center">
                <p className="text-2xl font-bold text-purple-600">7</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Day Streak</p>
              </div>
            </div>

            {/* Recent activity */}
            <div className="mt-6 sm:mt-8 space-y-3">
              <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                Recent activity
              </h4>
              <div className="space-y-2">
                {[
                  { text: 'Mood logged this morning',         time: '2 hours ago',  icon: FiSmile },
                  { text: 'Completed onboarding questions',   time: 'Yesterday',    icon: FiCheckCircle },
                  { text: 'Opened support chat',              time: '2 days ago',   icon: FiMessageCircle },
                ].map(({ text, time, icon: Icon }) => (
                  <div
                    key={text}
                    className="rounded-2xl border border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="text-[rgb(89,81,232)] mt-0.5 text-sm shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium leading-snug">{text}</p>
                        <p className="text-xs text-gray-500 mt-1">{time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily quote */}
            <div className="mt-5 sm:mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                  "Your mood is your greatest teacher. Listen to it daily."
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;