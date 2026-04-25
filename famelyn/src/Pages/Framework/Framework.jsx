import React from "react";
import "./Framework.css";

const steps = [
  {
    number: "01",
    title: "Niche Clarity",
    desc: "Define your niche, strengths, and audience for clear direction."
  },
  {
    number: "02",
    title: "Profile Optimization",
    desc: "Revamp your profile for strong positioning."
  },
  {
    number: "03",
    title: "Custom Content",
    desc: "Create content aligned with your voice and goals."
  },
  {
    number: "04",
    title: "Consistent Posting",
    desc: "Build visibility through regular posting."
  },
  {
    number: "05",
    title: "Strategic Engagement",
    desc: "Grow reach through meaningful interactions."
  },
  {
    number: "06",
    title: "Growth Outcome",
    desc: "Achieve authority, opportunities, and credibility."
  }
];

export default function Framework() {
  return (
    <section className="growth-section">

      <div className="growth-header">
        <p className="growth-tag">GROWTH PROCESS</p>
        <h2 className="growth-title">
          Your LinkedIn Growth Journey
        </h2>
      </div>

      <div className="growth-path">

        {steps.map((step, index) => (
          <div
            key={index}
            className={`growth-step ${index % 2 === 0 ? "left" : "right"}`}
          >
            <div className="growth-card">

              <span className="growth-number">{step.number}</span>

              <h3>{step.title}</h3>
              <p>{step.desc}</p>

            </div>
          </div>
        ))}

      </div>

    </section>
  );
}