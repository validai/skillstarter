import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './frontend/src/assets/HomepageDesktop1';
import SignIn from './SignIn';
import RolePicker from './RolePicker';
import MyProfile from './frontend/src/assets/MyProfile'; // Adjusted path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/RolePicker" element={<RolePicker />} />
        <Route path="/my-profile" element={<MyProfile />} /> {/* Ensure this route is defined */}
      </Routes>
    </Router>
  );
}

export default App;
