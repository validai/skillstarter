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

  const handleSubmit = (e) => {
    e.preventDefault();
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
