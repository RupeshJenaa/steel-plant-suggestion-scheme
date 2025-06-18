import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';
import './login.css'; // Reuse login styles

function Signup() {
  const [values, setValues] = useState({
    employeeid: '',
    name: '',
    designation: '',
    age: '',
    department: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleEmployeeIdBlur = () => {
    const { employeeid } = values;
    if (!/^\d{6}$/.test(employeeid)) {
      setErrors(prev => ({
        ...prev,
        employeeid: 'Employee ID must be exactly 6 digits'
      }));
    } else if (!employeeid.startsWith('1')) {
      setErrors(prev => ({
        ...prev,
        employeeid: 'Employee ID must start with 1'
      }));
    } else {
      setErrors(prev => ({ ...prev, employeeid: '' }));
    }
  };

  const handleAgeBlur = () => {
    const age = values.age.trim();
    if (!/^\d{1,2}$/.test(age)) {
      setErrors(prev => ({
        ...prev,
        age: 'Age must be a number with max 2 digits'
      }));
    } else if (parseInt(age, 10) <= 0) {
      setErrors(prev => ({
        ...prev,
        age: 'Age must be greater than 0'
      }));
    } else {
      setErrors(prev => ({ ...prev, age: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(values.employeeid)) {
      setErrors(prev => ({ ...prev, employeeid: 'Employee ID must be exactly 6 digits' }));
      return;
    }
    if (!values.employeeid.startsWith('1')) {
      setErrors(prev => ({ ...prev, employeeid: 'Employee ID must start with 1' }));
      return;
    }
    if (!/^\d{1,2}$/.test(values.age) || parseInt(values.age, 10) <= 0) {
      setErrors(prev => ({ ...prev, age: 'Age must be a number with max 2 digits and > 0' }));
      return;
    }
    const validationErrors = Validation(values);
    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some((msg) => msg);
    if (!hasErrors) {
      axios.post('http://localhost:8081/signup', values)
        .then(() => {
          alert('Signup successful! Please log in.');
          navigate('/');
        })
        .catch((err) => {
          if (err.response && err.response.status === 409) {
            setErrors(prev => ({ ...prev, employeeid: 'Employee ID already exists' }));
          } else {
            alert('Signup failed. Try again later.');
          }
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

      {/* Signup Form */}
      <div className="login-bg">
        <div className="bg-white p-4 rounded login-form shadow">
          <h3 className="text-center mb-4">Sign-Up!</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label><strong>Employee ID</strong></label>
              <input type="text" name="employeeid" placeholder="Must start with 1, exactly 6 digits" maxLength={6} required value={values.employeeid} onChange={handleInput} onBlur={handleEmployeeIdBlur} className="form-control" />
              {errors.employeeid && <span className="text-danger">{errors.employeeid}</span>}
            </div>
            <div className="mb-3">
              <label><strong>Name</strong></label>
              <input type="text" name="name" placeholder="Enter full name" required value={values.name} onChange={handleInput} className="form-control" />
              {errors.name && <span className="text-danger">{errors.name}</span>}
            </div>
            <div className="mb-3">
              <label><strong>Designation</strong></label>
              <input type="text" name="designation" placeholder="e.g. Software Engineer" required value={values.designation} onChange={handleInput} className="form-control" />
              {errors.designation && <span className="text-danger">{errors.designation}</span>}
            </div>
            <div className="mb-3">
              <label><strong>Age</strong></label>
              <input type="text" name="age" placeholder="Enter age (max 2 digits)" required maxLength={2} value={values.age} onChange={handleInput} onBlur={handleAgeBlur} className="form-control" />
              {errors.age && <span className="text-danger">{errors.age}</span>}
            </div>
            <div className="mb-3">
              <label><strong>Department</strong></label>
              <input type="text" name="department" placeholder="e.g. IT, HR, Finance" required value={values.department} onChange={handleInput} className="form-control" />
              {errors.department && <span className="text-danger">{errors.department}</span>}
            </div>
            <div className="mb-3">
              <label><strong>Password</strong></label>
              <input type="password" name="password" placeholder="Min 8 chars, 1 upper, 1 digit" required value={values.password} onChange={handleInput} className="form-control" />
              {errors.password && <span className="text-danger">{errors.password}</span>}
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="termsCheck" required />
              <label className="form-check-label" htmlFor="termsCheck">
                I agree to the terms and policies
              </label>
            </div>
            <button type="submit" className="btn btn-success w-100">Sign up</button>
            <Link to="/" className="btn btn-outline-secondary w-100 mt-3">Log in</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;