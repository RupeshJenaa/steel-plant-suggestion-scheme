const express = require("express");
const cors = require("cors");
const db = require("./db"); // Make sure your DB connection is set up correctly

const app = express();
app.use(cors());
app.use(express.json());

// ✅ LOGIN: Match employeeid and password as-is (no hashing)
app.post("/login", (req, res) => {
  const { employeeid, password } = req.body;

  const sql = `
    SELECT employeeid, name, designation, age, department
    FROM login
    WHERE TRIM(employeeid) = ? AND TRIM(password) = ?
  `;

  db.query(sql, [employeeid, password], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (result.length > 0) {
      res.status(200).json({ status: "Success", user: result[0] });
    } else {
      res.status(401).json({ status: "Failed", message: "Invalid credentials" });
    }
  });
});

// ✅ SIGNUP: Check if employee ID exists before inserting
app.post("/signup", (req, res) => {
  const { employeeid, name, designation, age, department, password } = req.body;

  if (!employeeid || !name || !designation || !age || !department || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // 🔍 Check if employee ID already exists
  const checkSql = "SELECT * FROM login WHERE employeeid = ?";
  db.query(checkSql, [employeeid], (err, result) => {
    if (err) {
      console.error("Database check error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length > 0) {
      // 🚫 Conflict: employeeid already exists
      return res.status(409).json({ message: "Employee ID already exists" });
    }

    // ✅ Insert new employee (password stored in plain text)
    const insertSql = `
      INSERT INTO login (employeeid, name, designation, age, department, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [employeeid, name, designation, age, department, password];

    db.query(insertSql, values, (err) => {
      if (err) {
        console.error("Insert error:", err);
        return res.status(500).json({ message: "Signup failed" });
      }

      res.status(200).json({ message: "Signup successful" });
    });
  });
});

// ✅ SUGGESTION Submission Route (unchanged)
app.post("/submit-suggestion", (req, res) => {
  const {
    title, current_scenario, suggested_scenario,
    implementation_cost, benefits, department,
    priority, status
  } = req.body;

  const sql = `
    INSERT INTO suggestions 
    (title, current_scenario, suggested_scenario, implementation_cost, benefits, department, priority, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    title, current_scenario, suggested_scenario,
    implementation_cost, benefits, department,
    priority, status
  ];

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json({ message: "Submit failed" });
    res.status(200).json({ message: "Suggestion submitted successfully" });
  });
});

// ✅ Start Server
app.listen(8081, () => {
  console.log("🚀 Server running on http://localhost:8081");
});
