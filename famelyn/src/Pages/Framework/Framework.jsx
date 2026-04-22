import React from "react";
import "./Framework.css";

const steps = [
  {
    number: "01",
    title: "Authority Positioning",
    desc: "A precise layer in transforming quiet competence into high-value digital equity."
  },
  {
    number: "02",
    title: "Narrative Architecture",
    desc: "A precise layer in transforming quiet competence into high-value digital equity."
  },
  {
    number: "03",
    title: "Digital Leverage",
    desc: "A precise layer in transforming quiet competence into high-value digital equity."
  }
];

const Framework = () => {
  return (
    <section className="framework">

      <div className="framework-container">

        {/* LEFT */}
        <div className="framework-left">
          <p className="framework-tag">CORE METHOD</p>

          <h1 className="framework-title">
            The Famelyn <br /> Framework
          </h1>
        </div>

        {/* RIGHT */}
        <div className="framework-right">

          {steps.map((item, i) => (
            <div key={i} className="framework-step">

              <div className="step-header">
                <span className="dot"></span>
                <span className="step-number">{item.number}</span>
                <h3>{item.title}</h3>
              </div>

              <p className="step-desc">{item.desc}</p>

            </div>
          ))}

          {/* AUDIO BLOCK */}
          <div className="audio-box">

            <div className="audio-header">
              <span>FOUNDER PHILOSOPHY</span>
              <span>0:30</span>
            </div>

            <div className="waveform">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="bar"></div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Framework;