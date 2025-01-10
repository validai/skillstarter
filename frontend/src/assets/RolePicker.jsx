import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import "./styleRolePicker.css";

export const RolePicker = () => {
  const [activeTab, setActiveTab] = useState("employee");
  const navigate = useNavigate();

  const handleEmployeeClick = () => {
    setActiveTab("employee");
    navigate("/CreateAccount"); // Update to navigate to CreateAccount
  };

  const handleEmployerClick = () => {
    setActiveTab("employer");
    navigate("/ComingSoon"); // Update to navigate to ComingSoon
  };

  return (
    <main className="role-picker-screen">
      <section className="role-picker-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <section className="role-picker-box">
          <h1 className="role-picker-title">Welcome to</h1>
          <h2 className="role-picker-subtitle">SkillStarter!</h2>
          <p className="role-picker-description">
            SkillStarter is your go-to platform for enhancing your skills and advancing your career. Join us today and start your journey towards success!
          </p>
          <p className="role-picker-question">Are you a...</p>
          <div className="tab-container">
            <button 
              className={`tab-button ${activeTab === "employee" ? "active" : ""}`}
              onClick={handleEmployeeClick}
            >
              Employee
            </button>
            <span className="tab-separator">or</span>
            <button
              className={`tab-button ${activeTab === "employer" ? "active" : ""}`}
              onClick={handleEmployerClick}
            >
              Employer
            </button>
          </div>
        </section>
      </section>
    </main>
  );
};
