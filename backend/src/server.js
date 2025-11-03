import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ DB Connection
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "job_queue_system",
});

console.log("✅ MySQL Connected");

// ✅ Make DB available globally
global.db = db;

// ✅ Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("✅ Distributed Job Queue Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
