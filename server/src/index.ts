import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"; 
import dbConnect from "./config/db.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://distributed-job-queue-system.vercel.app/",
    credentials: true,
  })
);

app.use(express.json());

dbConnect();

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Payments App API is running...",
    version: "1.0.0",
    endpoints: {
      auth: "/api/v1/user",
      accounts: "/api/v1/account",
    },
  });
});

// Routes
app.use("/api/v1/user", userRoutes);




// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Global error:", err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.message,
    });
  }

  if (err.name === "MongoError" && err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate entry found",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error. Please try again later.",
    ...(process.env.NODE_ENV === "development" && { error: err.message }),
  });
});



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
