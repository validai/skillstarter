import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './assets/HomepageDesktop1';
import SignIn from './SignIn'; // Ensure this component exists
import RolePicker from './RolePicker'; // Ensure this component exists

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
