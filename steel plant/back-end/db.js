const mysql = require('mysql');

let db;

function handleConnection() {
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
  });

  db.connect((err) => {
    if (err) {
      console.error("❌ DB connection failed. Retrying in 2 seconds...");
      setTimeout(handleConnection, 2000);
    } else {
      console.log("✅ DB connected");
    }
  });

  db.on("error", (err) => {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleConnection();
    } else {
      throw err;
    }
  });
}

handleConnection();

module.exports = db;
