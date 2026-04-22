import React, { useState } from "react";
import "./FaqSection.css";

const faqs = [
  {
    q: "Why am I not getting visibility on LinkedIn?",
    a: `Most profiles aren’t built for visibility - they’re built like resumes.

Visibility comes from:
• Clear positioning
• Relevant keywords
• Consistent presence

At Famelyn, we focus on how your profile is perceived, not just how it’s written because that’s what actually drives reach.`
  },
  {
    q: "Do I really need to post regularly on LinkedIn?",
    a: `Not necessarily.

Consistency helps, but posting without clarity doesn’t.

What matters more:
• What you say
• Who it’s for
• Why it matters

We help you at Famelyn define your voice first, then build consistency around it.`
  },
  {
    q: "How can founders use LinkedIn effectively?",
    a: `For founders, LinkedIn isn’t just a platform - it’s leverage.

It helps you:
• Build credibility
• Attract opportunities
• Create inbound interest

At Famelyn, we help founders turn their thinking into visible authority—not just content.`
  },
  {
    q: "I’m an emerging leader, how do I start building my personal brand?",
    a: `Start with clarity, not content.

Ask:
• What do I want to be known for?
• What perspective do I bring?

At Famelyn, we guide emerging leaders to move from “posting” to positioning which is what actually builds a brand.`
  },
  {
    q: "How do thought leaders grow on LinkedIn?",
    a: `Thought leadership isn’t about frequency it’s about perspective.

People follow:
• Original thinking
• Clear opinions
• Consistent voice

We help professionals at Famelyn refine their thinking into content that builds trust, not noise.`
  },
  {
    q: "I’m a student does LinkedIn really matter for me?",
    a: `Yes—more than ever.

Your LinkedIn profile is often your first impression before interviews.

It helps you:
• Stand out early
• Showcase your journey
• Build connections

At Famelyn, we help students present themselves beyond just degrees and grades.`
  },
  {
    q: "What makes a LinkedIn profile stand out?",
    a: `Not fancy words. Not buzzwords.

What works:
• Clarity
• Relevance
• Authenticity

At Famelyn, we ensure your profile feels like you not like it was written by an agency.`
  },
  {
    q: "Should I use templates for my LinkedIn profile?",
    a: `Templates can help you start, but they won’t help you stand out.

The problem:
Everyone starts sounding the same.

At Famelyn, everything is tailored - because your story shouldn’t fit into a template.`
  },
  {
    q: "How long does it take to see results on LinkedIn?",
    a: `LinkedIn is not instant, but it’s powerful when done right.

You’ll start seeing:
• Better profile views
• More meaningful engagement
• Stronger connections

At Famelyn, we focus on building sustainable visibility, not quick spikes.`
  },
  {
    q: "Do I need professional help for LinkedIn?",
    a: `Not always but it depends on your goals.

If you want:
• Basic presence → you can do it yourself
• Strategic positioning → guidance helps

At Famelyn, we work with people who want their LinkedIn to work for them, not just exist.`
  }
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-wrapper">
      <div className="faq-container">

        <p className="faq-label">FAQ</p>

        <h2 className="faq-title">
          Clarity before you commit.
        </h2>

        <div className="faq-list">
          {faqs.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
            >
              <div
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{item.q}</span>
                <span className="faq-icon">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </div>

              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}