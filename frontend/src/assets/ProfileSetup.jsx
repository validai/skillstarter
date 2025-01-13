import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaArrowDown } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styleProfileSetup.css"; // Use a separate CSS file for ProfileSetup

const skillsList = [
  "JavaScript", "Python", "Java", "C++", "React", "Node.js", "Django", "Flask", "SQL", "NoSQL",
  "HTML", "CSS", "SASS", "LESS", "Git", "Docker", "Kubernetes", "AWS", "Azure", "GCP"
];

const ProfileSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { firstName, lastName, dob, residence } = location.state || {};
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setIsFormValid(
      bio.trim() !== '' &&
      selectedSkills.length > 0 &&
      profilePicture !== null &&
      firstName && lastName && dob && residence
    );
  }, [bio, selectedSkills, profilePicture, firstName, lastName, dob, residence]);

  const handleProfilePictureChange = (e) => {
    setProfilePicture(URL.createObjectURL(e.target.files[0]));
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleSkillAdd = (e) => {
    const skill = e.target.value;
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSkillRemove = (skill) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Retrieve data from sessionStorage
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const firstName = sessionStorage.getItem('firstName');
    const lastName = sessionStorage.getItem('lastName');
    const dob = sessionStorage.getItem('dob');
    const residence = sessionStorage.getItem('residence');
    
    // Prepare the data to send to the backend
    const userProfileData = {
      email,
      password,
      firstName,
      lastName,
      dob,
      residence,
      bio,
      skills: selectedSkills,
      profilePicture,
    };
    
    try {
      const response = await fetch('https://skillstarter-7ztu.onrender.com/api/addUserProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfileData),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming your backend returns a JWT token upon successful profile creation
        const { token } = data;

        if (token) {
          // Store the JWT token in sessionStorage or localStorage
          sessionStorage.setItem('token', token);

          console.log('Profile created successfully:', data.message);
          sessionStorage.setItem('profilePicture', profilePicture);
          sessionStorage.setItem('bio', bio);
          sessionStorage.setItem('selectedSkills', JSON.stringify(selectedSkills)); // Store as JSON string
          navigate('/my-profile', {
            state: {
              firstName,
              lastName,
              dob,
              residence,
              selectedSkills,
              profilePicture,
              bio
            }
          });
        } else {
          alert('Failed to retrieve the JWT token');
        }
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'An error occurred while saving the profile.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit the profile data.');
    }
  };

  return (
    <main className="profile-setup-screen">
      <section className="profile-setup-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <FaArrowDown className="scroll-indicator" />
        <section className="profile-setup-box">
          <h1 className="profile-setup-title">Set Up Your Profile</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Add a Profile Picture</label>
              <div className="profile-picture-container" onClick={handleProfilePictureClick}>
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="profile-picture-preview" />
                ) : (
                  <FaPlus className="profile-picture-icon" />
                )}
              </div>
              <input
                type="file"
                className="form-control"
                id="profilePicture"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleProfilePictureChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bio" className="form-label">Bio</label>
              <textarea className="form-control" id="bio" rows="3" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself"></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="skills" className="form-label">Skills</label>
              <div className="skills-container">
                {selectedSkills.map(skill => (
                  <span key={skill} className="skill-badge">
                    {skill} <button type="button" onClick={() => handleSkillRemove(skill)}>x</button>
                  </span>
                ))}
              </div>
              <select className="form-control" id="skills" onChange={handleSkillAdd}>
                <option value="">Select a skill</option>
                {skillsList.map(skill => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn-submit" disabled={!isFormValid}>
              Finish
            </button>
          </form>
        </section>
      </section>
    </main>
  );
};

export default ProfileSetup;
