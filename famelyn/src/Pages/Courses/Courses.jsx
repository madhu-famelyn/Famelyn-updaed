import React, { useState, useEffect } from "react";
import "./Courses.css";
import Header from "../Header/header";
import courseCover from "../../assets/linkedin_course_cover.png";
import { API_BASE_URL } from "../../config";

// Subcomponent representing a single course card item
function CourseCardItem({ course }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company_name: "",
    designation: "",
    selected_slot: "",
    attendance_reason: "",
    linkedin_challenge: "",
    linkedin_activity_level: "",
    linkedin_goals: ""
  });

  const [selectedGoals, setSelectedGoals] = useState([]);
  const [otherGoalText, setOtherGoalText] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSlotClick = (slotValue) => {
    setFormData((prev) => ({
      ...prev,
      selected_slot: prev.selected_slot === slotValue ? "" : slotValue
    }));
  };

  const handleGoalChange = (goal) => {
    setSelectedGoals((prev) => {
      if (prev.includes(goal)) {
        return prev.filter((g) => g !== goal);
      } else {
        return [...prev, goal];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Construct final goals string
    let finalGoals = [...selectedGoals];
    if (finalGoals.includes("Other")) {
      finalGoals = finalGoals.filter((g) => g !== "Other");
      if (otherGoalText.trim()) {
        finalGoals.push(`Other: ${otherGoalText.trim()}`);
      } else {
        finalGoals.push("Other");
      }
    }
    const linkedinGoalsString = finalGoals.join(", ");

    const submissionPayload = {
      ...formData,
      linkedin_goals: linkedinGoalsString
    };

    // Validation checks
    if (
      !submissionPayload.name ||
      !submissionPayload.phone ||
      !submissionPayload.email ||
      !submissionPayload.company_name ||
      !submissionPayload.designation ||
      !submissionPayload.selected_slot ||
      !submissionPayload.attendance_reason ||
      !submissionPayload.linkedin_challenge ||
      !submissionPayload.linkedin_activity_level ||
      !submissionPayload.linkedin_goals
    ) {
      setError("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/register-course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionPayload)
      });

      if (!response.ok) {
        throw new Error("Failed to register. Please try again later.");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Check if banner is a base64 string or an imported asset path
  const bannerSrc = course.banner ? course.banner : courseCover;

  return (
    <div className="course-card-centered">
      <div className="course-card-header">
        <img 
          src={bannerSrc} 
          alt={course.heading} 
          className="course-cover-img" 
        />
        <div className="course-image-overlay"></div>
      </div>

      <div className="course-card-body">
        {!showForm && !success ? (
          /* default view: details and apply button */
          <div className="course-details-section-view">
            <h2 className="course-main-title">{course.heading}</h2>
            <h3 className="course-main-tagline">{course.sub_heading}</h3>
            <p className="course-main-text">{course.description}</p>
            <div className="duration-info" style={{ marginBottom: "25px" }}>
              <span className="duration-label">⏱ Duration:</span> <strong>{course.duration}</strong>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="enroll-btn-full"
            >
              Apply to Enroll Now <span className="btn-arrow">→</span>
            </button>
          </div>
        ) : success ? (
          /* success message */
          <div className="registration-success">
            <div className="success-icon">✓</div>
            <h3>Registration Successful!</h3>
            <p>Your seat has been reserved. A confirmation email has been sent to <strong>{formData.email}</strong> with your selected slot details.</p>
            <div className="selected-slot-summary">
              <strong>Selected Session:</strong> {formData.selected_slot}
            </div>
          </div>
        ) : (
          /* registration form */
          <div className="form-container-fade-in">
            <button
              onClick={() => setShowForm(false)}
              className="back-to-details-btn"
            >
              ← Back to Details
            </button>
            <form onSubmit={handleSubmit} className="registration-form" style={{ marginTop: "15px" }}>
              <p className="form-info-msg">Seats are limited. Please complete the registration form below.</p>

              {error && <div className="form-error-msg">{error}</div>}

              <div className="form-group">
                <label>Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Number <span className="required">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address <span className="required">*</span></label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Company Name <span className="required">*</span></label>
                <input
                  type="text"
                  name="company_name"
                  placeholder="Where do you work?"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Current Designation <span className="required">*</span></label>
                <input
                  type="text"
                  name="designation"
                  placeholder="e.g. Senior Manager, Founder"
                  value={formData.designation}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Select Date & Time <span className="required">*</span></label>
                <div className="radio-options">
                  {course.timings && course.timings.length > 0 ? (
                    course.timings.map((t, idx) => {
                      const slotValue = typeof t === "string" ? t : t.slot;
                      const isOnline = typeof t === "string" ? t.toLowerCase().includes("online") : t.type === "online";
                      return (
                        <div
                          key={idx}
                          className={`slot-option-card ${formData.selected_slot === slotValue ? "selected" : ""}`}
                          onClick={() => handleSlotClick(slotValue)}
                        >
                          <div className="slot-check-circle"></div>
                          <span>{isOnline ? "🌐" : "🏛"} {slotValue}</span>
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ color: "#b0c2d6", fontSize: "0.85rem" }}>No dates scheduled.</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Reason for attending the Session <span className="required">*</span></label>
                <textarea
                  name="attendance_reason"
                  placeholder="What are you hoping to gain from this session?"
                  value={formData.attendance_reason}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label>What is the biggest challenge you currently face on LinkedIn? <span className="required">*</span></label>
                <textarea
                  name="linkedin_challenge"
                  placeholder="e.g., consistency, profile setup, finding leads"
                  value={formData.linkedin_challenge}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label>How active are you currently on LinkedIn? <span className="required">*</span></label>
                <select
                  name="linkedin_activity_level"
                  value={formData.linkedin_activity_level}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select option --</option>
                  <option value="Very Active">Very Active</option>
                  <option value="Occasionally Active">Occasionally Active</option>
                  <option value="Rarely use">Rarely use</option>
                  <option value="Just getting started">Just getting started</option>
                </select>
              </div>

              <div className="form-group">
                <label>What do you want LinkedIn to help you achieve? <span className="required">*</span></label>
                <div className="checkbox-options">
                  {["Get a job", "Build a personal brand", "Get clients/leads", "Networking", "Other"].map((goal) => {
                    const isChecked = selectedGoals.includes(goal);
                    return (
                      <div key={goal} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleGoalChange(goal)}
                          />
                          <span>{goal}</span>
                        </label>

                        {goal === "Other" && isChecked && (
                          <input
                            type="text"
                            className="other-goal-input"
                            placeholder="Please specify your goal"
                            value={otherGoalText}
                            onChange={(e) => setOtherGoalText(e.target.value)}
                            required
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="enroll-btn-full"
              >
                {loading ? "Registering..." : "Submit Registration →"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Courses() {
  const [activeCourses, setActiveCourses] = useState([]);

  useEffect(() => {
    const fetchActiveCourses = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/active-courses`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setActiveCourses(data);
          }
        }
      } catch (err) {
        console.error("Failed to load active courses:", err);
      }
    };
    fetchActiveCourses();
  }, []);

  return (
    <>
      <Header />
      <div className="courses-wrapper">
        <div className="courses-container">
          
          <div className="courses-grid">
            {/* 1. Default fallback class (always kept) */}
            <CourseCardItem 
              course={{
                id: "default",
                banner: courseCover,
                heading: "Enhancing Your LinkedIn Profile",
                sub_heading: "Build Your Brand. Unlock Opportunities.",
                description: "Join us for an exclusive LinkedIn Personal Branding Session designed to help professionals build a strong professional presence, increase visibility, and unlock new career and business opportunities.",
                duration: "1 Hour",
                timings: [
                  { slot: "1st July | 3:00 PM | Gowra Deccan.", type: "inperson" },
                  { slot: "4th July | 11:00 AM | Online Session", type: "online" }
                ]
              }}
            />

            {/* 2. Custom classes from database */}
            {activeCourses.map((course) => (
              <CourseCardItem key={course.id} course={course} />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
