import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from '../frontend/src/assets/HomepageDesktop1'; // Adjusted path
import SignIn from './SignIn';
import RolePicker from './RolePicker';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/RolePicker" element={<RolePicker />} />
      </Routes>
    </Router>
  );
}

export default App;
