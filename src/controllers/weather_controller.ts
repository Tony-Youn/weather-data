// src/controllers/weather_controller.ts
import { Request, Response, NextFunction } from "express";
import { WeatherService } from "../services/weather_service";
import { DEFAULT_COORDINATES } from "../config/constants";

export class WeatherController {
  private weatherService: WeatherService;

  constructor() {
    this.weatherService = new WeatherService();
  }

  getCurrentWeather = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        nx = DEFAULT_COORDINATES.nx,
        ny = DEFAULT_COORDINATES.ny,
        serviceKey,
      } = req.query;

      if (!serviceKey) {
        return res.status(400).json({ error: "Service key is required" });
      }

      const data = await this.weatherService.getCurrentWeather(
        String(nx),
        String(ny),
        String(serviceKey)
      );
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  getForecast = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        nx = DEFAULT_COORDINATES.nx,
        ny = DEFAULT_COORDINATES.ny,
        serviceKey,
      } = req.query;

      if (!serviceKey) {
        return res.status(400).json({ error: "Service key is required" });
      }

      const data = await this.weatherService.getForecast(
        String(nx),
        String(ny),
        String(serviceKey)
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
      const {
        nx = DEFAULT_COORDINATES.nx,
        ny = DEFAULT_COORDINATES.ny,
        serviceKey,
      } = req.query;

      if (!serviceKey) {
        return res.status(400).json({ error: "Service key is required" });
      }

      const data = await this.weatherService.getUltraForecast(
        String(nx),
        String(ny),
        String(serviceKey)
      );
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  getVersion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ftype = "ODAM", serviceKey } = req.query;

      if (!serviceKey) {
        return res.status(400).json({ error: "Service key is required" });
      }

      const data = await this.weatherService.getVersion(
        ftype as string,
        String(serviceKey)
      );
      res.json(data);
    } catch (error) {
      next(error);
    }
  };
}
