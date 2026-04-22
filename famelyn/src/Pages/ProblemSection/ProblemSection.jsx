import React from "react";
import "./ProblemSection.css";

const ProblemSection = () => {
  return (
    <section className="problem-section">

      <div className="problem-container">

        <p className="problem-tag">THE PROBLEM</p>

        <h1 className="problem-title">
          The Cost of Being Invisible
        </h1>

        <div className="problem-grid">

          <div className="problem-item">
            <p>
              Expertise without visibility becomes silent capital.
            </p>
          </div>

          <div className="problem-item">
            <p>
              Competence alone does not create access.
            </p>
          </div>

          <div className="problem-item">
            <p>
              A weak digital presence quietly taxes every opportunity.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default ProblemSection;