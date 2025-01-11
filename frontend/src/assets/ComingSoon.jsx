import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./styleComingSoon.css";

function ComingSoon() {
  const navigate = useNavigate();

  return (
    <main className="ComingSoon-screen">
      <section className="ComingSoon-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <section className="ComingSoon-box">
          <h2 className="ComingSoon-title">Welcome to</h2>
          <h1 className="ComingSoon-subtitle">SkillStarter!</h1>
          <h1 className="ComingSoon-subtitle2">Coming Soon...</h1>
          <p className="ComingSoon-description">
            In the meantime, sign up for our newsletter to stay up to date.
          </p>
          <form className="form">
            <div>
              <label htmlFor="formBasicEmail" className="form-label"></label>
              <div className="input-group">
                <input type="email" className="form-control" id="formBasicEmail" placeholder="Enter email" />
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
}

export default ComingSoon;
