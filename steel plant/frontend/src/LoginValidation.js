function Validation(values) {
  let error = {};

  // Employee ID must start with '1' and be at least 4-5 digits
  const employeeid_pattern = /^1\d{3,}$/;

  // Password: Minimum 8 characters, 1 uppercase, 1 lowercase, 1 digit
  const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  if (!values.employeeid) {
    error.employeeid = "Employee ID is required";
  } else if (!employeeid_pattern.test(values.employeeid)) {
    error.employeeid = "Employee ID should start with 1 and be numeric";
  }

  if (!values.password) {
    error.password = "Password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Password is Invalid";
  }

  return error;
}

export default Validation;
