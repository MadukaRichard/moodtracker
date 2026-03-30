import React, { useState } from "react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";

const Signin = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-all duration-500">

      {/* Card */}
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-2xl rounded-3xl p-8 transition-all duration-300">

        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
            🙂
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            {isLogin
              ? "Login to continue tracking your mood"
              : "Start your emotional wellness journey"}
          </p>
        </div>

        {/* Toggle */}
        <div className="relative flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-full py-2 text-sm font-semibold rounded-lg transition-all ${
              isLogin
                ? "bg-white dark:bg-gray-900 shadow text-blue-600"
                : "text-gray-500"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`w-full py-2 text-sm font-semibold rounded-lg transition-all ${
              !isLogin
                ? "bg-white dark:bg-gray-900 shadow text-blue-600"
                : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <div className="space-y-5">

          {!isLogin && (
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Nickname
              </label>

              <div className="relative">
                <FiUser className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="How should we call you?"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Email
            </label>

            <div className="relative">
              <FiMail className="absolute left-4 top-4 text-gray-400" />
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Password
            </label>

            <div className="relative">
              <FiLock className="absolute left-4 top-4 text-gray-400" />
              <input
                type="password"
                placeholder="Enter password"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Confirm Password
              </label>

              <div className="relative">
                <FiLock className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
            </div>
          )}

          {isLogin && (
            <div className="flex justify-end">
              <button className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          {/* Button */}
          <button className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg transition active:scale-[0.98]">
            {isLogin ? "Sign In" : "Create Account"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          </div>

          {/* Social login placeholder */}
          <button className="w-full py-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            Continue with Google
          </button>

        </div>
      </div>
    </div>
  );
};

export default Signin;