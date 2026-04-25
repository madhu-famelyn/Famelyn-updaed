import React, { useState } from "react";
import "./HeroSection.css";

export default function ExecutiveHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xanjlkyz", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }

    setLoading(false);
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
                <h2 className="eh-modal-title">
                  Request Your Presence Audit
                </h2>

                <form onSubmit={handleSubmit} className="eh-form">

                  {/* Hidden fields for Formspree */}
                  <input type="text" name="_honey" style={{ display: "none" }} />
                  <input type="hidden" name="_captcha" value="false" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                  />

                  <input
                    type="url"
                    name="linkedin"
                    placeholder="LinkedIn URL"
                    required
                  />

                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="4"
                    required
                  ></textarea>

                  <button
                    type="submit"
                    className="eh-submit-btn"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
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