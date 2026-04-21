import React, { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';

const Moodinput = ({ isOpen, onClose, onMoodSelect }) => {
  const [mood, setMood] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const moods = [
    { emoji: '😊', label: 'happy', color: 'hover:bg-yellow-100', bg: 'bg-yellow-50' },
    { emoji: '😢', label: 'sad', color: 'hover:bg-blue-100', bg: 'bg-blue-50' },
    { emoji: '😠', label: 'angry', color: 'hover:bg-red-100', bg: 'bg-red-50' },
    { emoji: '😰', label: 'anxious', color: 'hover:bg-purple-100', bg: 'bg-purple-50' },
    { emoji: '🤩', label: 'excited', color: 'hover:bg-green-100', bg: 'bg-green-100' },
    { emoji: '😐', label: 'neutral', color: 'hover:bg-gray-100', bg: 'bg-gray-50' },
  ];

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
    setIsSubmitted(true);
    if (onMoodSelect) {
      onMoodSelect(selectedMood);
    }
    // Auto close after 2 seconds
    setTimeout(() => {
      if (onClose) onClose();
      setIsSubmitted(false);
      setMood('');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative animate-fade-in">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FiX size={24} />
        </button>

        {!isSubmitted ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              How do you feel today?
            </h1>
            <p className="text-center text-gray-500 mb-8">Select your current mood</p>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              {moods.map((m) => (
                <button
                  key={m.label}
                  onClick={() => handleMoodSelect(m.label)}
                  className={`${m.bg} hover:${m.color} p-4 rounded-xl text-4xl transition-all duration-200 transform hover:scale-110 hover:shadow-lg`}
                  aria-label={`Select ${m.label} mood`}
                >
                  {m.emoji}
                  <span className="block text-xs text-gray-600 mt-2 capitalize">{m.label}</span>
                </button>
              ))}
              <button 
                aria-label="Add custom mood"
                className="bg-gray-50 hover:bg-gray-100 p-4 rounded-xl text-2xl transition-all duration-200 transform hover:scale-110 flex flex-col items-center justify-center gap-2"
              >
                <FiPlus size={24} className="text-gray-500" />
                <span className="text-xs text-gray-600">Custom</span>
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8 animate-bounce-in">
            <div className="text-6xl mb-4">
              {moods.find(m => m.label === mood)?.emoji || '🎉'}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Thanks for sharing!
            </h2>
            <p className="text-gray-600">
              You're feeling <span className="font-semibold capitalize text-purple-600">{mood}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Parent component with Start Now button
const MoodTracker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);

  const handleStartNow = () => {
    setIsModalOpen(true);
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    console.log('User selected mood:', mood);
    // You can save to localStorage or send to backend here
    localStorage.setItem('todayMood', mood);
    localStorage.setItem('moodDate', new Date().toDateString());
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {!selectedMood ? (
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Mood Tracker
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Track your emotions and understand yourself better
            </p>
            <button
              onClick={handleStartNow}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Start Now ✨
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-xl">
              <div className="text-6xl mb-4">
                {moods.find(m => m.label === selectedMood)?.emoji}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Today's Mood: {selectedMood}
              </h2>
              <p className="text-gray-600 mb-6">
                Thanks for checking in! Come back tomorrow to track your mood again.
              </p>
              <button
                onClick={() => {
                  setSelectedMood(null);
                  setIsModalOpen(false);
                }}
                className="px-6 py-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors"
              >
                Track Another Day
              </button>
            </div>
          </div>
        )}
      </div>

      <Moodinput 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onMoodSelect={handleMoodSelect}
      />
    </div>
  );
};

// Add these styles to your global CSS or tailwind.config.js
const styles = `
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0.3);
      opacity: 0;
    }
    50% {
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }

  .animate-bounce-in {
    animation: bounce-in 0.5s ease-out;
  }
`;

// Add styles to document if needed
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default MoodTracker;
export { Moodinput };