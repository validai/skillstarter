import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styleMyProfile.css"; // Use a separate CSS file for MyProfile

const MyProfile = () => {
  const location = useLocation();
  const { firstName, lastName, dob, residence, selectedSkills, profilePicture: initialProfilePicture, bio: initialBio } = location.state || {};
  const [profilePicture, setProfilePicture] = useState(initialProfilePicture);
  const [bio, setBio] = useState(initialBio);
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);
  const [editingBio, setEditingBio] = useState(false);

  const handleAddProject = () => {
    setEditingProject({ name: "", description: "", image: "" });
  };

  const handleRemoveProject = (index) => {
    setProjectToDelete(index);
    setShowDeleteAlert(true);
  };

  const confirmRemoveProject = () => {
    const updatedProjects = projects.filter((_, i) => i !== projectToDelete);
    setProjects(updatedProjects);
    setShowDeleteAlert(false);
    setProjectToDelete(null);
  };

  const handleEditProject = (index) => {
    setEditingProject({ ...projects[index], index });
  };

  const handleSaveProject = () => {
    if (editingProject.index !== undefined) {
      const updatedProjects = projects.map((project, i) =>
        i === editingProject.index ? editingProject : project
      );
      setProjects(updatedProjects);
    } else {
      setProjects([...projects, editingProject]);
    }
    setEditingProject(null);
  };

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleViewProject = (index) => {
    setViewingProject(projects[index]);
  };

  const handleSaveBio = () => {
    setEditingBio(false);
  };

  return (
    <main className="my-profile-screen">
      <div className="profile-projects-container">
        <section className="my-profile-container">
          <header className="my-profile-header">
            <h1 className="my-profile-title">Welcome to My Profile</h1>
          </header>
          <section className="my-profile-content">
            <div className="profile-picture-container">
              {profilePicture && <img src={profilePicture} className="profile-picture" onClick={() => document.getElementById('profile-picture-input').click()} />}
              <input id="profile-picture-input" type="file" onChange={(e) => handleImageChange(e, setProfilePicture)} style={{ display: 'none' }} />
            </div>
            <div className="profile-details">
              <h2>{firstName} {lastName}</h2>
              <p><strong>Date of Birth:</strong> {dob}</p>
              <p><strong>Residence:</strong> {residence}</p>
              <div className="bio-section">
                <strong className="bio-title">Bio:</strong>
                {editingBio ? (
                  <div>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="bio-textarea"
                    />
                    <button onClick={handleSaveBio}>Save</button>
                  </div>
                ) : (
                  <div className="bio-box">
                    {bio}
                    <button className="edit-bio-button" onClick={() => setEditingBio(true)}>✎</button>
                  </div>
                )}
              </div>
              <div className="skills-section">
                <strong className="skills-title">My Skills:</strong>
                <div className="skills-container">
                  {selectedSkills && selectedSkills.map(skill => (
                    <span key={skill} className="skill-badge">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </section>
        <section className="projects-container">
          <header className="projects-header">
            <h2 className="projects-title">My Projects</h2>
          </header>
          <section className="projects-content">
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={project.name} className="project-card" onClick={() => handleViewProject(index)}>
                  <img src={project.image} alt={project.name} className="project-image" />
                  <h3>{project.name}</h3>
                  <p>{project.description.length > 100 ? `${project.description.substring(0, 100)}...` : project.description}</p>
                  <button className="edit-project-button" onClick={(e) => { e.stopPropagation(); handleEditProject(index); }}>✎</button>
                  <button className="remove-project-button" onClick={(e) => { e.stopPropagation(); handleRemoveProject(index); }}>X</button>
                </div>
              ))}
              <button className="add-project-button" onClick={handleAddProject}>+</button>
            </div>
          </section>
        </section>
      </div>
      {viewingProject && (
        <div className="view-project-modal">
          <div className="view-project-content">
            <h2>{viewingProject.name}</h2>
            <img src={viewingProject.image} alt={viewingProject.name} className="project-image-preview" />
            <p>{viewingProject.description}</p>
            <button onClick={() => setViewingProject(null)}>Close</button>
          </div>
        </div>
      )}
      {editingProject && (
        <div className="edit-project-modal">
          <div className="edit-project-content">
            <h2>{editingProject.index !== undefined ? "Edit Project" : "Add Project"}</h2>
            <input
              type="text"
              value={editingProject.name}
              onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
              placeholder="Project Name"
            />
            <textarea
              value={editingProject.description}
              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
              placeholder="Project Description"
            />
            <label htmlFor="file-input" className="file-input-label">
              <i className="fas fa-upload"></i> Upload Image
            </label>
            <input id="file-input" type="file" onChange={(e) => handleImageChange(e, (image) => setEditingProject({ ...editingProject, image }))} style={{ display: 'none' }} />
            {editingProject.image && <img src={editingProject.image} alt="Project" className="project-image-preview" />}
            <button onClick={handleSaveProject}>Save</button>
            <button onClick={() => setEditingProject(null)}>Cancel</button>
          </div>
        </div>
      )}
      {showDeleteAlert && (
        <div className="delete-alert-modal">
          <div className="delete-alert-content">
            <h2>Are you sure you want to delete this project?</h2>
            <button onClick={confirmRemoveProject}>Yes</button>
            <button onClick={() => setShowDeleteAlert(false)}>No</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default MyProfile;
