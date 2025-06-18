function Validation(values) {
  let error = {};

  const employeeid_pattern = /^1\d{0,5}$/; // starts with 1, max 6 digits
  const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const noNumberPattern = /^[A-Za-z\s]+$/; // only letters and spaces

  // Employee ID
  if (!values.employeeid) {
    error.employeeid = "Employee ID is required";
  } else if (!employeeid_pattern.test(values.employeeid)) {
    error.employeeid = "Must start with 1 and be max 6 digits";
  }

  // Name
  if (!values.name || values.name.trim() === '') {
    error.name = "Name is required";
  } else if (!noNumberPattern.test(values.name.trim())) {
    error.name = "Name must not contain numbers";
  }

  // Designation
  if (!values.designation || values.designation.trim() === '') {
    error.designation = "Designation is required";
  } else if (!noNumberPattern.test(values.designation.trim())) {
    error.designation = "Designation must not contain numbers";
  }

  // Age
  if (!values.age || isNaN(values.age) || Number(values.age) <= 0) {
    error.age = "Valid age is required";
  }

  // Department
  if (!values.department || values.department.trim() === '') {
    error.department = "Department is required";
  } else if (!noNumberPattern.test(values.department.trim())) {
    error.department = "Department must not contain numbers";
  }

  // Password
  if (!values.password) {
    error.password = "Password is required";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Min 8 chars, 1 uppercase, 1 lowercase, and 1 number";
  }

  return error;
}

export default Validation;
