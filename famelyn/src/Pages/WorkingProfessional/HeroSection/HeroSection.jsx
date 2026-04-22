import React, { useState } from "react";
import "./HeroSection.css";

export default function ExecutiveHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
  };

  return (
    <>
      <section className="eh-wrapper">

        <div className="eh-overlay-dark"></div>
        <div className="eh-overlay-lines"></div>

        <div className="eh-content">

          <p className="eh-label">
            FOR FOUNDERS, ESTABLISHED EXECUTIVE
          </p>

          <h1 className="eh-title">
            Turn private <br />
            expertise into public <br />
            authority.
          </h1>

          <p className="eh-description">
            Famelyn designs the strategic presence layer that makes senior
            competence visible to the right boards, investors, clients,
            and industry peers.
          </p>

          <button
            className="eh-cta-btn"
            onClick={() => setIsModalOpen(true)}
          >
            Request a Presence Audit
          </button>

        </div>
      </section>

      {/* MODAL */}
      {isModalOpen && (
        <div className="eh-modal-backdrop">
          <div className="eh-modal-container">

            {!isSubmitted ? (
              <>
                <h2 className="eh-modal-title">Request Your Presence Audit</h2>

                <form onSubmit={handleSubmit} className="eh-form">
                  <input type="text" placeholder="Your Name" required />
                  <input type="email" placeholder="Your Email" required />
                  <textarea placeholder="Why are you interested?" required />

                  <button type="submit" className="eh-submit-btn">
                    Submit
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="eh-modal-title">Your Audit is Ready</h2>

                <p className="eh-success-text">
                  Thank you. Your executive presence audit is prepared.
                </p>

                <button
                  className="eh-download-btn"
                  onClick={handleClose}
                >
                  Download Report
                </button>
              </>
            )}

            <span className="eh-close" onClick={handleClose}>
              ✕
            </span>
          </div>
        </div>
      )}
    </>
  );
}