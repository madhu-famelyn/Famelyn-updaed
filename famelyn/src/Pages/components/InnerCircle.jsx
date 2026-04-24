import { useState, useRef } from 'react';
import './InnerCircle.css';
import FaqSection from '../FaqSection/FaqSection';

export function InnerCircle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

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

  return (
    <main className="app-container">
      {/* Section 1: Manifesto */}
      <section className="section manifesto-section">
        <div className="section-content">
          <div className="manifesto-text">
            <p className="section-label">Founder-led philosophy</p>
            <h2 className="section-title">The Founder's Manifesto</h2>
            <p className="manifesto-description">What you see today didn’t start as a business idea. It started with a realization that something needed to change.</p>
          </div>

          <div className="manifesto-video">
            <div className="video-border"></div>
            <div className="video-content">
              <div className="video-footer">
                <div className="video-line"></div>
                <p className="video-time">02:00</p>
                <p className="video-label">Manifesto film</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection/>
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
              <form
                className="intake-form contact-form"
                action="https://.io/f/xanjlkyz"
                method="POST"
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

                <button type="submit" className="submit-button cta-button">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Footer */}
      <section className="section footer-section">
        <div className="section-content footer-content">
          <div className="footer-main">
            <h3 className="footer-logo">Famelyn</h3>
            <p className="footer-quote">"If you're ready to stop being the best-kept secret in your industry, let's talk."</p>
            <div className={`audio-card ${isPlaying ? 'playing' : ''}`} onClick={handlePlayAudio}>
              <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
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
            <a href="https://www.linkedin.com/company/famelyn/posts/?feedView=all">LinkedIn</a>
            <a href="mailto:yv@famelyn.com">Email</a>
          </nav>
        </div>
      </section>
    </main>
  );
}
