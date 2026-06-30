import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import Header from "../Header/header";
import { API_BASE_URL } from "../../config";

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [activeTab, setActiveTab] = useState("course_registrations");
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all"); 
  const [typeFilter, setTypeFilter] = useState("all"); 
  const [dateFilter, setDateFilter] = useState("all"); 
  const [availableSlots, setAvailableSlots] = useState([]); 
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [meetLink, setMeetLink] = useState("");
  const [sendingMeetLink, setSendingMeetLink] = useState(false);
  const [meetLinkResult, setMeetLinkResult] = useState(null);
  const navigate = useNavigate();

  // Course Management States
  const [courses, setCourses] = useState([]);
  const [courseFormData, setCourseFormData] = useState({
    heading: "",
    sub_heading: "",
    description: "",
    duration: "1 Hour",
    banner: ""
  });
  const [courseTimings, setCourseTimings] = useState([
    { datetime: "", type: "online", location: "Online Session" }
  ]);
  const [creatingCourse, setCreatingCourse] = useState(false);
  const [courseMessage, setCourseMessage] = useState(null);

  // Auth guard - redirect to login if no token
  useEffect(() => {
    const token = localStorage.getItem("famelyn_admin_token");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Fetch all registrations, submissions, slots, and courses from backend
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [regRes, subRes, slotsRes, coursesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/course-registrations`),
        fetch(`${API_BASE_URL}/api/submissions`),
        fetch(`${API_BASE_URL}/api/course-slots`),
        fetch(`${API_BASE_URL}/api/admin/courses`)
      ]);

      if (!regRes.ok || !subRes.ok) {
        throw new Error("Failed to load records from the database.");
      }

      const regData = await regRes.json();
      const subData = await subRes.json();
      const slotsData = slotsRes.ok ? await slotsRes.json() : [];
      const coursesData = coursesRes.ok ? await coursesRes.json() : [];

      setRegistrations(regData);
      setSubmissions(subData);
      setAvailableSlots(slotsData);
      setCourses(coursesData);
    } catch (err) {
      console.error("Error loading admin dashboard data:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("famelyn_admin_token");
    navigate("/admin/login");
  };

  // Send Google Meet link to all online registrants
  const sendMeetLink = async () => {
    if (!meetLink.trim()) return;
    setSendingMeetLink(true);
    setMeetLinkResult(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/send-meet-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          meet_link: meetLink.trim(),
          selected_slot: dateFilter
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Failed to send.");
      setMeetLinkResult({ success: true, message: `✅ Meet link sent to ${data.count} registrant(s)!` });
      setMeetLink("");
    } catch (err) {
      setMeetLinkResult({ success: false, message: `❌ ${err.message}` });
    } finally {
      setSendingMeetLink(false);
    }
  };

  // Delete record
  const handleDelete = async (id, type) => {
    setDeletingId(id);
    const endpoint = type === "course_registrations"
      ? `${API_BASE_URL}/api/course-registrations/${id}`
      : `${API_BASE_URL}/api/submissions/${id}`;

    try {
      const response = await fetch(endpoint, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete record.");

      if (type === "course_registrations") {
        setRegistrations((prev) => prev.filter((r) => r.id !== id));
      } else {
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
      }

      // Close modal if deleted item was open
      if (selectedItem?.id === id) setSelectedItem(null);
    } catch (err) {
      alert("Error deleting record: " + err.message);
    } finally {
      setDeletingId(null);
      setDeleteConfirm(null);
    }
  };

  // ─── Course Management Event Handlers ─────────────────────────────────────
  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCourseFormData(prev => ({
        ...prev,
        banner: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddTiming = () => {
    setCourseTimings([...courseTimings, { datetime: "", type: "online", location: "Online Session" }]);
  };

  const handleRemoveTiming = (index) => {
    if (courseTimings.length <= 1) return;
    const newTimings = [...courseTimings];
    newTimings.splice(index, 1);
    setCourseTimings(newTimings);
  };

  const handleTimingChange = (index, field, value) => {
    const newTimings = [...courseTimings];
    newTimings[index][field] = value;

    if (field === "type") {
      if (value === "online") {
        newTimings[index]["location"] = "Online Session";
      } else {
        newTimings[index]["location"] = "Gowra Deccan.";
      }
    }

    setCourseTimings(newTimings);
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setCreatingCourse(true);
    setCourseMessage(null);

    const hasEmptyTiming = courseTimings.some(t => !t.datetime.trim() || !t.location.trim());
    if (hasEmptyTiming) {
      setCourseMessage({ success: false, text: "❌ All timing slots must have a date/time and a location/detail." });
      setCreatingCourse(false);
      return;
    }

    const compiledTimings = courseTimings.map(t => {
      const slotString = `${t.datetime.trim()} | ${t.location.trim()}`;
      return { slot: slotString, type: t.type };
    });

    const payload = {
      ...courseFormData,
      timings: JSON.stringify(compiledTimings)
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to create course.");

      setCourseMessage({ success: true, text: "🎉 Course created and set to active successfully!" });

      setCourseFormData({
        heading: "",
        sub_heading: "",
        description: "",
        duration: "1 Hour",
        banner: ""
      });
      setCourseTimings([{ datetime: "", type: "online", location: "Online Session" }]);

      fetchData();
    } catch (err) {
      setCourseMessage({ success: false, text: `❌ ${err.message}` });
    } finally {
      setCreatingCourse(false);
    }
  };

  const handleToggleCourseActive = async (courseId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/courses/${courseId}/toggle-active`, {
        method: "POST"
      });
      if (!res.ok) throw new Error("Failed to toggle course active status.");
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course configuration?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/courses/${courseId}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete course.");
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Filter lists based on search, course, type and slot filters
  const getFilteredData = () => {
    const query = searchTerm.toLowerCase().trim();
    if (activeTab === "course_registrations") {
      return registrations.filter((item) => {
        const matchesSearch =
          item.name.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query) ||
          item.company_name.toLowerCase().includes(query) ||
          item.selected_slot.toLowerCase().includes(query);

        // Course filter matches
        const matchesCourse = courseFilter === "all" || courseFilter === "linkedin";

        // Type filter matches
        const slot = item.selected_slot.toLowerCase();
        const matchesType =
          typeFilter === "all" ||
          (typeFilter === "online" && slot.includes("online")) ||
          (typeFilter === "inperson" && !slot.includes("online"));

        // Date filter matches
        const matchesDate = dateFilter === "all" || item.selected_slot === dateFilter;

        return matchesSearch && matchesCourse && matchesType && matchesDate;
      });
    } else {
      return submissions.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query) ||
          item.submission_type.toLowerCase().includes(query)
      );
    }
  };

  // Detect if any online filter is active
  const isOnlineSelected = 
    typeFilter === "online" || 
    (dateFilter !== "all" && dateFilter.toLowerCase().includes("online"));

  // Count of online registrants matching the filters
  const onlineCountForSelected = registrations.filter(r => {
    const slot = r.selected_slot;
    const matchesType = typeFilter === "online" ? slot.toLowerCase().includes("online") : true;
    const matchesDate = dateFilter !== "all" ? slot === dateFilter : true;
    return matchesType && matchesDate;
  }).length;

  const filteredData = getFilteredData();

  return (
    <>
      <Header />
      <div className="admin-wrapper">
        <div className="admin-container">
          <div className="admin-header">
            <div>
              <h1 className="admin-title">Famelyn Admin Dashboard</h1>
              <p className="admin-subtitle">Manage and track all customer interactions and course enrollments.</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Sign Out ↗
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="admin-tabs">
            <button
              className={`tab-btn ${activeTab === "course_registrations" ? "active" : ""}`}
              onClick={() => { setActiveTab("course_registrations"); setSearchTerm(""); }}
            >
              Course Enrollments ({registrations.length})
            </button>
            <button
              className={`tab-btn ${activeTab === "manage_courses" ? "active" : ""}`}
              onClick={() => { setActiveTab("manage_courses"); }}
            >
              💼 Manage Classes
            </button>
          </div>

          {/* Search & Dropdown Controls — only visible when on registrations tab */}
          {activeTab === "course_registrations" && (
            <>
              <div className="admin-controls">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by name, email, slot or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Select Dropdowns Row */}
                <div className="filter-dropdowns-row">
                  <div className="filter-field">
                    <label>Select Course</label>
                    <select 
                      className="filter-select"
                      value={courseFilter} 
                      onChange={(e) => {
                        setCourseFilter(e.target.value);
                        setMeetLinkResult(null);
                      }}
                    >
                      <option value="all">All Courses</option>
                      <option value="linkedin">LinkedIn Masterclass</option>
                    </select>
                  </div>

                  <div className="filter-field">
                    <label>Select Type</label>
                    <select 
                      className="filter-select"
                      value={typeFilter} 
                      onChange={(e) => {
                        setTypeFilter(e.target.value);
                        setDateFilter("all"); // Reset slot filter
                        setMeetLinkResult(null);
                      }}
                    >
                      <option value="all">All Types (Online/Offline)</option>
                      <option value="online">🌐 Online</option>
                      <option value="inperson">🏛 In-Person (Offline)</option>
                    </select>
                  </div>

                  <div className="filter-field">
                    <label>Select Date & Time</label>
                    <select 
                      className="filter-select"
                      value={dateFilter} 
                      onChange={(e) => {
                        setDateFilter(e.target.value);
                        setMeetLinkResult(null);
                      }}
                    >
                      <option value="all">All Dates/Slots</option>
                      {availableSlots
                        .filter((slot) => {
                          const isOnline = slot.toLowerCase().includes("online");
                          if (typeFilter === "online") return isOnline;
                          if (typeFilter === "inperson") return !isOnline;
                          return true;
                        })
                        .map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Meet Link Box — visible when Online is selected */}
              {isOnlineSelected && (
                <div className="meet-link-box">
                  <div className="meet-link-box-header">
                    <span className="meet-link-icon">🌐</span>
                    <div>
                      <h3 className="meet-link-title">Send Google Meet Link</h3>
                      <p className="meet-link-subtitle">
                        Send the session link to all <strong>{onlineCountForSelected}</strong> registrant(s)
                        for: <em style={{ color: "#63d8f4" }}>{dateFilter === "all" ? "All Online Slots" : dateFilter}</em>
                      </p>
                    </div>
                  </div>
                  <div className="meet-link-input-row">
                    <input
                      type="url"
                      className="meet-link-input"
                      placeholder="https://meet.google.com/abc-defg-hij"
                      value={meetLink}
                      onChange={(e) => { setMeetLink(e.target.value); setMeetLinkResult(null); }}
                    />
                    <button
                      className="meet-link-send-btn"
                      onClick={sendMeetLink}
                      disabled={!meetLink.trim() || sendingMeetLink}
                    >
                      {sendingMeetLink ? (
                        <><span className="btn-spinner-sm"></span> Sending...</>
                      ) : (
                        "📧 Send to All"
                      )}
                    </button>
                  </div>
                  {meetLinkResult && (
                    <p className={`meet-link-result ${meetLinkResult.success ? "success" : "error"}`}>
                      {meetLinkResult.message}
                    </p>
                  )}
                </div>
              )}
            </>
          )}

          {activeTab === "course_registrations" ? (
            loading ? (
              <div className="admin-state-container">
                <div className="admin-spinner"></div>
                <p>Loading database records...</p>
              </div>
            ) : error ? (
              <div className="admin-state-container admin-error">
                <p>⚠️ {error}</p>
                <button onClick={fetchData} className="retry-btn">Retry Loading</button>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="admin-state-container">
                <p>No records found matching your criteria.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  {activeTab === "course_registrations" ? (
                    <colgroup><col style={{ width: "13%" }} /><col style={{ width: "17%" }} /><col style={{ width: "10%" }} /><col style={{ width: "10%" }} /><col style={{ width: "11%" }} /><col style={{ width: "18%" }} /><col style={{ width: "8%" }} /><col style={{ width: "13%" }} /></colgroup>
                  ) : (
                    <colgroup><col style={{ width: "15%" }} /><col style={{ width: "22%" }} /><col style={{ width: "11%" }} /><col style={{ width: "8%" }} /><col style={{ width: "16%" }} /><col style={{ width: "10%" }} /><col style={{ width: "18%" }} /></colgroup>
                  )}
                  <thead>
                    {activeTab === "course_registrations" ? (
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>Designation</th>
                        <th>Selected Slot</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    ) : (
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>LinkedIn</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {filteredData.map((item) => (
                      <tr key={item.id} className="clickable-row">
                        {activeTab === "course_registrations" ? (
                          <>
                            <td className="font-bold" onClick={() => setSelectedItem(item)}>{item.name}</td>
                            <td onClick={() => setSelectedItem(item)}>{item.email}</td>
                            <td onClick={() => setSelectedItem(item)}>{item.phone}</td>
                            <td onClick={() => setSelectedItem(item)}>{item.company_name}</td>
                            <td onClick={() => setSelectedItem(item)}>{item.designation}</td>
                            <td className="slot-highlight" onClick={() => setSelectedItem(item)}>{item.selected_slot}</td>
                            <td onClick={() => setSelectedItem(item)}>{new Date(item.created_at).toLocaleDateString()}</td>
                          </>
                        ) : (
                          <>
                            <td className="font-bold" onClick={() => setSelectedItem(item)}>{item.name}</td>
                            <td onClick={() => setSelectedItem(item)}>{item.email}</td>
                            <td onClick={() => setSelectedItem(item)}>{item.phone || "-"}</td>
                            <td>
                              {item.linkedin ? (
                                <a href={item.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link">
                                  View ↗
                                </a>
                              ) : "-"}
                            </td>
                            <td className={`type-badge ${item.submission_type}`} onClick={() => setSelectedItem(item)}>
                              {item.submission_type.replace("_", " ")}
                            </td>
                            <td onClick={() => setSelectedItem(item)}>{new Date(item.created_at).toLocaleDateString()}</td>
                          </>
                        )}
                        <td className="actions-cell">
                          <button className="view-details-btn" onClick={() => setSelectedItem(item)}>Details</button>
                          <button
                            className="delete-row-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirm({ id: item.id, type: activeTab });
                            }}
                            disabled={deletingId === item.id}
                          >
                            {deletingId === item.id ? "..." : "🗑"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            /* Manage courses panel UI */
            <div className="course-mgmt-container">
              <div className="course-mgmt-grid">
                
                {/* Left Side: Create Course Form */}
                <div className="course-form-card">
                  <h2 className="card-title">💼 Create & Activate Class</h2>
                  <form onSubmit={handleCreateCourse} className="mgmt-course-form">
                    
                    {courseMessage && (
                      <div className={`form-status-msg ${courseMessage.success ? "success" : "error"}`}>
                        {courseMessage.text}
                      </div>
                    )}

                    <div className="mgmt-form-group">
                      <label className="mgmt-label">Class Banner Image</label>
                      <div className="banner-upload-box">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBannerUpload}
                          id="banner-file-input"
                          style={{ display: "none" }}
                        />
                        <label htmlFor="banner-file-input" className="banner-upload-label">
                          {courseFormData.banner ? "🖼 Change Banner Image" : "📁 Choose Banner Image"}
                        </label>
                        {courseFormData.banner && (
                          <div className="banner-preview-wrapper">
                            <img src={courseFormData.banner} alt="Preview" className="banner-upload-preview" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mgmt-form-group">
                      <label className="mgmt-label">Class Heading</label>
                      <input
                        type="text"
                        className="mgmt-input"
                        placeholder="e.g. Enhancing Your LinkedIn Profile"
                        value={courseFormData.heading}
                        onChange={(e) => setCourseFormData({...courseFormData, heading: e.target.value})}
                        required
                      />
                    </div>

                    <div className="mgmt-form-group">
                      <label className="mgmt-label">Sub Heading / Tagline</label>
                      <input
                        type="text"
                        className="mgmt-input"
                        placeholder="e.g. Build Your Brand. Unlock Opportunities."
                        value={courseFormData.sub_heading}
                        onChange={(e) => setCourseFormData({...courseFormData, sub_heading: e.target.value})}
                        required
                      />
                    </div>

                    <div className="mgmt-form-group">
                      <label className="mgmt-label">Duration</label>
                      <input
                        type="text"
                        className="mgmt-input"
                        placeholder="e.g. 1 Hour"
                        value={courseFormData.duration}
                        onChange={(e) => setCourseFormData({...courseFormData, duration: e.target.value})}
                        required
                      />
                    </div>

                    <div className="mgmt-form-group">
                      <label className="mgmt-label">Description</label>
                      <textarea
                        rows="4"
                        className="mgmt-textarea"
                        placeholder="Join us for an exclusive LinkedIn Personal Branding Session..."
                        value={courseFormData.description}
                        onChange={(e) => setCourseFormData({...courseFormData, description: e.target.value})}
                        required
                      />
                    </div>

                    <div className="mgmt-form-group">
                      <label className="timings-section-title">📅 Add Timings & Slots</label>
                      <div className="timings-list-builder">
                        {courseTimings.map((timing, index) => (
                          <div key={index} className="timing-slot-row">
                            <div className="timing-field datetime">
                              <input
                                type="text"
                                placeholder="e.g. 4th July | 11:00 AM"
                                value={timing.datetime}
                                onChange={(e) => handleTimingChange(index, "datetime", e.target.value)}
                                required
                              />
                            </div>
                            <div className="timing-field type">
                              <select
                                value={timing.type}
                                onChange={(e) => handleTimingChange(index, "type", e.target.value)}
                              >
                                <option value="online">🌐 Online</option>
                                <option value="inperson">🏛 In-Person</option>
                              </select>
                            </div>
                            <div className="timing-field location">
                              <input
                                type="text"
                                placeholder="e.g. Online Session or Gowra Deccan."
                                value={timing.location}
                                onChange={(e) => handleTimingChange(index, "location", e.target.value)}
                                required
                              />
                            </div>
                            <button
                              type="button"
                              className="remove-timing-btn"
                              onClick={() => handleRemoveTiming(index)}
                              disabled={courseTimings.length <= 1}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="add-timing-btn-row"
                        onClick={handleAddTiming}
                      >
                        ➕ Add Another Timing Slot
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="launch-course-btn"
                      disabled={creatingCourse}
                    >
                      {creatingCourse ? "Launching Class..." : "🚀 Launch & Activate Class"}
                    </button>
                  </form>
                </div>

                {/* Right Side: Created Courses List */}
                <div className="course-list-card">
                  <h2 className="card-title">📚 Published Classes</h2>
                  {courses.length === 0 ? (
                    <div className="no-courses-placeholder">
                      <p>No classes created yet. Use the form on the left to launch your first class!</p>
                    </div>
                  ) : (
                    <div className="courses-vertical-list">
                      {courses.map((c) => {
                        let parsedTimings = [];
                        try {
                          parsedTimings = JSON.parse(c.timings);
                        } catch (e) {}

                        return (
                          <div key={c.id} className={`course-row-item ${c.is_active ? "active-item" : ""}`}>
                            {c.banner && (
                              <img src={c.banner} alt={c.heading} className="course-row-thumb" />
                            )}
                            <div className="course-row-info">
                              <div className="course-row-header">
                                <h3 className="course-row-heading">{c.heading}</h3>
                                {c.is_active ? (
                                  <span className="status-badge active">Active</span>
                                ) : (
                                  <span className="status-badge inactive">Inactive</span>
                                )}
                              </div>
                              <p className="course-row-tagline">{c.sub_heading}</p>
                              <div className="course-row-meta">
                                <span>⏱ {c.duration}</span>
                                <span>📅 {parsedTimings.length} timing slots</span>
                              </div>
                              <div className="course-row-actions">
                                <button
                                  className={c.is_active ? "deactivate-btn" : "activate-btn"}
                                  onClick={() => handleToggleCourseActive(c.id)}
                                >
                                  {c.is_active ? "Deactivate" : "Activate"}
                                </button>
                                <button
                                  className="delete-course-btn-row"
                                  onClick={() => handleDeleteCourse(c.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-content delete-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
              <button className="close-modal-btn" onClick={() => setDeleteConfirm(null)}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ color: "#b0c2d6", fontSize: "0.95rem", lineHeight: 1.6 }}>
                Are you sure you want to <strong style={{ color: "#ff6b6b" }}>permanently delete</strong> this record?
                This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer" style={{ gap: "10px" }}>
              <button className="modal-close-btn-bottom" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button
                className="confirm-delete-btn"
                onClick={() => handleDelete(deleteConfirm.id, deleteConfirm.type)}
                disabled={deletingId === deleteConfirm.id}
              >
                {deletingId === deleteConfirm.id ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal Dialog */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detailed Record Info</h3>
              <button className="close-modal-btn" onClick={() => setSelectedItem(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-grid">
                <div className="modal-field">
                  <label>Full Name</label>
                  <div>{selectedItem.name}</div>
                </div>
                <div className="modal-field">
                  <label>Email Address</label>
                  <div>{selectedItem.email}</div>
                </div>
                <div className="modal-field">
                  <label>Phone Number</label>
                  <div>{selectedItem.phone || "Not provided"}</div>
                </div>
                <div className="modal-field">
                  <label>Submitted Date & Time</label>
                  <div>{new Date(selectedItem.created_at).toLocaleString()}</div>
                </div>

                {activeTab === "course_registrations" ? (
                  <>
                    <div className="modal-field">
                      <label>Company & Designation</label>
                      <div>{selectedItem.designation} at {selectedItem.company_name}</div>
                    </div>
                    <div className="modal-field">
                      <label>Selected Session Slot</label>
                      <div className="slot-highlight">{selectedItem.selected_slot}</div>
                    </div>
                    <div className="modal-field full-width">
                      <label>LinkedIn Goals</label>
                      <div className="goals-badges">
                        {selectedItem.linkedin_goals.split(", ").map((goal, index) => (
                          <span key={index} className="goal-badge">{goal}</span>
                        ))}
                      </div>
                    </div>
                    <div className="modal-field full-width">
                      <label>How active on LinkedIn?</label>
                      <div>{selectedItem.linkedin_activity_level}</div>
                    </div>
                    <div className="modal-field full-width">
                      <label>Biggest Challenge Faced on LinkedIn</label>
                      <div className="text-content-box">{selectedItem.linkedin_challenge}</div>
                    </div>
                    <div className="modal-field full-width">
                      <label>Reason for Attending</label>
                      <div className="text-content-box">{selectedItem.attendance_reason}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="modal-field">
                      <label>Submission Intake Type</label>
                      <div className="type-text">{selectedItem.submission_type.replace("_", " ")}</div>
                    </div>
                    <div className="modal-field">
                      <label>LinkedIn Link</label>
                      <div>
                        {selectedItem.linkedin ? (
                          <a href={selectedItem.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link">
                            {selectedItem.linkedin}
                          </a>
                        ) : "Not provided"}
                      </div>
                    </div>
                    <div className="modal-field full-width">
                      <label>Message Detail</label>
                      <div className="text-content-box">{selectedItem.message}</div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="modal-footer" style={{ justifyContent: "space-between" }}>
              <button
                className="confirm-delete-btn"
                onClick={() => {
                  setSelectedItem(null);
                  setDeleteConfirm({ id: selectedItem.id, type: activeTab });
                }}
              >
                🗑 Delete Record
              </button>
              <button className="modal-close-btn-bottom" onClick={() => setSelectedItem(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
