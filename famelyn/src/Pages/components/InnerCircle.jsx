import { useState, useRef } from 'react';
import './InnerCircle.css';
import FaqSection from '../FaqSection/FaqSection';

export function InnerCircle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log('Play error:', err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || "",
      linkedin: formData.get("linkedin") || "",
      message: formData.get("message"),
      submission_type: "inner_circle",
    };

    try {
      const response = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <main className="app-container">
      {/* Section 1: Manifesto */}
      <section className="section manifesto-section">
        <div className="section-content">
          <div className="manifesto-text">
            <p className="section-label">Founder-led philosophy</p>
            <h2 className="section-title">Founders Manifesto</h2>
            <p className="manifesto-description">What you see today didn’t start as a business idea. It started with a realization that something needed to change.</p>
          </div>

          <div className="manifesto-video">
            <video
              src="/FAMELYN-1 (1).mp4"
              className="manifesto-iframe"
              controls
              playsInline
              title="Founders Manifesto Film"
            ></video>
          </div>
        </div>
      </section>

      <FaqSection />
      {/* Section 2: Inner Circle Form */}
      <section id="inner-circle" className="section inner-circle-section">
        <div className="inner-circle-container-wrapper">
          <div className="inner-circle-content">
            <div className="left-section">
              <p className="intake-label">PRIVATE INTAKE</p>
              <h1 className="main-heading">Access the Inner Circle</h1>

              <ul className="benefits-list">
                <li>Download Free Ebook</li>
                <li>Book a 10-min LinkedIn Consultation</li>
              </ul>
            </div>

            <div className="right-section">
              {!submitted ? (
                <form
                  className="intake-form contact-form"
                  onSubmit={handleSubmit}
                >
                  <input type="text" name="_honey" style={{ display: 'none' }} />
                  <input type="hidden" name="_captcha" value="false" />

                  <div className="form-group">
                    <label htmlFor="name" className="form-label">NAME</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">EMAIL</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">PHONE NUMBER</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="linkedin" className="form-label">LINKEDIN URL</label>
                    <input
                      type="url"
                      id="linkedin"
                      name="linkedin"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">MESSAGE</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      className="form-input"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-button cta-button" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              ) : (
                <div className="submission-success">
                  <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Thank You!</h2>
                  <p style={{ color: '#ccc' }}>Your request to access the Inner Circle has been received. We will get back to you shortly.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Footer */}
      <section className="section footer-section">
        <div className="section-content footer-content">
          <div className="footer-main">
            <h3 className="footer-logo">
              Famelyn<span className="footer-logo-dot">.</span>
            </h3>
            <p className="footer-quote">"If you're ready to stop being the best-kept secret in your industry, let's talk."</p>
            <div className={`audio-card ${isPlaying ? 'playing' : ''}`} onClick={handlePlayAudio}>
              {/* <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" /> */}
              <div className="audio-header">
                <span className="play-text">{isPlaying ? '⏸ Pause' : '▶ Play'} - Final founder voice</span>
                <span>0:10</span>
              </div>
              <div className="waveform">
                {[18, 34, 24, 52, 38, 64, 30, 72, 44, 58, 28, 48, 36, 62, 26, 42].map((height, i) => (
                  <span key={i} className={`waveform-bar ${isPlaying ? 'animate' : ''}`} style={{ height: `${height}%` }}></span>
                ))}
              </div>
            </div>
          </div>

          <nav className="footer-nav">
            <a href="/emerging-leader">Students</a>
            <a href="/professionals">Professionals</a>
            <a href="https://www.linkedin.com/company/famelyn">LinkedIn</a>
            <a href="https://www.instagram.com/famelyn_/">Instagram</a>
            <a
              href="/admin/login"
              style={{
                background: "rgba(197, 160, 89, 0.12)",
                border: "1px solid rgba(197, 160, 89, 0.4)",
                color: "#C5A059",
                padding: "5px 12px",
                borderRadius: "6px",
                fontWeight: "700",
                fontSize: "0.78rem",
                letterSpacing: "1px",
                textTransform: "uppercase"
              }}
            >
              ⚙ Admin
            </a>
          </nav>
        </div>
      </section>
    </main>
  );
}
