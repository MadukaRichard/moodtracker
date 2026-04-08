import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";
import { GrLinkNext } from "react-icons/gr";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineVerifiedUser, MdDiversity3, MdSelfImprovement, MdAutorenew } from "react-icons/md";
import { IoMdMale } from "react-icons/io";
import { IoFemaleSharp } from "react-icons/io5";
import { BsFillEyeSlashFill, BsEmojiSmile, BsListCheck } from "react-icons/bs";
import { HiMiniUserGroup, HiOutlineSparkles } from "react-icons/hi2";
import { GiMeditation } from "react-icons/gi";
import { RiMentalHealthLine, RiSparklingLine } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";

const AGE_RANGES = ['18-24', '25-34', '35-44', '45-54', '55+'];
const genderOptions = [
  { value: 'female',           label: 'Female',           icon: IoFemaleSharp,      color: 'hover:bg-pink-50'   },
  { value: 'male',             label: 'Male',             icon: IoMdMale,           color: 'hover:bg-blue-50'   },
  { value: 'non-binary',       label: 'Non-binary',       icon: HiMiniUserGroup,    color: 'hover:bg-purple-50' },
  { value: 'prefer-not-to-say',label: 'Prefer not to say',icon: BsFillEyeSlashFill,color: 'hover:bg-gray-50'   },
];
const goalOptions = [
  { value: 'track-moods',       label: 'Track Moods',         category: 'MOOD',     icon: BsEmojiSmile,      color: 'hover:bg-yellow-50', borderColor: 'hover:border-yellow-400' },
  { value: 'manage-stress',     label: 'Manage Stress',       category: 'WELLNESS', icon: MdSelfImprovement, color: 'hover:bg-green-50',  borderColor: 'hover:border-green-400'  },
  { value: 'daily-motivation',  label: 'Daily Motivation',    category: 'SPIRIT',   icon: GiMeditation,      color: 'hover:bg-purple-50', borderColor: 'hover:border-purple-400' },
  { value: 'talk-therapist',    label: 'Talk to a Therapist', category: 'SUPPORT',  icon: RiMentalHealthLine,color: 'hover:bg-blue-50',   borderColor: 'hover:border-blue-400'   },
];

// ─── Shared mini-components ──────────────────────────────────────────────────
const FeatureCard = ({ icon: Icon, iconBg, iconColor, hoverBg, title, body }) => (
  <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-4 ${hoverBg} transition-colors`}>
      <Icon className={`text-2xl ${iconColor}`} />
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{body}</p>
  </div>
);

const ProgressBadge = ({ label, step, isDesktop }) => (
  <div className="mb-6">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{label}</span>
      {isDesktop && <span className="text-sm text-gray-500">{step}</span>}
    </div>
  </div>
);

const MobileProgressBar = ({ pct, label }) => (
  <div className="mt-6 pt-4">
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div className="bg-[#4c55b6] h-2 rounded-full transition-all duration-500" style={{ width: pct }} />
    </div>
    <p className="text-xs text-gray-500 text-center mt-2">{label}</p>
  </div>
);

const StepDots = ({ current }) => (
  <div className="mt-10 pt-6 border-t border-gray-200">
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <React.Fragment key={i}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${i <= current ? 'bg-[#4c55b6] text-white' : 'bg-gray-200 text-gray-500'}`}>{i + 1}</div>
          {i < 2 && <div className={`h-0.5 w-12 transition-all duration-500 ${i < current ? 'bg-[#4c55b6]' : 'bg-gray-200'}`} />}
        </React.Fragment>
      ))}
    </div>
  </div>
);

