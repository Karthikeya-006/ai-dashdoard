require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection(process.env.MYSQL_PUBLIC_URL);

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("✅ MySQL Connected Successfully");
  }
});

module.exports = connection;