import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

interface JwtPayload {
  userId: string;
}

// extend Express Request to include userId
declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // get the token from req header
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      res.status(403).json({ message: "Token not found" });
      return;
    }

    const token = authHeader.replace("Bearer ", "");

    // verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // attach userId to request
    req.userId = payload.userId;

    next();
  } catch (error: any) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
