import React from "react";
import "./Testimonials.css";

export default function TestimonialsMain() {
  const testimonials = [
    {
      initials: "ST",
      name: "Sarah Thompson",
      role: "Marketing Director",
      text: "The transformation of my LinkedIn profile was remarkable. My engagement increased dramatically, and I've received numerous high-quality connection requests."
    },
    {
      initials: "MR",
      name: "Mark Richardson",
      role: "Tech Entrepreneur",
      text: "The transformation of my LinkedIn profile was remarkable. My engagement increased dramatically, and I've received numerous high-quality connection requests."
    },
    {
      initials: "AK",
      name: "Ananya Kapoor",
      role: "Brand Strategist",
      text: "Clarity in positioning changed everything. I now attract the right audience consistently."
    },
    {
      initials: "RS",
      name: "Rahul Sharma",
      role: "Startup Founder",
      text: "Famelyn helped me articulate my story. The response from investors improved drastically."
    },
    {
      initials: "DP",
      name: "David Parker",
      role: "Consultant",
      text: "My inbound leads doubled within weeks after the revamp."
    },
    {
      initials: "NJ",
      name: "Neha Jain",
      role: "Content Lead",
      text: "The messaging finally feels aligned with who I am."
    },
    {
      initials: "VK",
      name: "Vikram Khanna",
      role: "Product Manager",
      text: "I started getting recruiter reach-outs without applying."
    },
    {
      initials: "SL",
      name: "Sophie Lee",
      role: "UX Designer",
      text: "The positioning work was incredibly sharp and practical."
    },
    {
      initials: "AR",
      name: "Arjun Reddy",
      role: "Growth Marketer",
      text: "Massive jump in engagement and credibility."
    },
    {
      initials: "JM",
      name: "James Miller",
      role: "CEO",
      text: "Finally a presence that reflects my actual expertise."
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">

        <h2 className="testimonials-title">Our Success Stories</h2>

        <div className="marquee">
          <div className="marquee-track">
            {[...testimonials, ...testimonials].map((item, index) => (
              <div className="testimonial-card" key={index}>
                
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    {item.initials}
                  </div>

                  <div>
                    <h4 className="testimonial-name">{item.name}</h4>
                    <p className="testimonial-role">{item.role}</p>
                  </div>
                </div>

                <p className="testimonial-text">
                  ❝ {item.text} ❞
                </p>

                <div className="testimonial-stars">
                  ★ ★ ★ ★ ★
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}