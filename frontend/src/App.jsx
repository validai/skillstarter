import React from "react";
import { Routes, Route } from "react-router-dom";
import WelcomeScreen from "./assets/HomepageDesktop1";
import SignIn from "./assets/SignIn";
import RolePicker from "./assets/RolePicker";
import CompleteProfile from "./assets/CompleteProfile";
import ComingSoon from "./assets/ComingSoon";
import ProfileSetup from "./assets/ProfileSetup";
import MyProfile from "./assets/MyProfile";
import CreateAccount from "./assets/CreateAccount";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/RolePicker" element={<RolePicker />} />
      <Route path="/CompleteProfile" element={<CompleteProfile />} />
      <Route path="/ComingSoon" element={<ComingSoon />} />
      <Route path="/ProfileSetup" element={<ProfileSetup />} />
      <Route path="/MyProfile" element={<MyProfile />} />
      <Route path="/CreateAccount" element={<CreateAccount />} />
    </Routes>
  );
}

export default App;