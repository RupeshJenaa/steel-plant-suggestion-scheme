import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from './LoginValidation';
import './login.css'; // Reuse existing login CSS for design

function Login() {
  const [values, setValues] = useState({ employeeid: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setLoginError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if (res.data.status === "Success") {
            const user = res.data.user;
            localStorage.setItem("employee", JSON.stringify(user));
            setToastMessage("✅ Logged in successfully");
            setToastVisible(true);

            setTimeout(() => {
              setToastVisible(false);
              navigate('/home', { state: { user: user } });
            }, 2000);
          } else {
            setLoginError("❌ Invalid employee ID or password");
          }
        })
        .catch(() => {
          setLoginError("❌ Server error. Please try again later.");
        });
    }
  };

  return (
    <div className="login-page">
      {/* Navbar */}
      <div className="navbar-custom">
        <img src="steel-logo.jpeg" alt="Logo" className="navbar-logo" />
        <span className="navbar-title">Vizag Steel Plant</span>
      </div>

      <div className='title-banner'>
        Suggestions Scheme
      </div>

      {/* Login Form */}
      <div className="login-bg">
        <div className="p-4 rounded login-form shadow">
          <h3 className="text-center mb-4">Log-in!</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label><strong>Employee ID</strong></label>
              <input
                type="number"
                name="employeeid"
                onChange={handleInput}
                className="form-control"
                placeholder="Enter Employee ID"
              />
              {errors.employeeid && <span className="text-danger">{errors.employeeid}</span>}
            </div>
            <div className="mb-3">
              <label><strong>Password</strong></label>
              <input
                type="password"
                name="password"
                onChange={handleInput}
                className="form-control"
                placeholder="Enter Password"
              />
              {errors.password && <span className="text-danger">{errors.password}</span>}
              {loginError && <span className="text-danger">{loginError}</span>}
            </div>

            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="termsCheck" required />
              <label className="form-check-label" htmlFor="termsCheck">
                I agree to the terms and policies
              </label>
            </div>

            <button type="submit" className="btn btn-success w-100">Log in</button>

            <Link to="/signup" className="btn btn-outline-secondary w-100 mt-3">
              New User? Register
            </Link>
          </form>
        </div>
      </div>

      {/* Toast */}
      {toastVisible && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          backgroundColor: '#28a745',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '6px',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
          fontSize: '16px',
          zIndex: 1000
        }}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default Login;