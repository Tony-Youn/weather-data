// src/routes/weather_routes.ts
import { Router } from "express";
import { WeatherController } from "../controllers/weather_controller";
// import { checkApiKey } from "../middleware/auth_middleware";

export const createWeatherRouter = (apiKey: string) => {
  const router = Router();
  const weatherController = new WeatherController(apiKey);

  // Define routes
  router.get("/current", (req, res, next) =>
    weatherController.getCurrentWeather(req, res, next)
  );
  router.get("/forecast", (req, res, next) =>
    weatherController.getForecast(req, res, next)
  );
  router.get("/forecast/ultra", (req, res, next) =>
    weatherController.getUltraForecast(req, res, next)
  );
  router.get("/version", (req, res, next) =>
    weatherController.getVersion(req, res, next)
  );

  return router;
};
