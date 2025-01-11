import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import "./styleCreateAccount.css"; // Use a separate CSS file for CreateAccount
import { FaEnvelope, FaLock } from 'react-icons/fa';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(email.trim() !== '' && password.trim() !== '');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/CompleteProfile", { state: { email, password } });
  };

  return (
    <main className="create-account-screen">
      <section className="create-account-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <section className="create-account-box">
          <h1 className="create-account-title">Create Account</h1>
          <h2 className="create-account-subtitle">SkillStarter!</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
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

            <div className="form-group">
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
            <div className="form-group center-button">
              <button type="submit" className="btn-submit" disabled={!isFormValid}>
                Register
              </button>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
};

export default CreateAccount;
