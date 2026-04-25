import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">

        {/* LEFT SIDE */}
        <div className="hero-content">

          <p className="tagline">
            A CONCIERGE PRACTICE · EST. PRIVATELY
          </p>

          {/* MAIN HEADING */}
          <h1 className="hero-title">
            Elevate Your LinkedIn Presence with Famelyn
          </h1>

          {/* SMALL SUB HEADING (your line)
          <p className="hero-mini">
            You Are Not Invisible. You Are Underrepresented.
          </p> */}

          {/* MAIN VALUE PROP */}
          <p className="hero-subtext">
            We turn your profile into a clear, credible, and compelling reflection 
            of your value — bringing structure, strategy, and intent to how you're seen.
          </p>

          {/* CTA BUTTON */}
          {/* <button className="primary-cta">
            Start Your LinkedIn Upgrade
          </button> */}

          {/* AUDIO SECTION */}
          <div className="audio-section">
            <span className="listen">LISTEN</span>

            <div className="waveform">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="bar"></div>
              ))}
            </div>

            <span className="audio-note">
              A NOTE FROM THE FOUNDER · 15S
            </span>
          </div>

        </div>

        {/* RIGHT SIDE CTA */}
        <div className="gateway-wrapper">

          <div className="gateway emerging">
            <div className="gateway-content">
              {/* <span className="pathway">PATHWAY I</span> */}

              <h2>The Emerging Leader</h2>

              <p>
                For students & early-career professionals building visibility and direction.
              </p>

              <a href="/emerging-leader" className="gateway-cta">
                View Your Growth Roadmap →
              </a>
            </div>
          </div>

          <div className="gateway executive">
            <div className="gateway-content">
              {/* <span className="pathway">PATHWAY II</span> */}

              <h2>The Established Executive</h2>

              <p>
                For professionals ready to position authority and unlock high-value opportunities.
              </p>

              <a href="/professionals" className="gateway-cta">
                Request a Presence Audit →
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;