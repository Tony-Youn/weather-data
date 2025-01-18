// src/controllers/weather_controller.ts
import { Request, Response, NextFunction } from "express";
import { WeatherService } from "../services/weather_service";
import { DEFAULT_COORDINATES } from "../config/constants";

export class WeatherController {
  private weatherService: WeatherService;

  constructor(apiKey: string) {
    this.weatherService = new WeatherService(apiKey);
  }

  getCurrentWeather = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { nx = DEFAULT_COORDINATES.nx, ny = DEFAULT_COORDINATES.ny } =
        req.query;
      const data = await this.weatherService.getCurrentWeather(
        String(nx),
        String(ny)
      );
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  getForecast = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nx = DEFAULT_COORDINATES.nx, ny = DEFAULT_COORDINATES.ny } =
        req.query;
      const data = await this.weatherService.getForecast(
        String(nx),
        String(ny)
      );
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  getUltraForecast = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { nx = DEFAULT_COORDINATES.nx, ny = DEFAULT_COORDINATES.ny } =
        req.query;
      const data = await this.weatherService.getUltraForecast(
        String(nx),
        String(ny)
      );
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  getVersion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ftype = "ODAM" } = req.query;
      const data = await this.weatherService.getVersion(ftype as string);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };
}
