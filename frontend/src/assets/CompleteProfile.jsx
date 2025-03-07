import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowDown } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styleCompleteProfile.css"; // Use a separate CSS file for CompleteProfile

const statesList = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [residence, setResidence] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(firstName.trim() !== '' && lastName.trim() !== '' && dob.trim() !== '' && residence.trim() !== '');
  }, [firstName, lastName, dob, residence]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
            // Store the form data in sessionStorage
            sessionStorage.setItem('firstName', firstName);
            sessionStorage.setItem('lastName', lastName);
            sessionStorage.setItem('dob', dob);
            sessionStorage.setItem('residence', residence);
      navigate('/ProfileSetup', {
        state: {
          firstName,
          lastName,
          dob,
          residence
        }
      });
    }
  };

  return (
    <main className="complete-profile-screen">
      <section className="complete-profile-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <FaArrowDown className="scroll-indicator" />
        <section className="complete-profile-box">
          <h1 className="complete-profile-title">Complete Your Profile</h1>
          <h2 className="complete-profile-subtitle">SkillStarter!</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" className="form-control" id="firstName" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="lastName" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">Date of Birth</label>
              <input type="date" className="form-control" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="residence" className="form-label">Residence</label>
              <select className="form-control" id="residence" value={residence} onChange={(e) => setResidence(e.target.value)}>
                <option value="">Select your state</option>
                {statesList.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn-submit" disabled={!isFormValid}>
                Next
            </button>
          </form>
        </section>
      </section>
    </main>
  );
};

export default CompleteProfile;