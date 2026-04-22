import React, { useState } from "react";
import "./StudentsHero.css";

const StudentsHero = () => {
  const [openModal, setOpenModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleDownload = () => {
    setOpenModal(false);
    setSubmitted(false);
  };

  return (
    <>
      <section className="students-hero">
        <div className="students-overlay"></div>

        <div className="students-container">
          <p className="students-label">
            FOR STUDENTS & EARLY PROFESSIONALS
          </p>

          <h1 className="students-title">
            Build clarity before
            <br />
            the market defines
            <br />
            you.
          </h1>

          <p className="students-description">
            Famelyn helps emerging leaders convert ambition, experience,
            and early proof into a composed LinkedIn presence that
            compounds into opportunity.
          </p>

          <button
            className="students-cta"
            onClick={() => setOpenModal(true)}
          >
            Get Your Growth Roadmap
          </button>
        </div>
      </section>

      {/* MODAL */}
      {openModal && (
        <div className="modal-overlay">
          <div className="modal-box">

            {!submitted ? (
              <>
                <h2>Get Your Growth Roadmap</h2>

                <form onSubmit={handleSubmit}>
                  <input type="text" placeholder="Your Name" required />
                  <input type="email" placeholder="Your Email" required />
                  <textarea
                    placeholder="Why are you interested?"
                    required
                  ></textarea>

                  <button type="submit" className="submit-btn">
                    Submit
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2>Your Guide is Ready</h2>

                <p>
                  Thank you. Your growth roadmap is prepared.
                </p>

                <button
                  className="download-btn"
                  onClick={handleDownload}
                >
                  Download Ebook
                </button>
              </>
            )}

            <span
              className="close-btn"
              onClick={() => setOpenModal(false)}
            >
              ✕
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentsHero;