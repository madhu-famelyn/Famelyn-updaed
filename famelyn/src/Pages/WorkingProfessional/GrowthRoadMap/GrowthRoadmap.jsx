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

  const handleDownload = () => {
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
              The <br />
              Executive <br />
              Presence <br />
              Audit
            </h1>
          </div>

          <div className="right-section">
            <div className="item">
              <div className="dot" />
              <div className="number">01</div>
              <div className="content">
                <h3>Authority Positioning</h3>
                <p>
                  Define the market territory your name should own.
                </p>
              </div>
            </div>

            <div className="divider" />

            <div className="item">
              <div className="dot" />
              <div className="number">02</div>
              <div className="content">
                <h3>Authority Narrative Architecture</h3>
                <p>
                  Convert your judgment, philosophy, and proof into a repeatable executive narrative.
                </p>
              </div>
            </div>

            <div className="divider" />

            <div className="item">
              <div className="dot" />
              <div className="number">03</div>
              <div className="content">
                <h3>Digital Leverage System</h3>
                <p>
                  Create a high-signal presence that attracts opportunity without performative posting.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="roadmap-bottom">
          <h2>Return to the private gateway.</h2>

          <div className="actions">
            <button
              className="audit-btn"
              onClick={() => setOpenModal(true)}
            >
              Request Presence Audit
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

      {/* MODAL */}
      {openModal && (
        <div className="modal-overlay">
          <div className="modal-box">

            {!submitted ? (
              <>
                <h2>Request Your Presence Audit</h2>

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
                <h2>Your Audit is Ready</h2>

                <p>
                  Thank you. Your executive presence audit is prepared.
                </p>

                <button
                  className="download-btn"
                  onClick={handleDownload}
                >
                  Download Report
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
}
