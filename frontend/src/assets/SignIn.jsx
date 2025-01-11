import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styleSignIn.css";
import { FaEnvelope, FaLock } from 'react-icons/fa';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(email.trim() !== '' && password.trim() !== '');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/MyProfile', { state: { email, password } });
  };

  return (
    <main className="welcome-screen">
      <section className="welcome-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <section className="welcome-box">
          <h1 className="welcome-title">Welcome to</h1>
          <h2 className="welcome-subtitle">SkillStarter!</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formBasicEmail" className="form-label">Email address</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-transparent border-0"><FaEnvelope /></span>
                </div>
                <input 
                  type="email" 
                  className="form-control" 
                  id="formBasicEmail" 
                  placeholder="Enter email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="formBasicPassword" className="form-label">Password</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-transparent border-0"><FaLock /></span>
                </div>
                <input 
                  type="password" 
                  className="form-control" 
                  id="formBasicPassword" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="formBasicCheckbox" />
              <label className="form-check-label" htmlFor="formBasicCheckbox">Stay signed in?</label>
            </div>
            <button type="submit" className="btn-submit" disabled={!isFormValid}>
              Submit
            </button>
          </form>
        </section>
      </section>
    </main>
  );
};

export default SignIn;
