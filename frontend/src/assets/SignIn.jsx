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
  const [errorMessage, setErrorMessage] = useState(''); // To handle errors

  useEffect(() => {
    setIsFormValid(email.trim() !== '' && password.trim() !== '');
  }, [email, password]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/signin', { email, password });
      
      if (response.status === 200) {
        const { token, user } = response.data;
  
 // Extracting specific user data fields
 const {
  firstName,
  lastName,
  dob,
  residence,
  profilePicture,
  bio,
  selectedSkills
} = user;

// Store token and specific user data in sessionStorage
sessionStorage.setItem('token', token);
sessionStorage.setItem('firstName', firstName);
sessionStorage.setItem('lastName', lastName);
sessionStorage.setItem('dob', dob);
sessionStorage.setItem('residence', residence);
sessionStorage.setItem('profilePicture', profilePicture);
sessionStorage.setItem('bio', bio);
sessionStorage.setItem('selectedSkills', JSON.stringify(selectedSkills)); // Store as JSON string

        // Navigate to "my-profile"
        navigate('./my-profile');
      }
    } catch (error) {
      console.error("Error signing in", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'An error occurred while signing in.');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
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
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
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
