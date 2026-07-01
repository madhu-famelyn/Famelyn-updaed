import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header/header";
import "./BlogDetail.css";
import { DEVTO_API } from "../../config";

async function fetchPost(id) {
  const res = await fetch(`${DEVTO_API}/articles/${id}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
}

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost(id)
      .then((p) => {
        if (!p) setError("Blog post not found.");
        else setPost(p);
      })
      .catch(() => setError("Failed to load blog post."))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Header />
      <section className="blog-detail-wrapper">
        <div className="blog-detail-container">
          <button className="blog-back-btn" onClick={() => navigate("/blogs")}>
            ← Back to Blogs
          </button>

          {loading && (
            <div className="blog-detail-skeleton-wrap">
              <div className="bd-skeleton bd-skeleton-title" />
              <div className="bd-skeleton bd-skeleton-meta" />
              <div className="bd-skeleton bd-skeleton-cover" />
              <div className="bd-skeleton bd-skeleton-line" />
              <div className="bd-skeleton bd-skeleton-line" />
              <div className="bd-skeleton bd-skeleton-line short" />
            </div>
          )}

          {error && <p className="blog-detail-error">{error}</p>}

          {!loading && !error && post && (
            <article className="blog-detail-article">
              {post.tags?.length > 0 && (
                <div className="blog-detail-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-detail-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="blog-detail-title">{post.title}</h1>

              <div className="blog-detail-meta">
                {post.user?.profile_image && (
                  <img
                    src={post.user.profile_image}
                    alt={post.user.name}
                    className="blog-detail-avatar"
                  />
                )}
                <div className="blog-detail-meta-text">
                  <span className="blog-detail-author">{post.user?.name}</span>
                  <span className="blog-detail-info">
                    {new Date(post.published_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    · {post.reading_time_minutes} min read
                  </span>
                </div>
              </div>

              {post.cover_image && (
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="blog-detail-cover"
                />
              )}

              <div
                className="blog-detail-content"
                dangerouslySetInnerHTML={{ __html: post.body_html }}
              />

              {post.user?.summary && (
                <div className="blog-author-bio">
                  <div className="blog-author-bio-header">
                    {post.user.profile_image && (
                      <img
                        src={post.user.profile_image}
                        alt={post.user.name}
                        className="blog-author-bio-avatar"
                      />
                    )}
                    <div>
                      <p className="blog-author-bio-name">{post.user.name}</p>
                      <p className="blog-author-bio-text">{post.user.summary}</p>
                    </div>
                  </div>
                </div>
              )}
            </article>
          )}
        </div>
      </section>
    </>
  );
}
