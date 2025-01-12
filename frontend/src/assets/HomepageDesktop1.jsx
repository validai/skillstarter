import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./style.css";

const WelcomeScreen = () => {
  const [activeTab, setActiveTab] = useState("sign-in");
  const navigate = useNavigate();

  const handleSignInClick = () => {
    setActiveTab("sign-in");
    navigate("/SignIn");
  };

  const handleSignUpClick = () => {
    setActiveTab("sign-up");
    navigate("/RolePicker");
  };

  return (
    <main className="welcome-screen">
      <section className="welcome-container">
        <section className="welcome-box">
          <h1 className="welcome-title">Welcome to</h1>
          <h2 className="welcome-subtitle">SkillStarter!</h2>
          <p className="welcome-description text-limited-width">
            SkillStarter is your go-to platform for enhancing your skills and advancing your career. Join us today and start your journey towards success!
          </p>
          <div className="tab-container">
            <button 
              className={`tab-button ${activeTab === "sign-in" ? "active" : ""}`}
              onClick={handleSignInClick}
            >
              Sign-in
            </button>
            <span className="tab-separator">or</span>
            <button
              className={`tab-button ${activeTab === "sign-up" ? "active" : ""}`}
              onClick={handleSignUpClick}
            >
              Sign-up
            </button>
          </div>
        </section>
      </section>
    </main>
  );
};

export default WelcomeScreen;
