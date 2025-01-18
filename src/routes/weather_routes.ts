// src/routes/weather_routes.ts
import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { WeatherController } from "../controllers/weather_controller";

export const createWeatherRouter = () => {
  const router = Router();
  const weatherController = new WeatherController();

  const getCurrentWeatherHandler: RequestHandler = (req, res, next) => {
    weatherController.getCurrentWeather(req, res, next);
  };

  const getForecastHandler: RequestHandler = (req, res, next) => {
    weatherController.getForecast(req, res, next);
  };

  const getUltraForecastHandler: RequestHandler = (req, res, next) => {
    weatherController.getUltraForecast(req, res, next);
  };

  const getVersionHandler: RequestHandler = (req, res, next) => {
    weatherController.getVersion(req, res, next);
  };

  // Define routes
  router.get("/current", getCurrentWeatherHandler);
  router.get("/forecast", getForecastHandler);
  router.get("/forecast/ultra", getUltraForecastHandler);
  router.get("/version", getVersionHandler);

  return router;
};
