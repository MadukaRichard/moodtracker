import React, { useState } from "react";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userForm, setUserForm] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(userForm.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (isLogin) {
      if (userForm.email === "" || userForm.password === "") {
        alert("Please fill in all fields");
        return;
      }

if (userForm.password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
      }
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");

      if (!storedEmail || !storedPassword) {
        alert("No account found. Please sign up first.");
        return;
      }

      if (userForm.email !== storedEmail) {
        alert("Email not found. Please check your email or sign up.");
        return;
      }

      if (userForm.password !== storedPassword) {
        alert("Incorrect password. Please try again.");
        return;
      }

      navigate("/dashboard");
    } else {
      if (userForm.nickname === "" || userForm.email === "" || userForm.password === "" || userForm.confirmPassword === "") {
        alert("Please fill in all fields");
        return;
      }

      if (userForm.password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
      }

      if (userForm.password !== userForm.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const existingEmail = localStorage.getItem("email");
      if (existingEmail === userForm.email) {
        alert("An account with this email already exists. Please login instead.");
        return;
      }

      localStorage.setItem("nickname", userForm.nickname);
      localStorage.setItem("email", userForm.email);
      localStorage.setItem("password", userForm.password);
      
      navigate("/welcome");
    }
  };

  return (
    <div className="relative z-0 min-h-[100dvh] w-full bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-800 dark:to-indigo-950 overflow-y-auto">
      <div 
        className="hidden sm:block fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-50 dark:opacity-30 mix-blend-overlay"
        style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2019/11/02/20/18/fog-4597348_1280.jpg')" }}
      />

      <div className="flex items-center justify-center min-h-[100dvh] sm:px-4 sm:py-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md sm:bg-white/80 sm:dark:bg-gray-900/80 sm:backdrop-blur-xl sm:border sm:border-gray-200 sm:dark:border-gray-700 sm:shadow-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 text-slate-900 dark:text-white">
          <div className="text-center mb-8">
            <div className={`w-24 h-24 mx-auto mb-4 rounded-2xl bg-white dark:bg-gray-800 sm:bg-white transition-transform duration-500 flex items-center justify-center shadow-lg ${isLogin ? 'rotate-3' : '-rotate-3'}`}>
              <p className="text-5xl">{isLogin ? "🙂" : "😊"}</p>
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

          <div className="relative flex bg-gray-200/50 dark:bg-gray-800/50 sm:bg-gray-100 sm:dark:bg-gray-800 p-1 rounded-xl mb-8">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`w-full py-2.5 text-sm font-semibold rounded-lg transition-all ${
                isLogin ? "bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-white" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`w-full py-2.5 text-sm font-semibold rounded-lg transition-all ${
                !isLogin ? "bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-white" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="space-y-5">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Nickname</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="How should we call you?" 
                    name="nickname" 
                    value={userForm.nickname}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border-white/40 dark:border-gray-700/50 sm:border-gray-300 sm:dark:border-gray-600 bg-white/60 dark:bg-gray-800/60 sm:bg-gray-50 sm:dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  name="email" 
                  value={userForm.email}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border-white/40 dark:border-gray-700/50 sm:border-gray-300 sm:dark:border-gray-600 bg-white/60 dark:bg-gray-800/60 sm:bg-gray-50 sm:dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={userForm.password}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl border-white/40 dark:border-gray-700/50 sm:border-gray-300 sm:dark:border-gray-600 bg-white/60 dark:bg-gray-800/60 sm:bg-gray-50 sm:dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
                <button
                  type="button"
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Confirm Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={userForm.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-11 py-3.5 rounded-xl border-white/40 dark:border-gray-700/50 sm:border-gray-300 sm:dark:border-gray-600 bg-white/60 dark:bg-gray-800/60 sm:bg-gray-50 sm:dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    tabIndex={-1}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-[0_8px_30px_rgb(79,70,229,0.2)] transition active:scale-[0.98]"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>

            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 h-px bg-gray-300/50 dark:bg-gray-700"></div>
              <span className="text-xs font-semibold text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-300/50 dark:bg-gray-700"></div>
            </div>

            <button 
              type="button"
              className="w-full py-3.5 rounded-xl border border-gray-300/50 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 sm:bg-transparent hover:bg-white dark:hover:bg-gray-800 transition font-medium text-sm"
            >
              Continue with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;