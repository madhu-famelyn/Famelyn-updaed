import React from "react";
import "./USPSection.css";

const uspData = [
  {
    title: "LinkedIn, Done Right. Only LinkedIn.",
    desc: "We don’t dilute focus across platforms. We go deep where it actually matters."
  },
  {
    title: "No Templates. No Shortcuts.",
    desc: "Every profile, every post, every line is built from your thinking—not a copy-paste framework."
  },
  {
    title: "Your Voice. Not an Agency’s Tone.",
    desc: "If it doesn’t sound like you, we don’t ship it. Simple as that."
  },
  {
    title: "Clarity Over Content. Always.",
    desc: "We don’t just make you visible. We make you understood."
  },
  {
    title: "No Noise. Only Meaningful Presence.",
    desc: "No gimmicks. No engagement bait. Just credibility that compounds."
  },
  {
    title: "Visibility That Drives Opportunity.",
    desc: "From invisible to credible. Your voice, strategically positioned to attract real outcomes."
  }
];

export default function USPSection() {
  return (
    <section className="usp-wrapper">

      <div className="usp-container">

        <p className="usp-label">WHY FAMELYN</p>

        <h2 className="usp-title">
          Built differently. Built deliberately.
        </h2>

        <p className="usp-subtext">
          Most LinkedIn services optimize for activity. We optimize for perception,
          positioning, and long-term credibility.
        </p>

        <div className="usp-grid">
          {uspData.map((item, index) => (
            <div key={index} className="usp-card">
              <span className="usp-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}