// ─── Step components ─────────────────────────────────────────────────────────
const Step1 = ({ isDesktop, selectedAge, setSelectedAge }) => (
  <div className={isDesktop ? 'grid lg:grid-cols-2 gap-12 items-start mt-8' : ''}>
    {isDesktop && (
      <div className="sticky top-12 space-y-6">
        <div>
          <h1 className="text-7xl bg-gradient-to-r from-[#4c55b6] to-[#6b73d4] bg-clip-text text-transparent font-bold tracking-tight leading-tight">Welcome to MoodMate</h1>
          <p className="text-xl text-gray-600 mt-4 leading-relaxed">Let's personalize your journey.</p>
        </div>
        <div className="space-y-4">
          <FeatureCard icon={HiOutlineLightBulb} iconBg="bg-indigo-100" iconColor="text-indigo-600" hoverBg="group-hover:bg-indigo-200" title="Why we ask?" body="Your age helps us provide more relevant mood tracking insights and personalized recommendations tailored to your life stage." />
          <FeatureCard icon={MdOutlineVerifiedUser} iconBg="bg-purple-100" iconColor="text-purple-600" hoverBg="group-hover:bg-purple-200" title="Privacy First" body="Your data is completely anonymous and used only to improve your experience." />
        </div>
      </div>
    )}
    <div className={isDesktop ? 'bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8' : ''}>
      {!isDesktop && (
        <div className="mb-6">
          <h1 className="text-5xl bg-gradient-to-r from-[#4c55b6] to-[#6b73d4] bg-clip-text text-transparent font-bold tracking-tight leading-tight">Welcome to MoodMate</h1>
          <p className="text-lg text-gray-600 mt-2">Let's personalize your journey.</p>
        </div>
      )}
      <ProgressBadge label="Question 1 of 3" step="Step 1/3" isDesktop={isDesktop} />
      <h2 className={`${isDesktop ? 'text-3xl' : 'text-2xl'} font-bold text-gray-800 mt-2 mb-8`}>How old are you?</h2>
      <div className={`grid gap-3 mb-8 ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {AGE_RANGES.map((age) => (
          <button key={age} onClick={() => setSelectedAge(age)}
            className={`group relative py-4 px-6 rounded-xl font-medium text-center transition-all duration-200 ${selectedAge === age ? 'bg-[#4c55b6] text-white shadow-lg ring-2 ring-[#4c55b6] ring-offset-2' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'} ${isDesktop ? 'text-lg' : 'text-base'}`}>
            {age}
            {selectedAge === age && <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>}
          </button>
        ))}
      </div>
      {isDesktop && <StepDots current={0} />}
      {!isDesktop && <MobileProgressBar pct="33.33%" label="Step 1 of 3" />}
    </div>
  </div>
);

const Step2 = ({ isDesktop, selectedGender, setSelectedGender }) => (
  <div className={isDesktop ? 'grid lg:grid-cols-2 gap-12 items-start mt-8' : ''}>
    {isDesktop && (
      <div className="sticky top-12 space-y-6">
        <div>
          <h1 className="text-7xl bg-gradient-to-r from-[#4c55b6] to-[#6b73d4] bg-clip-text text-transparent font-bold tracking-tight leading-tight">Tell us about yourself</h1>
          <p className="text-xl text-gray-600 mt-4 leading-relaxed">Help us personalize your experience</p>
        </div>
        <div className="space-y-4">
          <FeatureCard icon={MdDiversity3} iconBg="bg-indigo-100" iconColor="text-indigo-600" hoverBg="group-hover:bg-indigo-200" title="Inclusive Experience" body="We celebrate all identities and provide personalized insights that respect your unique perspective." />
          <FeatureCard icon={HiOutlineSparkles} iconBg="bg-purple-100" iconColor="text-purple-600" hoverBg="group-hover:bg-purple-200" title="Better Recommendations" body="Understanding your identity helps us provide more relevant mood tracking and wellness suggestions." />
          <FeatureCard icon={MdOutlineVerifiedUser} iconBg="bg-green-100" iconColor="text-green-600" hoverBg="group-hover:bg-green-200" title="Your Privacy Matters" body="This information is completely optional and will never be shared without your consent." />
        </div>
      </div>
    )}
    <div className={isDesktop ? 'bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8' : ''}>
      {!isDesktop && (
        <div className="mb-6">
          <h1 className="text-5xl bg-gradient-to-r from-[#4c55b6] to-[#6b73d4] bg-clip-text text-transparent font-bold tracking-tight leading-tight">Tell us about yourself</h1>
          <p className="text-lg text-gray-600 mt-2">Help us personalize your experience</p>
        </div>
      )}
      <ProgressBadge label="Question 2 of 3" step="Step 2/3" isDesktop={isDesktop} />
      <h2 className={`${isDesktop ? 'text-3xl' : 'text-4xl'} font-bold text-gray-800 mt-2 mb-8`}>What is your gender identity?</h2>
      <div className={`grid gap-4 my-8 ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {genderOptions.map(({ value, label, icon: Icon, color }) => (
          <div key={value} onClick={() => setSelectedGender(value)}
            className={`group relative rounded-2xl p-5 cursor-pointer transition-all duration-300 ${selectedGender === value ? 'bg-[#4c55b6] text-white shadow-lg ring-2 ring-[#4c55b6] ring-offset-2' : `bg-white border-2 border-gray-200 ${color} hover:border-[#4c55b6] hover:shadow-md`}`}>
            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${selectedGender === value ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-[#4c55b6]/10'}`}>
                  <Icon className={`text-2xl transition-all duration-300 ${selectedGender === value ? 'text-white' : 'text-gray-600 group-hover:text-[#4c55b6]'}`} />
                </div>
                <p className={`font-bold text-lg ${selectedGender === value ? 'text-white' : 'text-gray-800'}`}>{label}</p>
              </div>
              <input type="radio" name="gender" value={value} checked={selectedGender === value} onChange={() => setSelectedGender(value)}
                className={`w-5 h-5 cursor-pointer ${selectedGender === value ? 'accent-white' : 'accent-[#4c55b6]'}`} aria-label={label} />
            </div>
          </div>
        ))}
      </div>
      {isDesktop && <StepDots current={1} />}
      {!isDesktop && <MobileProgressBar pct="66.66%" label="Step 2 of 3" />}
    </div>
  </div>
);

