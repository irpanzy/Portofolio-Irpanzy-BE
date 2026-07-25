import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils";
import { env } from "../config";
import { ZodError } from "zod";
import mongoose from "mongoose";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: any = undefined;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    errors = err.errors.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));
  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Validation Error";
    errors = Object.values(err.errors).map((e) => ({
      path: e.path,
      message: e.message,
    }));
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  } else if ((err as any).code === 11000) {
    statusCode = 409;
    const field = Object.keys((err as any).keyPattern)[0];
    message = `${field} already exists`;
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  if (env.NODE_ENV === "development") {
    console.error("❌ Error:", {
      name: err.name,
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      body: req.body,
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new ApiError(404, `Route not found: ${req.originalUrl}`);
  next(error);
};
