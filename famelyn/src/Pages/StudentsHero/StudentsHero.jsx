import React, { useState } from "react";
import "./StudentsHero.css";

const StudentsHero = () => {
  const [openModal, setOpenModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        setSubmitted(true);
        form.reset();
      } else {
        alert("Something went wrong. Try again.");
      }
    } catch (error) {
      alert("Network error");
    }
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

                <form onSubmit={handleSubmit} className="contact-form">
                  
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