const Step3 = ({ isDesktop, selectedGoals, toggleGoal }) => (
  <div className={isDesktop ? 'grid lg:grid-cols-2 gap-12 items-start mt-8' : ''}>
    {isDesktop && (
      <div className="sticky top-12 space-y-6">
        <div>
          <h1 className="text-7xl bg-gradient-to-r from-[#4c55b6] to-[#6b73d4] bg-clip-text text-transparent font-bold tracking-tight leading-tight">Set Your Goals</h1>
          <p className="text-xl text-gray-600 mt-4 leading-relaxed">Choose what matters most to you</p>
        </div>
        <div className="space-y-4">
          <FeatureCard icon={BsListCheck} iconBg="bg-indigo-100" iconColor="text-indigo-600" hoverBg="group-hover:bg-indigo-200" title="Select Multiple Goals" body="You can choose one or more goals. We'll tailor your experience based on your selections." />
          <FeatureCard icon={RiSparklingLine} iconBg="bg-purple-100" iconColor="text-purple-600" hoverBg="group-hover:bg-purple-200" title="Personalized Journey" body="Your goals will shape your personalized mood tracking and wellness recommendations." />
          <FeatureCard icon={MdAutorenew} iconBg="bg-green-100" iconColor="text-green-600" hoverBg="group-hover:bg-green-200" title="You Can Always Change" body="Don't worry - you can update your goals anytime in your profile settings." />
        </div>
        {selectedGoals.length > 0 && (
          <div className="bg-[#4c55b6]/10 rounded-xl p-4 border border-[#4c55b6]/20">
            <p className="text-sm font-semibold text-[#4c55b6]">Selected: {selectedGoals.length}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedGoals.map(g => {
                const opt = goalOptions.find(o => o.value === g);
                return <span key={g} className="text-xs bg-white rounded-full px-3 py-1 text-[#4c55b6] font-medium">{opt?.label}</span>;
              })}
            </div>
          </div>
        )}
      </div>
    )}
    <div className={isDesktop ? 'bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8' : ''}>
      {!isDesktop && (
        <div className="mb-6">
          <h1 className="text-5xl bg-gradient-to-r from-[#4c55b6] to-[#6b73d4] bg-clip-text text-transparent font-bold tracking-tight leading-tight">Set Your Goals</h1>
          <p className="text-lg text-gray-600 mt-2">Choose what matters most to you</p>
        </div>
      )}
      <ProgressBadge label="Question 3 of 3" step="Final Step" isDesktop={isDesktop} />
      <h2 className={`${isDesktop ? 'text-3xl' : 'text-4xl'} font-bold text-gray-800 mt-2 mb-8`}>What are your primary goals?</h2>
      <div className="grid gap-4 my-8">
        {goalOptions.map(({ value, label, category, icon: Icon, color, borderColor }) => (
          <div key={value} onClick={() => toggleGoal(value)}
            className={`group relative rounded-2xl p-5 cursor-pointer transition-all duration-300 ${selectedGoals.includes(value) ? 'bg-[#4c55b6] text-white shadow-lg ring-2 ring-[#4c55b6] ring-offset-2' : `bg-white border-2 border-gray-200 ${color} hover:shadow-md ${borderColor}`}`}>
            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center flex-1">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${selectedGoals.includes(value) ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-[#4c55b6]/10'}`}>
                  <Icon className={`text-3xl transition-all duration-300 ${selectedGoals.includes(value) ? 'text-white' : 'text-gray-600 group-hover:text-[#4c55b6]'}`} />
                </div>
                <div className="flex-1">
                  <span className={`text-xs font-bold uppercase tracking-wider ${selectedGoals.includes(value) ? 'text-white/80' : 'text-gray-500'}`}>{category}</span>
                  <p className={`font-bold text-xl ${selectedGoals.includes(value) ? 'text-white' : 'text-gray-800'}`}>{label}</p>
                </div>
              </div>
              {selectedGoals.includes(value) && <FaCheckCircle className="text-2xl text-white" />}
            </div>
          </div>
        ))}
      </div>
      <div className={`rounded-2xl shadow-md text-center ${isDesktop ? 'bg-gradient-to-r from-[#4c55b6]/5 to-purple-500/5 p-6 my-6' : 'bg-white/40 p-6 my-4'}`}>
        <p className="italic text-gray-600 text-lg">"Every journey begins with a single step towards your own inner peace"</p>
      </div>
      {isDesktop && <StepDots current={2} />}
      {!isDesktop && <MobileProgressBar pct="100%" label="Final Step" />}
    </div>
  </div>
);

