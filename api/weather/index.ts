// src/app.ts
import express from "express";
import dotenv from "dotenv";
import { createWeatherRouter } from "../../src/routes/weather_routes";
import { errorHandler } from "../../src/middleware/error_middleware";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use("/api/weather", createWeatherRouter());
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
