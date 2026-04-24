import React from 'react';
import './HighPerformingPosts.css';
import img1 from '../../assets/1.jpeg';
import img2 from '../../assets/2.jpeg';
import img3 from '../../assets/3.jpeg';
import img4 from '../../assets/4.jpeg';

export default function HighPerformingPosts() {
  const posts = [
    { img: img1, url: 'https://www.linkedin.com/posts/vaishnavi-brand-strategist_brandwithheart-leadershiplessons-authenticbranding-share-7348943218928992258-PkrT/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAGh28IBIFQK7tHMteyU6vKFdrD3yBQlb-o' },
    { img: img2, url: 'https://www.linkedin.com/posts/vaishnavi-brand-strategist_workingmoms-personalbranding-quietleadership-share-7345667619644915712-J6W1/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAGh28IBIFQK7tHMteyU6vKFdrD3yBQlb-o' },
    { img: img3, url: 'https://www.linkedin.com/posts/yvepachadu_%F0%9D%97%AC%F0%9D%97%BC%F0%9D%98%82%F0%9D%97%BF-%F0%9D%97%9F%F0%9D%97%B6%F0%9D%97%BB%F0%9D%97%B8%F0%9D%97%B2%F0%9D%97%B1%F0%9D%97%9C%F0%9D%97%BB-%F0%9D%97%B7%F0%9D%97%BC%F0%9D%98%82%F0%9D%97%BF%F0%9D%97%BB%F0%9D%97%B2%F0%9D%98%86-activity-7425027923155484672-0Ogk/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAGh28IBIFQK7tHMteyU6vKFdrD3yBQlb-o' },
    { img: img4, url: 'https://www.linkedin.com/posts/yvepachadu_aiininsurance-uaeinsurance-insurtech-share-7429028734822715392-1mRu/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAGh28IBIFQK7tHMteyU6vKFdrD3yBQlb-o' }
  ];

  return (
    <section className="high-performing-section">
      <div className="container">
        <h2 className="section-title">From the Founder's Desk</h2>
        <div className="scroll-wrapper">
          <div className="image-grid">
            {[...posts, ...posts].map((post, index) => (
              <div className="image-card" key={index}>
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  <img src={post.img} alt={`High performing post ${(index % 4) + 1}`} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
