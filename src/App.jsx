import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Carousel from './components/Carousel';
import Signin from './pages/Signin';
import Dashboardwidget from './components/Dashboardwidget';
import Dashboardwidget2 from './components/Dashboardwidget2';
import Dashboardwidget3 from './components/Dashboardwidget3';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Carousel />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/onboarding/age" element={<Dashboardwidget />} />
        <Route path="/onboarding/gender" element={<Dashboardwidget2 />} />
        <Route path="/onboarding/interests" element={<Dashboardwidget3 />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

  );
};

export default App;