// ─── Main DashboardCarousel ───────────────────────────────────────────────────
const TOTAL_STEPS = 3;

const DashboardCarousel = () => {
  const navigate = useNavigate();
  const [step, setStep]           = useState(0);
  const [visible, setVisible]     = useState(true);   // drives fade+slide
  const [direction, setDirection] = useState('forward');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const [selectedAge,    setSelectedAge]    = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedGoals,  setSelectedGoals]  = useState([]);

  const toggleGoal = (v) =>
    setSelectedGoals((prev) => prev.includes(v) ? prev.filter((g) => g !== v) : [...prev, v]);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const canContinue = [!!selectedAge, !!selectedGender, selectedGoals.length > 0][step];

  // ── Core transition: fade-out → swap step → fade-in ──────────────────────
  const transitionTo = useCallback((nextStep, dir) => {
    setDirection(dir);
    setVisible(false);                        // 1. start exit animation
    setTimeout(() => {
      setStep(nextStep);                      // 2. swap content while invisible
      setVisible(true);                       // 3. start enter animation
    }, 280);                                  //    matches CSS duration below
  }, []);

  const goNext = useCallback(() => {
    if (!canContinue) return;
    if (step === TOTAL_STEPS - 1) { navigate('/'); return; }
    transitionTo(step + 1, 'forward');
  }, [step, canContinue, transitionTo, navigate]);

  const goBack = useCallback(() => {
    if (step === 0) { navigate(-1); return; }
    transitionTo(step - 1, 'back');
  }, [step, transitionTo, navigate]);

  // Keyboard Enter
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Enter') goNext(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext]);

  // Translate direction for enter animation
  const translateClass = visible
    ? 'translate-x-0 opacity-100'
    : direction === 'forward'
      ? '-translate-x-6 opacity-0'
      : 'translate-x-6 opacity-0';

  const stepComponents = [
    <Step1 key="s1" isDesktop={isDesktop} selectedAge={selectedAge} setSelectedAge={setSelectedAge} />,
    <Step2 key="s2" isDesktop={isDesktop} selectedGender={selectedGender} setSelectedGender={setSelectedGender} />,
    <Step3 key="s3" isDesktop={isDesktop} selectedGoals={selectedGoals} toggleGoal={toggleGoal} />,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50">
      <div className={`mx-auto transition-all duration-300 ${isDesktop ? 'container px-8 py-12 max-w-7xl' : 'w-full max-w-lg p-6 sm:p-10'}`}>

        {/* Top nav */}
        <div className="flex justify-between items-center mb-5">
          <button onClick={goBack} aria-label="Go back" className="hover:opacity-70 transition-opacity">
            <FiArrowLeft size={24} />
          </button>
          <button onClick={() => navigate('/')} className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            Skip
          </button>
        </div>

        {/* Animated slide area */}
        <div className={`transform transition-all duration-[280ms] ease-in-out ${translateClass}`}>
          {stepComponents[step]}
        </div>

        {/* Continue button */}
        <div className={`mt-8 ${isDesktop ? 'flex justify-end' : ''}`}>
          <button
            disabled={!canContinue}
            onClick={goNext}
            className={`group bg-[#4c55b6] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3 hover:bg-[#3a449c] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ${isDesktop ? 'text-lg min-w-[200px]' : 'text-xl w-full'}`}
          >
            {step === TOTAL_STEPS - 1 ? 'Complete Journey' : 'Continue'}
            <GrLinkNext className="text-xl group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Desktop keyboard hint */}
      {isDesktop && canContinue && (
        <div className="fixed bottom-6 right-6 animate-pulse">
          <div className="bg-gray-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center gap-2">
            <kbd className="px-2 py-1 bg-gray-700 rounded text-xs font-mono">⏎</kbd>
            <span>{step === TOTAL_STEPS - 1 ? 'Press Enter to complete' : 'Press Enter to continue'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCarousel;
