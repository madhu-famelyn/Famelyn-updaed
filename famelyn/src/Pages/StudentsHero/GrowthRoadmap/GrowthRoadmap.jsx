import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GrowthRoadmap.css";

export default function GrowthRoadmap() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSubmitted(false);
  };

  return (
    <>
      <div className="roadmap-container">
        {/* TOP SECTION */}
        <div className="roadmap-top">
          <div className="left-section">
            <p className="label">PRIVATE ROADMAP</p>
            <h1 className="title">
              Your Growth <br /> Roadmap
            </h1>
          </div>

          <div className="right-section">
            <div className="item">
              <div className="number">01</div>
              <div>
                <h3>Career Signal Clarity</h3>
                <p>
                  Translate scattered experience into a precise professional direction.
                </p>
              </div>
            </div>

            <div className="divider" />

            <div className="item">
              <div className="number">02</div>
              <div>
                <h3>Executive Presence Design</h3>
                <p>
                  Shape a profile that reads as intentional, capable, and opportunity-ready.
                </p>
              </div>
            </div>

            <div className="divider" />

            <div className="item">
              <div className="number">03</div>
              <div>
                <h3>Foundational Digital Equity</h3>
                <p>
                  Build the habits and narrative assets that attract mentors, recruiters, and collaborators.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="roadmap-bottom">
          <h2>Return to the private gateway.</h2>

          <div className="roadmap-actions">
            <button
              className="roadmap-cta"
              onClick={() => setOpenModal(true)}
            >
              Get Your Career Growth Roadmap
            </button>

            <button
              className="back-btn"
              onClick={() => navigate("/")}
            >
              Back to Famelyn
            </button>
          </div>
        </div>
      </div>

      {openModal && (
        <div className="student-roadmap-modal-overlay">
          <div className="student-roadmap-modal">
            {!submitted ? (
              <>
                <h2>Get Your Career Growth Roadmap</h2>

                <form
                  className="student-roadmap-form"
                  onSubmit={handleSubmit}
                >
                  <input type="text" name="_honey" style={{ display: "none" }} />
                  <input type="hidden" name="_captcha" value="false" />

                  <input type="text" name="name" placeholder="Your Name" required />
                  <input type="email" name="email" placeholder="Your Email" required />
                  <input type="tel" name="phone" placeholder="Phone Number" />
                  <input type="url" name="linkedin" placeholder="LinkedIn URL" />
                  <textarea
                    name="message"
                    placeholder="Tell us what you want clarity on"
                    required
                  ></textarea>

                  <button type="submit" className="student-roadmap-submit">
                    Submit
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2>Your Roadmap Request is Ready</h2>
                <p>
                  Thank you. We received your details for the career growth roadmap.
                </p>
                <button
                  className="student-roadmap-submit"
                  onClick={handleClose}
                >
                  Close
                </button>
              </>
            )}

            <button
              type="button"
              className="student-roadmap-close"
              onClick={handleClose}
              aria-label="Close form"
            >
              x
            </button>
          </div>
        </div>
      )}
    </>
  );
}
