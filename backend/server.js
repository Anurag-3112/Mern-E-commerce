import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",      
  password: "",     
  database: "ecommerce"
});

db.connect(err => {
  if (err) console.log("❌ DB connection error:", err);
  else console.log("✅ MySQL Connected");
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Products API
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
