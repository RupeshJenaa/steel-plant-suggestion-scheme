import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from './assets/steel-bg.jpeg';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const routeUser = location.state?.user;
  const localUser = JSON.parse(localStorage.getItem("employee"));
  const user = routeUser || localUser || {};

  const [form, setForm] = useState({
    title: '',
    current_scenario: '',
    suggested_scenario: '',
    implementation_cost: '',
    benefits: '',
    department: '',
    priority: '',
    status: 'Pending'
  });

  const [submitMessage, setSubmitMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogout = () => {
    localStorage.removeItem("employee");
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8081/submit-suggestion", form)
      .then(() => {
        setSubmitMessage("Suggestion submitted!");
        setToastVisible(true);
        setForm({
          title: '',
          current_scenario: '',
          suggested_scenario: '',
          implementation_cost: '',
          benefits: '',
          department: '',
          priority: '',
          status: 'Pending'
        });
        setTimeout(() => setToastVisible(false), 3000);
      })
      .catch(() => {
        setSubmitMessage("Submission failed");
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000);
      });
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Blurred Background */}
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          filter: "blur(10px)",
          zIndex: 0
        }}
      />

      {/* Foreground Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Navbar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(25deg, #0b3866, #2b6566, #309662, #1ac959)",
          color: "white",
          padding: "15px 30px",
          fontSize: "24px",
          fontWeight: "bold"
        }}>
          <img src={`${process.env.PUBLIC_URL}/steel-logo.jpeg`} alt="Logo" style={{ height: "50px" }} />
          <span>Vizag Steel Plant - Suggestions Scheme</span>
          <button onClick={handleLogout} style={{
            background: "#ffffff",
            color: "#0b3866",
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}>Logout</button>
        </div>

        {/* Employee Info */}
        <div style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "30px",
          borderRadius: "12px",
          margin: "30px auto",
          width: "90%",
          maxWidth: "600px",
          boxShadow: "0 0 12px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}>
          <h2 style={{ textAlign: "center" }}>👋 Welcome {user.name || "Employee"}</h2>
          <p><strong>Employee ID:</strong> {user.employeeid || "N/A"}</p>
          <p><strong>Name:</strong> {user.name || "N/A"}</p>
          <p><strong>Designation:</strong> {user.designation || "N/A"}</p>
          <p><strong>Age:</strong> {user.age || "N/A"}</p>
          <p><strong>Department:</strong> {user.department || "N/A"}</p>
        </div>

        {/* Suggestion Form - Glassmorphism */}
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "800px",
            margin: "auto",
            padding: "30px",
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: "white",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            border: "1px solid rgba(255, 255, 255, 0.18)"
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "25px" }}>📬 Submit Your Suggestion</h2>

          <FormBlock title="Title" name="title" value={form.title} onChange={handleChange} placeholder="Suggestion title" />
          <FormBlock title="Current Scenario" name="current_scenario" value={form.current_scenario} onChange={handleChange} placeholder="Describe current issue" multiline />
          <FormBlock title="Suggested Scenario" name="suggested_scenario" value={form.suggested_scenario} onChange={handleChange} placeholder="Describe your suggestion" multiline />
          <FormBlock title="Implementation Cost (₹)" name="implementation_cost" value={form.implementation_cost} onChange={handleChange} placeholder="Estimated cost in INR" />
          <FormBlock title="Benefits" name="benefits" value={form.benefits} onChange={handleChange} placeholder="Expected benefits" multiline />
          <FormBlock title="Department" name="department" value={form.department} onChange={handleChange} placeholder="Relevant department" />
          <SelectBlock title="Priority" name="priority" value={form.priority} onChange={handleChange} options={["High", "Medium", "Low"]} />
          <SelectBlock title="Status" name="status" value={form.status} onChange={handleChange} options={["In-Service", "Retired"]} />

          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "12px",
              fontSize: "16px",
              backgroundColor: "#ffffff",
              color: "#0b3866",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            🚀 Submit Suggestion
          </button>
        </form>

        {/* Toast Notification */}
        <Toast message={submitMessage} visible={toastVisible} />
      </div>
    </div>
  );
}

// Toast Component
const Toast = ({ message, visible }) => (
  <div style={{
    position: "fixed",
    bottom: "30px",
    right: "30px",
    backgroundColor: message.includes("failed") ? "#dc3545" : "#28a745",
    color: "white",
    padding: "12px 20px",
    borderRadius: "6px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    fontSize: "16px",
    opacity: visible ? 1 : 0,
    transition: "opacity 0.5s ease-in-out",
    zIndex: 1000
  }}>
    ✅ {message}
  </div>
);

// Form Input/Textarea
const FormBlock = ({ title, name, value, onChange, placeholder, multiline }) => (
  <div style={{ marginBottom: "15px" }}>
    <label><strong>{title}</strong></label>
    {multiline ? (
      <textarea
        name={name}
        rows="4"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          resize: "vertical"
        }}
      />
    ) : (
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc"
        }}
      />
    )}
  </div>
);

// Dropdown Selector
const SelectBlock = ({ title, name, value, onChange, options }) => (
  <div style={{ marginBottom: "15px" }}>
    <label><strong>{title}</strong></label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #ccc"
      }}
    >
      <option value="">Select {title}</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default Home;