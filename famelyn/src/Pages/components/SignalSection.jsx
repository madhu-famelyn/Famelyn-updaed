import React, { useEffect, useRef } from "react";
import ImageSlider from "./ImageSlider";
import "./SignalSection.css";

export default function SignalSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add animation class when section comes into view
          entry.target.classList.add("animate-in");
          // Stop observing after animation starts
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 } // Trigger when 20% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="signal-section" ref={sectionRef}>
      <div className="container">

        {/* Top Section */}
        <div className="top-grid">
          <div className="left">
            <p className="label">PROOF WITHOUT PERFORMANCE</p>
            <h1 className="heading">
              Signal That <br /> Compounds
            </h1>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="line"></div>
              <h2>4.8M</h2>
              <p>Authority impressions</p>
            </div>

            <div className="stat">
              <div className="line"></div>
              <h2>310+</h2>
              <p>Executive profiles refined</p>
            </div>

            <div className="stat">
              <div className="line"></div>
              <h2>7.4X</h2>
              <p>Opportunity lift</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bottom-grid">

          {/* Card Left */}
          <div className="card post">
            <ImageSlider />
          </div>

          {/* Card Right */}
          <div className="card growth">
            <p className="small-label">BEFORE / AFTER GROWTH</p>

            <div className="bar-group">
              <div className="bar-label">
                <span>Before</span>
                <span>Low visibility</span>
              </div>
              <div className="bar bg">
                <div className="fill before"></div>
              </div>
            </div>

            <div className="bar-group">
              <div className="bar-label">
                <span>After</span>
                <span>Authority visibility</span>
              </div>
              <div className="bar bg">
                <div className="fill after"></div>
              </div>
            </div>

            <h2 className="growth-value">+684%</h2>
            <p className="growth-text">
              Profile discovery from strategic narrative architecture.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}