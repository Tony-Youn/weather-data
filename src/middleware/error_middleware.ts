import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const errorHandler: ErrorRequestHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", err);

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
    });
    return;
  }

  // Handle specific error types
  if (err.name === "ValidationError") {
    res.status(400).json({
      error: "ValidationError",
      message: err.message,
    });
    return;
  }

  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      error: "UnauthorizedError",
      message: "Invalid token or unauthorized access",
    });
    return;
  }

  // Default server error
  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "production"
        ? "An unexpected error occurred"
        : err.message,
  });
};
