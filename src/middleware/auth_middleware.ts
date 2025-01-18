import { Request, Response, NextFunction } from "express";

export const checkApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Weather API key not configured" });
  }
  req.apiKey = apiKey;
  next();
  return; // Explicitly return undefined
};
