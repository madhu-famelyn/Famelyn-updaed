import React, { useEffect } from "react";
import Header from "../Header/header";
import "./BlogSection.css";
import { ELFSIGHT_APP_ID } from "../../config";

export default function BlogSection() {
  useEffect(() => {
    // Load Elfsight platform script once
    if (!document.querySelector('script[src*="elfsight.com/platform"]')) {
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <Header />
      <section className="blog-wrapper">
        <div className="blog-container">
          <p className="blog-label">INSIGHTS &amp; STORIES</p>
          <h2 className="blog-title">From the Famelyn Blog</h2>
          <p className="blog-subtext">
            Practical advice, career strategies, and LinkedIn insights from the
            Famelyn community.
          </p>

          <div className="blog-widget-wrapper">
            <div
              className={`elfsight-app-${ELFSIGHT_APP_ID}`}
              data-elfsight-app-lazy
            />
          </div>
        </div>
      </section>
    </>
  );
}
