import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope, FaLock } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styleSignIn.css";
import axios from 'axios';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(email.trim() !== '' && password.trim() !== '');
  }, [email, password]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Replace with your API endpoint
      const response = await axios.post('/api/signin', { email, password });
      const userProfile = response.data;
      // Navigate to the user's profile page
      navigate(`/profile/${userProfile.id}`);
    } catch (error) {
      console.error("Error signing in", error);
      // Handle error (e.g., show error message)
    }
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
          <form className="form" onSubmit={handleSignIn}>
            <div className="mb-3">
              <label htmlFor="formBasicEmail" className="form-label">Email address</label>
              <div className="input-group">
                <span className="input-group-text icon-background"><FaEnvelope /></span>
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
                <span className="input-group-text icon-background"><FaLock /></span>
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
