import React from "react";
import { useNavigate } from "react-router-dom";
import "./GrowthRoadmap.css";

export default function GrowthRoadmap() {
  const navigate = useNavigate();

  return (
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

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          Back to Famelyn
        </button>
      </div>
    </div>
  );
}