import React from 'react';
import './HighPerformingPosts.css';
import img1 from '../../assets/1.jpeg';
import img2 from '../../assets/2.jpeg';
import img3 from '../../assets/3.jpeg';
import img4 from '../../assets/4.jpeg';

export default function HighPerformingPosts() {
  const posts = [img1, img2, img3, img4];

  return (
    <section className="high-performing-section">
      <div className="container">
        <h2 className="section-title">From the Founder’s Desk</h2>
        <div className="scroll-wrapper">
          <div className="image-grid">
            {[...posts, ...posts].map((img, index) => (
              <div className="image-card" key={index}>
                <img src={img} alt={`High performing post ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
